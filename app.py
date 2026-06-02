import os
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func, desc
import logging

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///ishtar_portal.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'يرجى تسجيل الدخول أولاً'

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Database Models
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='customer')  # customer, merchant, admin
    balance_iqd = db.Column(db.Float, default=0)
    balance_usd = db.Column(db.Float, default=0)
    referral_code = db.Column(db.String(50), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    merchant_profile = db.relationship('MerchantProfile', backref='user', uselist=False)
    transactions = db.relationship('Transaction', backref='user', lazy=True)
    products = db.relationship('Product', backref='seller', lazy=True)

    def __repr__(self):
        return f'<User {self.phone}>'

    def is_merchant(self):
        return self.role == 'merchant'

    def is_admin(self):
        return self.role == 'admin'


class MerchantProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    store_name = db.Column(db.String(200), nullable=False)
    store_description = db.Column(db.Text)
    store_category = db.Column(db.String(100))
    commission_rate = db.Column(db.Float, default=5.0)  # percentage
    total_sales = db.Column(db.Float, default=0)
    total_earnings = db.Column(db.Float, default=0)
    rating = db.Column(db.Float, default=5.0)
    verified = db.Column(db.Boolean, default=False)
    bank_account = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<MerchantProfile {self.store_name}>'


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, default=0)
    category = db.Column(db.String(100))
    image_url = db.Column(db.String(500))
    status = db.Column(db.String(20), default='active')  # active, inactive, archived
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    orders = db.relationship('Order', backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.name}>'


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, completed, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Order {self.id}>'


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # deposit, withdrawal, transfer, earning
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), default='IQD')  # IQD, USD
    status = db.Column(db.String(20), default='completed')  # pending, completed, failed
    description = db.Column(db.String(255))
    reference_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Transaction {self.id}>'


class AdminLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    action = db.Column(db.String(255), nullable=False)
    target_type = db.Column(db.String(50))  # user, merchant, product, order
    target_id = db.Column(db.Integer)
    details = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<AdminLog {self.id}>'


# Authentication
@login_manager.user_loader
def load_user(user_id):
    try:
        return User.query.get(int(user_id))
    except (ValueError, TypeError):
        return None


# Decorators
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin():
            flash('الوصول مرفوض: يتطلب صلاحيات مسؤول')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


def merchant_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_merchant():
            flash('الوصول مرفوض: متاح فقط للتجار')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


def log_admin_action(action, target_type=None, target_id=None, details=None):
    """Log administrative actions"""
    if current_user.is_admin():
        log_entry = AdminLog(
            admin_id=current_user.id,
            action=action,
            target_type=target_type,
            target_id=target_id,
            details=details
        )
        db.session.add(log_entry)
        db.session.commit()


