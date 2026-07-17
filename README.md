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
    - `GET /file` — empty cloud file listing (cloud storage is gone)
    - `GET /market` — empty elements-market listing (the market API was never
      archived; an empty list keeps the library panel's search working)
    - `GET /config.js` — runtime flags for the frontend (currently
      `window.UNSPLASH_ENABLED`), loaded by `index.html` before the bundles
    - `GET /unsplash/*` — optional Unsplash proxy, see below
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

### Unsplash photos (optional)

The original app reached Unsplash through Corel's server-side proxy, which is
gone — but the Unsplash API itself is alive. `server.js` re-implements the
proxy (`/unsplash/featured`, `/unsplash/search/photos`,
`/unsplash/download/photo`): register a free app at
<https://unsplash.com/developers> and start the server with

```sh
UNSPLASH_ACCESS_KEY=your-access-key npm start   # or set it in the environment for docker compose
```

and the library panel's **Photos** category works again (browse, search,
drag-and-drop insert). Downloads are reported to Unsplash per their API
guidelines, and responses are cached for 10 minutes to stay inside the free
tier's 50 requests/hour. Without a key the whole LIBRARIES tab stays hidden,
since it has no other living content source.

## Working on the app code

The two patched webpack bundles are split into one file per module under
`src/bundles/designer.browser/` (965 modules) and `src/bundles/chunk.vendor/`
(756 modules), with an `INDEX.md` in each mapping module ids to class/string
hints. This is the preferred way to modify the app:

1. Find the module (grep `src/bundles/`, skim `INDEX.md`, or map a
   stack-trace line with `npm run where -- designer.browser.js:49475`).
2. Edit the module file (each is a valid standalone `module.exports = ...`).
3. `npm run build` — reassembles `public/<bundle>.js`, syntax-checks it,
   syncs every service-worker precache revision in `cacher.js`
   (`scripts/sync-cacher.js`), and refreshes the `.br`/`.gz` variants.
   Commit `src/bundles/` and `public/` together.
