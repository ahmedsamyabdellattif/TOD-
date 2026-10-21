# Version 3 verification — 17 October 2026

## Passed

- `npm run check:content`: 24 services across 7/8/9 streams, 42 organizations, 12 system elements, 7 values, 7 audiences, 5 process stages, four Home image slots; bilingual content and referenced local assets verified.
- `npm run build`: production compilation, TypeScript and generation of 20 locale/page combinations completed successfully.
- All 20 pages returned HTTP 200 with the correct EN/LTR or AR/RTL document attributes. Unknown page returned 404.
- Icon, social image (1200×630 PNG), CMS UI, bundled CMS script, CMS schema, robots.txt and sitemap.xml returned 200.
- Unconfigured CMS and contact APIs returned 503. No email was sent. UI explains the setup state instead of reporting false success.
- Browser inspected: desktop 1280×720, tablet 768×1024, Arabic mobile 390×844. No horizontal document overflow in the inspected Arabic Home and Approach states.
- Gallery Next selected the second image slot; service filtering showed nine Capability workshops; Human Systems selection displayed Purpose and Arabic purpose copy; CIRCLES selection displayed Curiosity; Escape reset its center. Mobile navigation opened and closed.
- Header and typography, Riyadh image, CIRCLES and Human Systems visually reviewed. Screenshot artifacts: desktop-en.jpg and mobile-ar.jpg.
- Hash comparison against the preserved option 1 and option 2 source snapshots: zero changes.

## External setup / acceptance remaining

- Real email delivery, Turnstile validation and distributed rate limiting need production credentials/domain setup and an authorized end-to-end send test.
- CMS GitHub login, editorial publishing and Vercel rebuild need an OAuth provider and account permissions; not tested with client credentials.
- Associate/article templates have no invented seed people/articles. Publishing real entries and cross-browser acceptance must be checked after content is supplied.
- Final legal text, address/CR, image rights, client attribution and logo permissions, corrected final SVG logo package, and contextual Arabic translation need client review.
- This is not a full accessibility certification, penetration test or exhaustive device lab report. Keyboard controls, semantic labels, contrast tokens, focus styling and reduced-motion behavior are implemented; user/device acceptance remains part of launch.

## Local preview

Production preview runs at http://localhost:3012/en and /ar. The development watcher hit this machine's open-file limit; the production server avoids that watcher and was used for verification. If that issue recurs during development, stop unused dev servers or use the production preview after building.

## Layout correction

Restored the Option 02 city-led hero, audience columns, dark About band and three service panels while retaining the latest bilingual content. Header navigation now exposes Home, About TOD, Our Approach, Associates, Services, Who We Work With, The Development Library, Contact, Legal in that order. Added a Legal landing page in both languages. Production build passed with 22 page/locale combinations. Previous v3 ZIP retained as TOD-Arabia-v3-before-layout-fix.zip.

Corrected layout visually checked at 1280px and Arabic 390px; mobile menu contains all nine links and no horizontal overflow. Legal links verified.

## Reference match — 19 October 2026
Compared the live https://mt-tod.vercel.app/en page visually and checked its computed font and image styles. Restored DM Sans for English Home/header/footer, the reference palette and proportions, three About sidebar items using current approved stage text, five-column audience rhythm with the two new audiences on the next row, and the exact reference photograph. Retained latest copy, all nine navigation links, four image slots, and the approved diagrams on internal pages. Production build passed. Desktop 1280 and Arabic mobile 390 were visually inspected; no horizontal overflow. Gallery next button selects slot 2. No deployment performed.