# Routes - Authentication
@app.route('/')
def index():
    if current_user.is_authenticated:
        if current_user.is_admin():
            return redirect(url_for('admin_dashboard'))
        elif current_user.is_merchant():
            return redirect(url_for('merchant_dashboard'))
        else:
            return redirect(url_for('customer_dashboard'))
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '').strip()

        if not phone or not password:
            flash('رقم الهاتف وكلمة المرور مطلوبان')
            return render_template('login.html')

        try:
            user = User.query.filter_by(phone=phone).first()
            if user and user.is_active and bcrypt.check_password_hash(user.password, password):
                login_user(user, remember=request.form.get('remember'))
                next_page = request.args.get('next')
                return redirect(next_page) if next_page else redirect(url_for('index'))
            else:
                flash('رقم الهاتف أو كلمة المرور خاطئة أو الحساب معطل')
                logger.warning(f'Failed login attempt for phone: {phone}')
        except Exception as e:
            flash('حدث خطأ في السيستم. يرجى المحاولة لاحقاً')
            logger.error(f'Login error: {str(e)}')

    return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        confirm_password = request.form.get('confirm_password', '').strip()
        user_role = request.form.get('role', 'customer')

        # Validation
        if not all([name, phone, email, password, confirm_password]):
            flash('جميع الحقول مطلوبة')
            return render_template('register.html')

        if len(name) < 2:
            flash('الاسم يجب أن يكون أطول من حرفين')
            return render_template('register.html')

        if len(phone) < 10:
            flash('رقم الهاتف غير صحيح')
            return render_template('register.html')

        if '@' not in email or '.' not in email:
            flash('عنوان البريد الإلكتروني غير صحيح')
            return render_template('register.html')

        if len(password) < 6:
            flash('كلمة المرور يجب أن تكون أطول من 6 أحرف')
            return render_template('register.html')

        if password != confirm_password:
            flash('كلمات المرور غير متطابقة')
            return render_template('register.html')

        if user_role not in ['customer', 'merchant']:
            user_role = 'customer'

        try:
            existing_user = User.query.filter_by(phone=phone).first()
            if existing_user:
                flash('رقم الهاتف مسجل بالفعل')
                return render_template('register.html')

            existing_email = User.query.filter_by(email=email).first()
            if existing_email:
                flash('البريد الإلكتروني مسجل بالفعل')
                return render_template('register.html')

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(
                name=name,
                phone=phone,
                email=email,
                password=hashed_password,
                role=user_role
            )
            db.session.add(new_user)
            db.session.commit()

            # If user registered as merchant, create profile
            if user_role == 'merchant':
                merchant_profile = MerchantProfile(
                    user_id=new_user.id,
                    store_name=name
                )
                db.session.add(merchant_profile)
                db.session.commit()

            flash('تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول')
            return redirect(url_for('login'))

        except IntegrityError:
            db.session.rollback()
            flash('حدث خطأ: البيانات المدخلة موجودة بالفعل')
            return render_template('register.html')
        except Exception as e:
            db.session.rollback()
            flash('حدث خطأ في السيستم. يرجى المحاولة لاحقاً')
            logger.error(f'Registration error: {str(e)}')
            return render_template('register.html')

    return render_template('register.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('تم تسجيل الخروج بنجاح')
    return redirect(url_for('login'))


# Routes - Customer Dashboard
@app.route('/dashboard')
@login_required
def customer_dashboard():
    if current_user.is_admin():
        return redirect(url_for('admin_dashboard'))
    if current_user.is_merchant():
        return redirect(url_for('merchant_dashboard'))

    # Get recent transactions
    recent_transactions = Transaction.query.filter_by(
        user_id=current_user.id
    ).order_by(desc(Transaction.created_at)).limit(10).all()

    # Get user's orders
    user_orders = Order.query.filter_by(buyer_id=current_user.id).order_by(
        desc(Order.created_at)
    ).limit(10).all()

    context = {
        'user': current_user,
        'transactions': recent_transactions,
        'orders': user_orders,
        'total_spent': db.session.query(func.sum(Order.total_price)).filter_by(
            buyer_id=current_user.id,
            status='completed'
        ).scalar() or 0
    }
    return render_template('customer_dashboard.html', **context)


# Routes - Merchant Dashboard
@app.route('/merchant/dashboard')
@login_required
@merchant_required
def merchant_dashboard():
    merchant = current_user.merchant_profile
    
    # Get statistics
    total_products = Product.query.filter_by(seller_id=current_user.id).count()
    total_orders = db.session.query(Order).join(Product).filter(
        Product.seller_id == current_user.id
    ).count()
    
    completed_orders = db.session.query(func.count(Order.id)).join(Product).filter(
        Product.seller_id == current_user.id,
        Order.status == 'completed'
    ).scalar() or 0
    
    total_revenue = db.session.query(func.sum(Order.total_price)).join(Product).filter(
        Product.seller_id == current_user.id,
        Order.status == 'completed'
    ).scalar() or 0

    # Get recent orders
    recent_orders = db.session.query(Order).join(Product).filter(
        Product.seller_id == current_user.id
    ).order_by(desc(Order.created_at)).limit(10).all()

    # Get recent transactions
    recent_transactions = Transaction.query.filter_by(
        user_id=current_user.id
    ).order_by(desc(Transaction.created_at)).limit(10).all()

    context = {
        'merchant': merchant,
        'total_products': total_products,
        'total_orders': total_orders,
        'completed_orders': completed_orders,
        'total_revenue': total_revenue or 0,
        'recent_orders': recent_orders,
        'transactions': recent_transactions
    }
    return render_template('merchant_dashboard.html', **context)


@app.route('/merchant/products', methods=['GET', 'POST'])
@login_required
@merchant_required
def merchant_products():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        description = request.form.get('description', '').strip()
        price = request.form.get('price', '0')
        quantity = request.form.get('quantity', '0')
        category = request.form.get('category', '').strip()

        try:
            price = float(price)
            quantity = int(quantity)
            
            if price <= 0:
                flash('السعر يجب أن يكون أكبر من صفر')
                return redirect(url_for('merchant_products'))

            product = Product(
                seller_id=current_user.id,
                name=name,
                description=description,
                price=price,
                quantity=quantity,
                category=category
            )
            db.session.add(product)
            db.session.commit()
            flash(f'تم إضافة المنتج "{name}" بنجاح')
            logger.info(f'Merchant {current_user.id} added product {product.id}')
        except Exception as e:
            db.session.rollback()
            flash('حدث خطأ في إضافة المنتج')
            logger.error(f'Error adding product: {str(e)}')

        return redirect(url_for('merchant_products'))

    products = Product.query.filter_by(seller_id=current_user.id).order_by(
        desc(Product.created_at)
    ).all()
    
    return render_template('merchant_products.html', products=products)


@app.route('/merchant/products/<int:product_id>/edit', methods=['GET', 'POST'])
@login_required
@merchant_required
def merchant_edit_product(product_id):
    product = Product.query.get_or_404(product_id)
    
    if product.seller_id != current_user.id:
        flash('غير مصرح')
        return redirect(url_for('merchant_products'))

    if request.method == 'POST':
        product.name = request.form.get('name', '').strip()
        product.description = request.form.get('description', '').strip()
        product.price = float(request.form.get('price', product.price))
        product.quantity = int(request.form.get('quantity', product.quantity))
        product.category = request.form.get('category', '').strip()
        product.status = request.form.get('status', 'active')

        try:
            db.session.commit()
            flash('تم تحديث المنتج بنجاح')
            return redirect(url_for('merchant_products'))
        except Exception as e:
            db.session.rollback()
            flash('حدث خطأ في تحديث المنتج')
            logger.error(f'Error updating product: {str(e)}')

    return render_template('merchant_edit_product.html', product=product)


@app.route('/merchant/settings', methods=['GET', 'POST'])
@login_required
@merchant_required
def merchant_settings():
    merchant = current_user.merchant_profile

    if request.method == 'POST':
        merchant.store_name = request.form.get('store_name', '').strip()
        merchant.store_description = request.form.get('store_description', '').strip()
        merchant.store_category = request.form.get('store_category', '').strip()
        merchant.bank_account = request.form.get('bank_account', '').strip()

        try:
            db.session.commit()
            flash('تم تحديث البيانات بنجاح')
            logger.info(f'Merchant {current_user.id} updated profile')
        except Exception as e:
            db.session.rollback()
            flash('حدث خطأ في تحديث البيانات')
            logger.error(f'Error updating merchant profile: {str(e)}')

    return render_template('merchant_settings.html', merchant=merchant)


# Routes - Admin Panel
@app.route('/admin/dashboard')
@login_required
@admin_required
def admin_dashboard():
    # Statistics
    total_users = User.query.count()
    total_merchants = User.query.filter_by(role='merchant').count()
    total_products = Product.query.count()
    total_orders = Order.query.count()
    total_revenue = db.session.query(func.sum(Order.total_price)).filter_by(
        status='completed'
    ).scalar() or 0

    # Recent activities
    recent_logs = AdminLog.query.order_by(desc(AdminLog.created_at)).limit(20).all()
    recent_orders = Order.query.order_by(desc(Order.created_at)).limit(10).all()

    context = {
        'total_users': total_users,
        'total_merchants': total_merchants,
        'total_products': total_products,
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'recent_logs': recent_logs,
        'recent_orders': recent_orders
    }
    return render_template('admin_dashboard.html', **context)


@app.route('/admin/users')
@login_required
@admin_required
def admin_users():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '').strip()
    role = request.args.get('role', '').strip()

    query = User.query

    if search:
        query = query.filter(
            db.or_(
                User.name.ilike(f'%{search}%'),
                User.phone.ilike(f'%{search}%'),
                User.email.ilike(f'%{search}%')
            )
        )

    if role:
        query = query.filter_by(role=role)

    users = query.order_by(desc(User.created_at)).paginate(page=page, per_page=20)

    return render_template('admin_users.html', users=users, search=search, role=role)


