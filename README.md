<p align="center">
  <a href="https://terminal.wickra.org"><img src="https://raw.githubusercontent.com/wickra-lib/.github/main/profile/wickra-banner.webp?v=514-7" alt="Wickra Terminal — a streaming trading terminal with a native TUI and a Web renderer sharing one data-driven core" width="100%"></a>
</p>

[![Built on Wickra](https://raw.githubusercontent.com/wickra-lib/.github/main/profile/badges/wickra-terminal-site/built-on.svg)](https://github.com/wickra-lib/wickra)
[![Docs](https://raw.githubusercontent.com/wickra-lib/.github/main/profile/badges/wickra-terminal/docs.svg)](https://terminal.wickra.org)
[![License: MIT OR Apache-2.0](https://raw.githubusercontent.com/wickra-lib/.github/main/profile/badges/wickra-terminal/license.svg)](https://github.com/wickra-lib/wickra-terminal#license)
[![Built with VitePress](https://raw.githubusercontent.com/wickra-lib/.github/main/profile/badges/wickra-terminal-site/vitepress.svg)](https://vitepress.dev)

---

Source for the Wickra Terminal site (**[terminal.wickra.org](https://terminal.wickra.org)**): hero, per-language API overviews, benchmarks and the in-browser indicator demo.
Built with [VitePress](https://vitepress.dev).

The structure mirrors [webpage](https://github.com/wickra-lib/webpage)
(wickra.org) and [wickra-docs](https://github.com/wickra-lib/wickra-docs)
(docs.wickra.org): shared header, footer, theme, badge pipeline and workflows.
**Wickra Terminal** — a streaming trading terminal with a native TUI and a Web renderer sharing one data-driven core. The library itself is
[`wickra-lib/wickra-terminal`](https://github.com/wickra-lib/wickra-terminal); its README carries the install line and a quick start for every language.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (also fails on dead internal links)
npm run preview  # preview the production build
```

The demo page loads the published [`wickra-wasm`](https://www.npmjs.com/package/wickra-wasm)
bundle from npm — the indicator core the product is built on — so it runs the real
indicators in the browser.

## What is kept current by workflow

- **The released version** — the version menu in the nav, the Maven snippet on the landing page and the Java API page — is pulled hourly from [wickra-terminal's latest release](https://github.com/wickra-lib/wickra-terminal/releases/latest) by `sync-from-terminal.yml`.
- **The demo's `wickra-wasm` bundle** follows the core's latest release, refreshed by the same workflow (package.json and the lockfile together).
- **The status badges** in the footer are snapshots refreshed hourly by `refresh-badges.yml`; the SVGs in `public/badges/` are generated, not edited.

Everything else — the copy, the API pages, the benchmark figures (from the repository's `BENCHMARKS.md`) — is edited here by hand.

## Deploy

Static build via Cloudflare Pages (Git integration, no deploy secret):

- **Build command:** `npm run build`
- **Output directory:** `.vitepress/dist`
- **Node version:** 22 (`.nvmrc`)

Custom domain `terminal.wickra.org` is configured in the Cloudflare Pages dashboard.

## License

Dual-licensed under [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.
