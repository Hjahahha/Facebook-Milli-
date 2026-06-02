import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from sqlalchemy.exc import IntegrityError

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


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    balance_iqd = db.Column(db.Float, default=0)
    balance_usd = db.Column(db.Float, default=0)
    referral_code = db.Column(db.String(50))

    def __repr__(self):
        return f'<User {self.phone}>'


@login_manager.user_loader
def load_user(user_id):
    try:
        return User.query.get(int(user_id))
    except (ValueError, TypeError):
        return None


@app.route('/')
def index():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '').strip()

        # Input validation
        if not phone or not password:
            flash('رقم الهاتف وكلمة المرور مطلوبان')
            return render_template('login.html')

        try:
            user = User.query.filter_by(phone=phone).first()
            if user and bcrypt.check_password_hash(user.password, password):
                login_user(user)
                return redirect(url_for('dashboard'))
            else:
                flash('رقم الهاتف أو كلمة المرور خاطئة')
        except Exception as e:
            flash('حدث خطأ في السيستم. يرجى المحاولة لاحقاً')
            app.logger.error(f'Login error: {str(e)}')

    return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        confirm_password = request.form.get('confirm_password', '').strip()

        # Input validation
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

        try:
            # Check if user already exists
            existing_user = User.query.filter_by(phone=phone).first()
            if existing_user:
                flash('رقم الهاتف مسجل بالفعل')
                return render_template('register.html')

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(
                name=name,
                phone=phone,
                email=email,
                password=hashed_password
            )
            db.session.add(user)
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
            app.logger.error(f'Registration error: {str(e)}')
            return render_template('register.html')

    return render_template('register.html')


@app.route('/dashboard')
@login_required
def dashboard():
    return f"مرحبا {current_user.name} | رصيد IQD: {current_user.balance_iqd}"


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('تم تسجيل الخروج بنجاح')
    return redirect(url_for('login'))


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
