# المقترح الثاني — توزيع مستوحى من المرجع

هذه نسخة مستقلة. النسخة الأولى وملف ZIP الأصلي لم يتم تعديلهما.

- الواجهة بصورة مدينة الرياض التوضيحية، ثم الفئات المستهدفة، والتعريف بـTOD، والخدمات، وشريط الشعارات، والخاتمة.
- الصورة المرجعية استُخدمت للتوزيع فقط. لم تُنسخ بيانات الاتصال أو التواريخ أو الأرقام أو الشخص أو مسميات الخدمات منها.
- النصوص من البريف الأصلي. الخطوط الأصلية DM Sans / Inter / Noto Naskh Arabic مستمرة.
- أيقونات LinkedIn وInstagram وX في التذييل. الحسابات غير مؤكدة؛ لا توجد روابط وهمية. لإضافة الحسابات عدّل `content/social.json` واستبدل `null` برابط HTTPS الحقيقي، واحذف أي منصة غير مطلوبة.
- صورة الواجهة هي الصورة البديلة المرفقة من المستخدم، ولا تُستخدم كادعاء عن مقر TOD أو مشروعاتها.
- تشغيل هذه النسخة على منفذ 3010 يسمح بمقارنتها مع النسخة الأولى على منفذ 3000.

```bash
npm install
npm run dev
```

افتح http://localhost:3010/en أو http://localhost:3010/ar.

---

# TOD Arabia — Option 02 / المقترح الثاني

Next.js App Router + TypeScript. Original TOD PNG assets, locally bundled DM Sans / Inter / Noto Naskh Arabic fonts, responsive layouts, English and Arabic routing. No CMS account, API key or external font request is required.

## تشغيل سريع / Quick start

Use Node.js 20.9+ (Node 22 or 24 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3010/en or http://localhost:3010/ar.

```bash
npm run typecheck
npm run build
npm start
```

`npm ci` uses the supplied lockfile for reproducible installs. `npm run build` is a production build, not a static export. Deploy to Vercel or a Node.js host; do not upload source files to a static-only web host.

## GitHub / Vercel

1. Extract the ZIP. Upload the contents of `tod-arabia` to a new GitHub repository (package.json must be at the repository root).
2. In Vercel, import that repository. Choose Next.js; keep the default install/build/output settings.
3. Set `SITE_URL` to your final https domain. Leave `SITE_INDEXABLE=false` during prototype review.
4. Deploy. No additional services are required for the prototype.
5. After the launch items below are completed, set `SITE_INDEXABLE=true` and redeploy. The unapproved Arabic shell remains noindex.

## Pages

- `/en` and `/ar`
- `/{locale}/services`
- `/{locale}/services/organisation-transformation`
- `/{locale}/services/leadership-coaching-mentoring`
- `/{locale}/services/learning-capability`
- `/{locale}/our-thinking`
- `/{locale}/who-we-work-with`
- `/{locale}/about`
- `/{locale}/contact`

The root redirects to `/en`. Language switching preserves the current page. Unknown pages return 404. Arabic navigation and form labels are draft UI translations; brief copy remains English with explicit `lang="en" dir="ltr"` until approved Arabic text is supplied. The root Arabic document uses `lang="ar" dir="rtl"` and Noto Naskh Arabic. Do not present the Arabic prototype as approved translated copy.

## Content and CMS integration

- `lib/content.ts`: original English brief copy, services, themes, sectors, and reusable TypeScript types with paired EN/AR fields.
- `content/clients.json`: 42 ordered placeholder slots. Set `name.en`, `name.ar`, `logo` (e.g. `/clients/name.svg`), `sector`, `attribution`, and `approved: true` after permission. Assets go in `public/clients`. Slots are capacity, **not a claim of 42 clients**.
- `content/editorial.json`: empty insight, case study and team collections. Their reusable schemas are in `lib/content.ts`; publication is deliberately empty without approved content. No invented articles, people, testimonials or case outcomes.
- Replace the local content imports with a CMS repository/adapter. Keep approval filtering server-side, add detail routes for published editorial records, map paired translation fields, and preview drafts separately. This prototype has no CMS administration or database.
- `docs/source-brief.txt`: extracted supplied brief for traceability. Do not publish this internal handover document as website content.
- `public/brand`: original supplied PNG artwork, transparently cropped and downscaled for web use without redrawing the marks.

Carousel: uninterrupted 180-second horizontal loop, 6 slots desktop, 4 tablet, 2.5 mobile. Hover and keyboard focus pause it; a persistent toggle lets users pause/resume. Reduced motion disables animation and enables manual horizontal scrolling. The duplicated set is hidden from assistive technology. No cards, shadows, rounded boxes or gold-filled logo boxes.

## Contact form — deliberately frontend only

Required fields, email validation, optional telephone, interest, enquiry, preferred contact method, and a demonstration acknowledgement. Submission validates fields and explicitly reports **no enquiry sent**. Nothing is transmitted, stored or logged. There is no fake success message. Before live use: add the approved privacy notice and privacy consent wording, connect a server-side form endpoint/email service, validate input server-side, configure delivery and spam/rate controls, and test delivery/error handling. Do not collect real enquiries through this demo.

## Before public launch

TOD must supply/approve client assets and attribution; Arabic translations; leadership biographies/photos; contact details; privacy notice and consent; any articles/case studies. Connect contact delivery, confirm domain/admin ownership, and review final accessibility and performance on target devices. There are no analytics or cookies in this prototype. Mentoring remains a separate future product; no platform or unapproved external platform URL is included.

SEO includes individual titles/descriptions, canonical and language links, sitemap and robots controls. Preview indexing is off by default. Fonts are installed through Fontsource and self-hosted in the build; package licence files remain available in installed dependencies.

Official framework setup: https://nextjs.org/docs/app/getting-started/installation
