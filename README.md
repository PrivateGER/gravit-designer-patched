# gravit-designer-patched

A rescued, self-hostable build of **Gravit Designer / Corel Vector** (v3.15.0,
browser build), preserved after the service was shut down in 2025. The original
web app has been deminified, patched to talk to a local stub server instead of
the defunct Corel cloud, and stripped of its dead licensing checks.

## How it works

- `public/` — the patched frontend. All cloud/websocket URLs in
  `designer.browser.js` point at the hosting domain's stub API. The app runs in
  anonymous/offline mode and works with local files.
- `server.js` — a small Express server that serves `public/` and stubs the
  handful of API endpoints the app calls at startup:
    - `GET /connection/test` — online check
    - `GET /maintenance/status` — always "no maintenance"
    - `GET /user`, `PUT /user`, `GET /user/settings` — a placeholder user with a
      far-future trial so the app stays unlocked
    - `GET /subscription/test` — subscriptions disabled (hides purchase flows)
    - `GET /file` — empty cloud file listing ("Open Recent")
    - `WS /license` — answers the app's keep-alive pings

  Endpoints that intentionally 404 and are handled by the app's fallbacks:
  `GET /license` (falls back to the patched default license) and
  `GET /i18n-url/...` (translation packs are gone; the app falls back to its
  bundled English strings).
- `public/cacher.js` — the original Workbox service worker, patched to load a
  self-hosted Workbox runtime from `public/workbox/` instead of the Google CDN.

## Running

```sh
docker compose up -d --build   # serves on port 7584
```

or directly:

```sh
npm ci
node scripts/precompress.js    # optional: pre-build .br/.gz for the big bundles
npm start                      # serves on port 3100 (override with PORT=...)
```

## Maintenance notes

- **Service worker cache busting:** `public/cacher.js` precaches ~1300 files,
  keyed by `revision` strings. If you edit any precached file (notably
  `designer.browser.js` or `chunk.vendor.js`), you MUST change its `revision`
  in `cacher.js`, or returning browsers will keep the old cached copy forever.
- **Pre-compression:** `scripts/precompress.js` writes `.br`/`.gz` next to the
  root JS/CSS bundles (gitignored, rebuilt in the Docker image). The server
  prefers them and falls back to on-the-fly gzip.
- **Filenames:** a few assets legitimately contain spaces (e.g.
  `assets/data/acv/Lord Kelvin.acv`). An earlier mirror artifact had them saved
  with literal `%20`, which 404'd and broke the whole service-worker install —
  don't reintroduce that.

## Known-dead features (backend is gone)

- **Templates** ("New from template"): the template listing/content API and the
  category thumbnails were never archived. The dialog will show empty/broken
  content.
- **Elements library content**: category icons are mirrored locally
  (`assets/libraries/`, recovered via the Wayback Machine), but the actual
  shape/sticker/illustration market API is gone, so categories are empty.
- **Unsplash photos**: the proxy API is gone; the integration is disabled in
  the bundle (`ENABLE_UNSPLASH_INTEGRATION`).
- **Documentation** is bundled: `public/docs/` is a self-contained mirror of
  `documentation.corelvector.com` (102 pages + assets, recovered from the
  Wayback Machine), and the app's help links point at `/docs/...`. The
  Wayback crawler never captured roughly a third of the images and most
  tutorial videos; those show as missing on some pages — that content is
  lost everywhere, including on archive.org itself.
- **UI translations**: the locale-pack CDN was never archived, so the app
  always falls back to its bundled English strings.
- Anything requiring real cloud accounts: sharing, collaboration, comments,
  cloud storage.

## Privacy

The bundle's calls to Corel's Google Tag Manager container and Google
reCAPTCHA have been neutered (script injection removed in
`designer.browser.js` / `chunk.vendor.js`), so the app no longer phones home
to third-party analytics. The mirrored documentation is likewise scrubbed:
Google Analytics removed and the Montserrat webfont self-hosted, so `/docs`
pages make no external requests either.
