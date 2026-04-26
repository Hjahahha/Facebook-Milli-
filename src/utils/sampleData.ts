import type { Product, Category, Ad } from '../types';

export const sampleCategories: Category[] = [
  {
    id: 'electronics', name: 'إلكترونيات', icon: '💻',
    subcategories: [
      { id: 'phones', name: 'الهاتف', parentId: 'electronics' },
      { id: 'tablets', name: 'تابلت', parentId: 'electronics' },
      { id: 'sim', name: 'رقم التليفون', parentId: 'electronics' },
      { id: 'phone-cases', name: 'أغطية الهاتف والأغطية', parentId: 'electronics' },
      { id: 'tablet-acc', name: 'ملحقات التابلت', parentId: 'electronics' },
    ],
  },
  {
    id: 'computers', name: 'أجهزة الكمبيوتر', icon: '🖥️',
    subcategories: [
      { id: 'laptops', name: 'لابتوبات', parentId: 'computers' },
      { id: 'desktops', name: 'ديسكتوب', parentId: 'computers' },
      { id: 'screens', name: 'الشاشات', parentId: 'computers' },
      { id: 'storage', name: 'التخزين والقرص الصلب', parentId: 'computers' },
      { id: 'printers', name: 'طابعات', parentId: 'computers' },
    ],
  },
  {
    id: 'gaming', name: 'ألعاب وأجهزة الفيديو', icon: '🎮',
    subcategories: [
      { id: 'consoles', name: 'أجهزة الألعاب', parentId: 'gaming' },
      { id: 'games', name: 'ألعاب الفيديو', parentId: 'gaming' },
      { id: 'gift-cards', name: 'بطاقات الهدية', parentId: 'gaming' },
    ],
  },
  {
    id: 'home', name: 'المنزل والمطبخ', icon: '🏠',
    subcategories: [
      { id: 'kitchen', name: 'أدوات المطبخ', parentId: 'home' },
      { id: 'appliances', name: 'الأجهزة المنزلية', parentId: 'home' },
      { id: 'decor', name: 'ديكور المنزل', parentId: 'home' },
      { id: 'lighting', name: 'إضاءة', parentId: 'home' },
    ],
  },
  {
    id: 'furniture', name: 'أثاث المنزل والحديقة', icon: '🪑',
    subcategories: [
      { id: 'living', name: 'غرفة المعيشة', parentId: 'furniture' },
      { id: 'bedroom', name: 'غرفة النوم', parentId: 'furniture' },
      { id: 'garden', name: 'الحديقة', parentId: 'furniture' },
    ],
  },
  {
    id: 'fashion', name: 'الملابس والأمتعة', icon: '👗',
    subcategories: [
      { id: 'men', name: 'ملابس رجالية', parentId: 'fashion' },
      { id: 'women', name: 'ملابس نسائية', parentId: 'fashion' },
      { id: 'kids', name: 'ملابس أطفال', parentId: 'fashion' },
      { id: 'shoes', name: 'أحذية', parentId: 'fashion' },
      { id: 'bags', name: 'حقائب', parentId: 'fashion' },
    ],
  },
  {
    id: 'beauty', name: 'العناية والجمال', icon: '💄',
    subcategories: [
      { id: 'skincare', name: 'العناية بالبشرة', parentId: 'beauty' },
      { id: 'makeup', name: 'مكياج', parentId: 'beauty' },
      { id: 'perfumes', name: 'العطور', parentId: 'beauty' },
      { id: 'haircare', name: 'العناية بالشعر', parentId: 'beauty' },
    ],
  },
  {
    id: 'business', name: 'تجارة و صناعة', icon: '🏭',
    subcategories: [
      { id: 'equipment', name: 'معدات', parentId: 'business' },
      { id: 'materials', name: 'مواد خام', parentId: 'business' },
    ],
  },
  {
    id: 'pets', name: 'لوازم الحيوانات الأليفة', icon: '🐱',
    subcategories: [
      { id: 'pet-food', name: 'طعام الحيوانات', parentId: 'pets' },
      { id: 'pet-accessories', name: 'إكسسوارات', parentId: 'pets' },
    ],
  },
  {
    id: 'other', name: 'إعلانات أخرى', icon: '📋',
    subcategories: [
      { id: 'services', name: 'خدمات', parentId: 'other' },
      { id: 'misc', name: 'متنوعة', parentId: 'other' },
    ],
  },
];