@app.route('/admin/users/<int:user_id>/edit', methods=['GET', 'POST'])
@login_required
@admin_required
def admin_edit_user(user_id):
    user = User.query.get_or_404(user_id)

    if request.method == 'POST':
        user.name = request.form.get('name', '').strip()
        user.email = request.form.get('email', '').strip()
        user.role = request.form.get('role', 'customer')
        user.is_active = request.form.get('is_active') == 'on'

        try:
            db.session.commit()
            log_admin_action('تم تعديل بيانات المستخدم', 'user', user_id, f'Role: {user.role}')
            flash('تم تحديث بيانات المستخدم بنجاح')
            return redirect(url_for('admin_users'))
        except Exception as e:
            db.session.rollback()
            flash('حدث خطأ في تحديث البيانات')
            logger.error(f'Error updating user: {str(e)}')

    return render_template('admin_edit_user.html', user=user)


@app.route('/admin/merchants')
@login_required
@admin_required
def admin_merchants():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '').strip()
    verified = request.args.get('verified', '').strip()

    query = MerchantProfile.query

    if search:
        query = query.join(User).filter(
            db.or_(
                MerchantProfile.store_name.ilike(f'%{search}%'),
                User.phone.ilike(f'%{search}%')
            )
        )

    if verified:
        query = query.filter_by(verified=verified == 'true')

    merchants = query.order_by(desc(MerchantProfile.created_at)).paginate(page=page, per_page=20)

    return render_template('admin_merchants.html', merchants=merchants, search=search, verified=verified)


