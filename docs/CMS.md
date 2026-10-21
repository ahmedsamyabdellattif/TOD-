# TOD Content Studio

المحرر Decap CMS 3.17.1 مستضاف ضمن الملفات، ويحرر ملفات JSON في GitHub. الواجهة: `/admin/index.html`. لم يتم ربط حسابات العميل أو إعداد أسرار نيابة عنه.

## الربط مرة واحدة

1. ضع ملفات المشروع في جذر المستودع المحدد في `CMS_REPO`. إن استخدمت Root Directory فرعيًا، عدّل مسارات `file` و`media_folder` في `public/admin/schema.json` لتشمل ذلك المجلد.
2. جهّز مزود GitHub OAuth متوافقًا مع Decap. يمكن استخدام خدمة Netlify OAuth أو أحد مزودي OAuth الخارجيين في توثيق Decap. أنشئ OAuth application في حساب العميل وأدخل secret في المزود فقط، وليس في الموقع أو ملفات public.
3. اضبط `CMS_AUTH_URL` على أصل مزود OAuth، و`CMS_AUTH_ENDPOINT` على مسار المصادقة لديه (عادة auth). اضبط `CMS_REPO` و`CMS_BRANCH` و`CMS_ENABLED=true`، ثم أعد النشر.
4. سجّل الدخول بحساب GitHub يملك صلاحية push للمستودع. صلاحيات GitHub هي مصدر الصلاحيات. استخدم حسابات فردية؛ لا تشارك كلمة المرور.

المصادر الرسمية: https://decapcms.org/docs/github-backend/ و https://decapcms.org/docs/external-oauth-clients/

## استخدام المحرر

- افتح TOD Content. Site يدير الاتصال والروابط والصور والبيانات القانونية.
- Images يحتوي أربع خانات: استبدل ملف الصورة وأضف وصفها باللغتين. حافظ على الخانات الأربع وIDs.
- Page Images لإضافة صور الصفحات. JPEG/WebP محسنة وعرض 1600–2000px مناسب. احتفظ بحقوق الاستخدام.
- Services / Audiences / About / Approach / Values / Systems / Stages تدير النصوص المعتمدة. حافظ على IDs وترتيب العناصر الأساسية.
- Articles: أضف slug لاتينيًا ثابتًا، نصوص اللغتين، التاريخ، التصنيف، author (slug من Associates)، الصورة ووصفها، related slugs إن وجدت. Published يعرض المقال، Featured يميزه. Body يدعم Markdown دون HTML خام.
- Associates: الاسم والمسمى والنبذة والصورة والاختصاصات والمؤهلات واللغات والرابط والترتيب. Published يفعّل الصفحة.
- Clients: الاسم والترتيب. لا تجعل logoApproved=true إلا بعد التصريح وإرفاق الملف. attributionConfirmed سجل لمراجعة نسبة الخبرة؛ لا يحجب الاسم تلقائيًا. يُعرض أول 14 في الرئيسية.
- المحرر يستخدم editorial_workflow؛ احفظ مسودة ثم راجعها وانشرها. النشر يغيّر GitHub ويشغّل نشر Vercel المرتبط؛ انتظر نجاح البناء قبل مشاركة الرابط.

## النسخ الاحتياطي والاسترجاع

المحتوى والصور المرفوعة محفوظان في Git. كل نشر له commit، ويمكن الرجوع إلى commit سابق أو نشر Vercel سابق. خذ نسخة دورية من المستودع ومن إعدادات الحسابات بوسيلة آمنة. الأسرار ليست ضمن ZIP أو Git. ملكية النطاق وGitHub وVercel والبريد وOAuth يجب أن تبقى لحسابات العميل.