4. `npm test` — boots the server (plus a mock Unsplash API) and drives the
   real app in headless Chromium: app boots clean, no third-party or `/null`
   requests, dead features stay hidden, Unsplash proxy works end-to-end, and
   the editor itself works — draw a rectangle, undo/redo, export PNG/SVG/PDF,
   save to `.gvdesign` and reopen it with content intact, and the service
   worker installs with its full precache.
   Needs a Chromium binary (set `CHROMIUM_PATH` if it isn't auto-found).

The build also emits debugging aids (gitignored, regenerated each build):
`src/bundles/<name>/linemap.json` maps built-bundle line ranges to module
files (that's what `npm run where` reads), and `public/<name>.js.map` is a
real source map — `server.js` advertises it via the `SourceMap` response
header and serves the module files under `/src/`, so browser DevTools
debugs the split modules instead of the 8-15MB bundles.

`npm run split -- <name>` regenerates a bundle's split from
`public/<name>.js` if you ever patch the bundle directly.

### Readability pipeline

The split modules have been run through a behavior-preserving readability pass
so they're no longer raw minifier output:

- **`npm run name`** (`scripts/name-modules.js`) derives a human name for each
  module id from how the bundle uses it (`n(123).GFoo` votes to name module
  123 `GFoo`), storing them in each bundle's `names.json`. Edit that file to
  add or correct names; manual entries are always kept. It also regenerates
  `INDEX.md` keyed on those names. Auto-derived names are unique across both
  bundles (module ids are global across chunks): the heuristics identify
  *usage*, not identity, and an unchecked run once labeled 15 different
  modules "GCommonNames" after the shared strings table they all use. When
  you correct a name in `names.json`, `npm run refine` re-syncs the
  already-refined modules — it renames stale G-style require variables and
  adds/refreshes/removes the inline `require(N /* Name */)` annotations.
- **`npm run refine`** (`scripts/refine-bundle.js`) rewrites the modules using
  scope-aware AST renames applied as text splices (no code generation):
  webpack params `(e, t, n)` → `(module, exports, require)`; `var o = n(15)` →
  `var GPlatform = require(15)` for named modules; inline
  `require(820 /* GoogleTagManagerSettings */)` annotations; and `!0`/`!1`/
  `void 0` → `true`/`false`/`undefined`. It skips any module using `eval` and
  never renames across a free `module`/`exports`/`require` reference. It is
  idempotent — safe to re-run after adding names.
- **`npm run verify-refine`** (`scripts/verify-refine.js`) proves the tools
  changed nothing but names and literal spellings: it canonicalizes every
  module (each identifier → its scope-resolved binding ordinal, free names
  kept, `!0`↔`true`, comments stripped) and diffs the token stream against
  `git HEAD`. Because identifiers resolve to bindings rather than one flat
  placeholder, a rename that *merges* two bindings (`var o = e` →
  `var x = x`) or captures a reference diverges and fails the check. A
  non-zero exit means an edit altered behavior. All 1721 modules currently
  verify clean.

- **`npm run rename`** (`scripts/rename-module.js`) is the ergonomic way to
  improve a module's body further — scope-aware variable renames applied as
  text splices:

  ```sh
  npm run rename -- designer.browser/1037 e:project t:translation
  ```

  When several distinct bindings share a minified name, it lists them with
  declaration lines and you disambiguate with `e@25:project`. A rename is
  refused if the new name already occurs in that binding's scope subtree
  (no reference can be captured), and the result is canonical-token-compared
  against the original before writing — the same proof `verify-refine` uses —
  so a behavior-changing rename cannot be saved. Sibling scopes can safely
  reuse the same new name.

**Pipeline ordering matters.** The vote-based naming in `npm run name` reads
the mangled shapes (`n(123).GFoo`, single-letter require vars) that
`npm run refine` then rewrites, so full naming only works on freshly re-split
bundles — run `split → name → refine → verify-refine → build` in that order.
Run against already-refined bundles, `npm run name` prints a note and applies
only the refine-stable heuristics (library signatures like `polyfill:RegExp`
and `_interopRequireDefault`, plus locale-key names). Names in `names.json`
are always preserved regardless, so hand-added names are safe.

## Maintenance notes

- **Service worker cache busting:** `public/cacher.js` precaches ~1300 files,
  keyed by `revision` strings (the file's md5). `npm run build` (or
  `npm run sync-cacher` standalone) recomputes every revision from the actual
  file contents, so editing any precached file is picked up automatically —
  no manual bumping. It also fails hard if a precached file is missing from
  `public/`, since a single 404 during precaching aborts the whole
  service-worker install.
- **Pre-compression:** `scripts/precompress.js` writes `.br`/`.gz` next to the
  root JS/CSS bundles (gitignored, rebuilt in the Docker image). The server
  prefers them and falls back to on-the-fly gzip.
- **Filenames:** a few assets legitimately contain spaces (e.g.
  `assets/data/acv/Lord Kelvin.acv`). An earlier mirror artifact had them saved
  with literal `%20`, which 404'd and broke the whole service-worker install —
  don't reintroduce that.

## Known-dead features (backend is gone, UI hidden)

Dead features are hidden in the UI rather than left to show empty or broken
content:

- **Templates** ("New from template"): the template listing/content API and
  the category thumbnails were never archived. The File-menu action
  (`GNewFromTemplateAction.isAvailable`, module `1623`) and the welcome
  dialog's "New from Template" tile (module `1544`) are removed.
- **Elements library content**: category icons are mirrored locally
  (`assets/libraries/`, recovered via the Wayback Machine), but the
  shape/sticker/illustration market API is gone. The dead categories are
  hidden (module `1664`); the LIBRARIES sidebar tab only appears at all when
  the Unsplash proxy is configured (module `1662`), since Unsplash Photos is
  its only living category.
- **Unsplash photos**: revived via the optional local proxy — see "Unsplash
  photos" above. Hidden when no API key is configured.
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

The one opt-in exception: with `UNSPLASH_ACCESS_KEY` configured, browsing the
library panel's Photos category loads thumbnails and images directly from
`images.unsplash.com` (hotlinking is required by Unsplash's API guidelines).
API calls go through the local server; the browser never talks to
`api.unsplash.com` and the key is never exposed to the client.