export const sampleProducts: Product[] = [
  {
    id: 'p1', name: 'جهاز رغوة الحليب - أسود AMBIANO', price: 25000, originalPrice: 33250, discount: 24,
    image: 'https://images.unsplash.com/photo-1570784832530-1e3c5f588a68?w=300', category: 'home', subcategory: 'kitchen',
    description: 'جهاز رغوة الحليب الكهربائي من AMBIANO بتصميم أنيق ولون أسود. مناسب لتحضير رغوة الحليب للقهوة والمشروبات الساخنة.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.5, reviewCount: 128, inStock: true, featured: true, createdAt: '2024-01-15',
  },
  {
    id: 'p2', name: 'لوحة مفاتيح Rii اللاسلكية المصغرة مع لوحة اللمس', price: 22000, originalPrice: 41500, discount: 46,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300', category: 'computers', subcategory: 'laptops',
    description: 'لوحة مفاتيح لاسلكية مصغرة من Rii مع لوحة لمس مدمجة. مثالية للاستخدام مع أجهزة التلفزيون الذكية وأجهزة الكمبيوتر.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.2, reviewCount: 89, inStock: true, featured: true, createdAt: '2024-01-20',
  },
  {
    id: 'p3', name: 'كشاف عمل بقوة 6000 لومن', price: 19500, originalPrice: 28000, discount: 30,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300', category: 'home', subcategory: 'lighting',
    description: 'كشاف عمل LED بقوة إضاءة 6000 لومن. مقاوم للماء ومناسب للاستخدام في الأماكن المظلمة وورش العمل.',
    merchantId: 'm2', merchantName: 'بيت الأدوات', rating: 4.7, reviewCount: 56, inStock: true, featured: true, createdAt: '2024-02-01',
  },
  {
    id: 'p4', name: 'ثيرموستات SWAREY الذكي للتدفئة تحت الأرضية', price: 30000, originalPrice: 40000, discount: 25,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300', category: 'home', subcategory: 'appliances',
    description: 'ثيرموستات ذكي من SWAREY للتحكم في التدفئة تحت الأرضية. يدعم التحكم عن بعد والبرمجة الزمنية.',
    merchantId: 'm2', merchantName: 'بيت الأدوات', rating: 4.3, reviewCount: 34, inStock: true, createdAt: '2024-02-10',
  },
  {
    id: 'p5', name: 'آيفون 15 برو ماكس 256GB', price: 1850000, originalPrice: 2100000, discount: 12,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300', category: 'electronics', subcategory: 'phones',
    description: 'هاتف آيفون 15 برو ماكس بسعة 256 جيجابايت. يأتي بشريحة A17 Pro وكاميرا 48 ميجابكسل.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.9, reviewCount: 312, inStock: true, featured: true, createdAt: '2024-03-01',
  },
  {
    id: 'p6', name: 'سامسونج جالكسي S24 الترا', price: 1650000, originalPrice: 1900000, discount: 13,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300', category: 'electronics', subcategory: 'phones',
    description: 'هاتف سامسونج جالكسي S24 الترا بكاميرا 200 ميجابكسل ومعالج Snapdragon 8 Gen 3.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.8, reviewCount: 245, inStock: true, featured: true, createdAt: '2024-03-05',
  },
  {
    id: 'p7', name: 'لابتوب ASUS ROG Strix G16', price: 1450000, originalPrice: 1700000, discount: 15,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300', category: 'computers', subcategory: 'laptops',
    description: 'لابتوب ASUS ROG Strix G16 للألعاب بمعالج Intel Core i9 وكرت شاشة RTX 4070.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.6, reviewCount: 178, inStock: true, createdAt: '2024-02-20',
  },
  {
    id: 'p8', name: 'PlayStation 5 Slim', price: 750000, originalPrice: 850000, discount: 12,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300', category: 'gaming', subcategory: 'consoles',
    description: 'جهاز PlayStation 5 Slim مع وحدة تحكم DualSense. يدعم ألعاب الجيل الجديد.',
    merchantId: 'm3', merchantName: 'عالم الألعاب', rating: 4.9, reviewCount: 420, inStock: true, featured: true, createdAt: '2024-03-10',
  },
  {
    id: 'p9', name: 'مكنسة كهربائية روبوت ذكية', price: 185000, originalPrice: 250000, discount: 26,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300', category: 'home', subcategory: 'appliances',
    description: 'مكنسة كهربائية روبوتية ذكية مع خاصية التنقل الذكي والتحكم عبر التطبيق.',
    merchantId: 'm2', merchantName: 'بيت الأدوات', rating: 4.4, reviewCount: 97, inStock: true, createdAt: '2024-02-15',
  },
  {
    id: 'p10', name: 'عطر بلو دو شانيل 100مل', price: 175000, originalPrice: 220000, discount: 20,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300', category: 'beauty', subcategory: 'perfumes',
    description: 'عطر Bleu de Chanel الأصلي بحجم 100 مل. عطر فاخر للرجال برائحة خشبية عطرية.',
    merchantId: 'm4', merchantName: 'عالم العطور', rating: 4.8, reviewCount: 203, inStock: true, featured: true, createdAt: '2024-03-15',
  },
  {
    id: 'p11', name: 'حذاء نايك اير ماكس 90', price: 125000, originalPrice: 165000, discount: 24,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', category: 'fashion', subcategory: 'shoes',
    description: 'حذاء Nike Air Max 90 الأيقوني بتصميم عصري ومريح. مناسب للاستخدام اليومي والرياضة.',
    merchantId: 'm5', merchantName: 'أزياء العراق', rating: 4.5, reviewCount: 156, inStock: true, featured: true, createdAt: '2024-03-08',
  },
  {
    id: 'p12', name: 'سماعات Sony WH-1000XM5', price: 350000, originalPrice: 450000, discount: 22,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300', category: 'electronics', subcategory: 'phones',
    description: 'سماعات Sony WH-1000XM5 اللاسلكية مع خاصية إلغاء الضوضاء النشط.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.7, reviewCount: 289, inStock: true, createdAt: '2024-02-25',
  },
  {
    id: 'p13', name: 'شاشة Samsung Odyssey G5 27 بوصة', price: 425000, originalPrice: 550000, discount: 23,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300', category: 'computers', subcategory: 'screens',
    description: 'شاشة Samsung Odyssey G5 منحنية 27 بوصة بدقة QHD ومعدل تحديث 165Hz.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.6, reviewCount: 134, inStock: true, createdAt: '2024-03-12',
  },
  {
    id: 'p14', name: 'طقم مكياج احترافي 24 قطعة', price: 85000, originalPrice: 120000, discount: 29,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300', category: 'beauty', subcategory: 'makeup',
    description: 'طقم مكياج احترافي يتضمن 24 قطعة من أدوات التجميل الأساسية بجودة عالية.',
    merchantId: 'm6', merchantName: 'بيت الجمال', rating: 4.3, reviewCount: 87, inStock: true, createdAt: '2024-03-18',
  },
  {
    id: 'p15', name: 'iPad Air M2 11 بوصة', price: 950000, originalPrice: 1100000, discount: 14,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300', category: 'electronics', subcategory: 'tablets',
    description: 'iPad Air بشريحة M2 وشاشة Liquid Retina 11 بوصة. مثالي للعمل والترفيه.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.8, reviewCount: 198, inStock: true, featured: true, createdAt: '2024-03-20',
  },
  {
    id: 'p16', name: 'ماكينة قهوة DeLonghi', price: 285000, originalPrice: 380000, discount: 25,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300', category: 'home', subcategory: 'kitchen',
    description: 'ماكينة قهوة DeLonghi الأوتوماتيكية مع مطحنة مدمجة وخاصية تبخير الحليب.',
    merchantId: 'm2', merchantName: 'بيت الأدوات', rating: 4.5, reviewCount: 142, inStock: true, createdAt: '2024-03-22',
  },
  {
    id: 'p17', name: 'ساعة Apple Watch Ultra 2', price: 1200000, originalPrice: 1450000, discount: 17,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300', category: 'electronics', subcategory: 'phones',
    description: 'ساعة Apple Watch Ultra 2 مع هيكل تيتانيوم وشاشة Always-On. مقاومة للماء حتى 100 متر.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.9, reviewCount: 167, inStock: true, featured: true, createdAt: '2024-03-25',
  },
  {
    id: 'p18', name: 'حقيبة يد جلدية فاخرة', price: 95000, originalPrice: 140000, discount: 32,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300', category: 'fashion', subcategory: 'bags',
    description: 'حقيبة يد نسائية من الجلد الطبيعي بتصميم كلاسيكي أنيق. مناسبة للاستخدام اليومي والمناسبات.',
    merchantId: 'm5', merchantName: 'أزياء العراق', rating: 4.6, reviewCount: 89, inStock: true, createdAt: '2024-03-28',
  },
  {
    id: 'p19', name: 'مكبر صوت JBL Charge 5', price: 165000, originalPrice: 210000, discount: 21,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300', category: 'electronics', subcategory: 'phones',
    description: 'مكبر صوت محمول JBL Charge 5 مقاوم للماء مع بطارية تدوم 20 ساعة.',
    merchantId: 'm1', merchantName: 'متجر الإلكترونيات', rating: 4.7, reviewCount: 234, inStock: true, createdAt: '2024-04-01',
  },
  {
    id: 'p20', name: 'طقم أواني طبخ ستانلس ستيل 12 قطعة', price: 145000, originalPrice: 200000, discount: 27,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', category: 'home', subcategory: 'kitchen',
    description: 'طقم أواني طبخ من الستانلس ستيل المقاوم للصدأ. 12 قطعة متنوعة تشمل القدور والمقالي.',
    merchantId: 'm2', merchantName: 'بيت الأدوات', rating: 4.4, reviewCount: 76, inStock: true, createdAt: '2024-04-05',
  },
];

export const sampleAds: Ad[] = [
  { id: 'ad1', title: 'تكدر تشتري كلشي بالاقساط', image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800', link: '/deals', active: true, position: 'banner', createdAt: '2024-01-01' },
  { id: 'ad2', title: 'عروض الربيع - خصم 20%', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', link: '/deals', active: true, position: 'banner', createdAt: '2024-03-01' },
  { id: 'ad3', title: 'أحدث الهواتف الذكية', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', link: '/category/electronics', active: true, position: 'banner', createdAt: '2024-03-10' },
];
