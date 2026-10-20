# Media editor and RB Arabic — 20 October 2026

- Added a local-only editor at 127.0.0.1:3014. `npm run edit` starts editor plus Next development preview at 127.0.0.1:3013, using polling for reliability on macOS.
- 22 image slots, 3 TOD brand assets, 42 client logos and captions are editable. Logo inputs now drive the header/footer and brand panel. Existing CMS schema includes the brand fields as well.
- Saves write content JSON and uploaded assets to the project, with backups. Vercel receives changes after GitHub push/rebuild; this local editor is not deployed as a public write endpoint.
- Uploaded PNG/JPEG/WebP signature and size checks; fixed target registry; loopback binding, Host/Origin checks and per-process anti-CSRF token.
- RB Regular and Bold supplied by the user replace Noto Naskh for Arabic. English navigation is larger and semibold; Arabic navigation uses real bold.
- Tests: media upload persistence, caption change, backups, invalid image rejection, unknown target rejection. Browser save confirmed; client tab shows 42 entries. Content checks and production build passed. Browser computed RB and weight 700; document width equals viewport at 1280.
