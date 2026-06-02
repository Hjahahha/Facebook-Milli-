# دليل المساهمة

## شكراً على اهتمامك بالمساهمة! 🎉

هذا المستند يشرح كيفية المساهمة في مشروع Ishtar Portal.

---

## القواعد والمبادئ

### الاحترام والتسامح
- احترم جميع المساهمين
- اقبل الآراء المختلفة
- كن لطيفاً وبناء في النقاش
- لا تتسامح مع التحرش أو الكراهية

### جودة الكود
- اتبع معايير Python (PEP 8)
- اكتب كود نظيف وسهل الفهم
- أضف تعليقات حيث لزم الأمر
- اختبر الكود قبل الإرسال

### الرسائل الواضحة
- اكتب رسائل commit واضحة ووصفية
- استخدم الحروف الصغيرة والفاصلة العليا
- اذكر issue المتعلق (إن وجد)

---

## خطوات المساهمة

### 1. الإعداد الأولي
```bash
# Fork المشروع
git clone https://github.com/YOUR_USERNAME/Facebook-Milli-.git
cd Facebook-Milli-

# أضف الـ upstream
git remote add upstream https://github.com/Hjahahha/Facebook-Milli-.git

# أنشئ بيئة افتراضية
python -m venv venv
source venv/bin/activate  # على macOS/Linux
venv\\Scripts\\activate    # على Windows

# ثبّت المتطلبات
pip install -r requirements.txt
```

### 2. إنشاء فرع جديد
```bash
# قم بالتحديث من upstream
git fetch upstream
git rebase upstream/main

# أنشئ فرع جديد
git checkout -b feature/your-feature-name
```

### 3. إجراء التغييرات
```bash
# عدّل الملفات
# أضف تعليقات ووثائق
# اختبر الكود

# تحقق من التغييرات
git status
git diff
```

### 4. اختبار الكود
```bash
# شغّل التطبيق
python app.py

# اختبر الميزة الجديدة
# تحقق من عدم وجود أخطاء
# اختبر في متصفحات مختلفة
```

### 5. Commit التغييرات
```bash
# أضف الملفات المعدلة
git add .

# اكتب رسالة واضحة
git commit -m "Add feature: description of what you did"

# مثال:
# git commit -m "Add merchant verification dashboard"
```

### 6. Push إلى فرعك
```bash
# ادفع التغييرات
git push origin feature/your-feature-name
```

### 7. فتح Pull Request
1. اذهب إلى GitHub
2. انقر على "New Pull Request"
3. اختر فرعك
4. اكتب عنواناً واضحاً
5. اكتب وصفاً مفصلاً للتغييرات
6. اذكر أي issues متعلقة
7. انقر على "Create Pull Request"

---

## نموذج رسالة Commit الجيدة

```
Add feature: brief description

More detailed explanation of what was changed and why.
Explain the problem that was solved.
Mention any related issues: Closes #123

Changes:
- Change 1
- Change 2
- Change 3
```

---

## معايير قبول Pull Request

✅ **يجب أن يحقق:**
- الكود يعمل بدون أخطاء
- يتبع معايير الكود (PEP 8)
- يحتوي على تعليقات واضحة
- لا يكسر الميزات الموجودة
- رسالة واضحة ومفيدة
- مرتبط بـ issue إن أمكن

❌ **سيتم الرفض إذا:**
- الكود به أخطاء
- لا يتبع معايير الكود
- يكسر اختبارات موجودة
- يتضمن محتوى غير ملائم
- يفتقد التوثيق

---

## أنواع المساهمات المرحب بها

### 🐛 إصلاح الأخطاء
- اعثر على مشكلة
- أنشئ issue
- أصلح المشكلة
- أرسل pull request

### ✨ ميزات جديدة
- اقترح الميزة في discussion
- انتظر موافقة المحافظين
- طور الميزة
- أرسل pull request

### 📚 توثيق
- حسّن التعليقات
- أضف أمثلة
- حسّن README
- صحح الأخطاء الإملائية

### 🎨 تحسينات الواجهة
- تحسين التصميم
- تحسين التجربة
- إضافة رموز
- تحسين الأداء

---

## الإبلاغ عن مشاكل

### قبل الإبلاغ عن issue:
1. ابحث عن issues موجودة
2. تحقق من الوثائق
3. اختبر بنسخة أحدث

### عند فتح issue:
1. اختر القالب المناسب
2. اكتب عنواناً واضحاً
3. صف المشكلة بالتفصيل
4. أضف خطوات التكرار
5. أضف لقطات شاشة إن أمكن
6. اذكر بيئتك (OS، Python version، etc)

---

## نصائح للمساهمين الجدد

- ✅ ابدأ بـ issues بسيطة (good first issue)
- ✅ اقرأ الكود الموجود أولاً
- ✅ اسأل في discussions إذا احتجت مساعدة
- ✅ كن صبوراً (قد يستغرق الـ review وقتاً)
- ✅ تقبل النقد البناء بإيجابية
- ✅ تعلّم من الأخطاء
- ✅ استمتع بالعملية! 🎉

---

## شكر خاص

شكر كبير لكل من ساهم في هذا المشروع!
أنتم تجعلون هذا المشروع أفضل كل يوم. ❤️

---

**آخر تحديث:** 2 يونيو 2026