@app.route('/admin/merchants/<int:merchant_id>/verify', methods=['POST'])
@login_required
@admin_required
def admin_verify_merchant(merchant_id):
    merchant = MerchantProfile.query.get_or_404(merchant_id)
    merchant.verified = True

    try:
        db.session.commit()
        log_admin_action('تحقق من بيانات التاجر', 'merchant', merchant_id, merchant.store_name)
        flash(f'تم التحقق من متجر {merchant.store_name} بنجاح')
        logger.info(f'Admin {current_user.id} verified merchant {merchant_id}')
    except Exception as e:
        db.session.rollback()
        flash('حدث خطأ')
        logger.error(f'Error verifying merchant: {str(e)}')

    return redirect(url_for('admin_merchants'))


@app.route('/admin/orders')
@login_required
@admin_required
def admin_orders():
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', '').strip()

    query = Order.query

    if status:
        query = query.filter_by(status=status)

    orders = query.order_by(desc(Order.created_at)).paginate(page=page, per_page=20)

    return render_template('admin_orders.html', orders=orders, status=status)


@app.route('/admin/orders/<int:order_id>/update', methods=['POST'])
@login_required
@admin_required
def admin_update_order(order_id):
    order = Order.query.get_or_404(order_id)
    new_status = request.form.get('status', order.status)

    if new_status not in ['pending', 'completed', 'cancelled']:
        flash('حالة غير صحيحة')
        return redirect(url_for('admin_orders'))

    order.status = new_status

    try:
        db.session.commit()
        log_admin_action('تحديث حالة الطلب', 'order', order_id, f'Status: {new_status}')
        flash('تم تحديث حالة الطلب بنجاح')
        logger.info(f'Admin {current_user.id} updated order {order_id} to {new_status}')
    except Exception as e:
        db.session.rollback()
        flash('حدث خطأ')
        logger.error(f'Error updating order: {str(e)}')

    return redirect(url_for('admin_orders'))


@app.route('/admin/transactions')
@login_required
@admin_required
def admin_transactions():
    page = request.args.get('page', 1, type=int)
    status = request.args.get('status', '').strip()

    query = Transaction.query

    if status:
        query = query.filter_by(status=status)

    transactions = query.order_by(desc(Transaction.created_at)).paginate(page=page, per_page=20)

    return render_template('admin_transactions.html', transactions=transactions, status=status)


@app.route('/admin/logs')
@login_required
@admin_required
def admin_logs():
    page = request.args.get('page', 1, type=int)
    action = request.args.get('action', '').strip()

    query = AdminLog.query

    if action:
        query = query.filter_by(action=action)

    logs = query.order_by(desc(AdminLog.created_at)).paginate(page=page, per_page=30)

    return render_template('admin_logs.html', logs=logs, action=action)


# Error Handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500


@app.errorhandler(403)
def forbidden_error(error):
    return render_template('403.html'), 403


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
