import { defineConfig } from 'vitepress'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// JSON-LD structured data (Organization + SoftwareApplication) so search
// engines and LLM crawlers can resolve the product's entity, ownership, and
// where it is published. Emitted once in the document <head> below.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://terminal.wickra.org/#organization',
      name: 'Wickra',
      url: 'https://terminal.wickra.org/',
      logo: 'https://terminal.wickra.org/wickra-mark.svg',
      sameAs: [
        'https://github.com/wickra-lib/wickra-terminal',
        'https://github.com/wickra-lib/wickra',
        'https://wickra.org/',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://terminal.wickra.org/#software',
      name: 'Wickra Terminal',
      url: 'https://terminal.wickra.org/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux, WebAssembly',
      programmingLanguage: ['Rust', 'Python', 'JavaScript', 'WebAssembly', 'C', 'C++', 'C#', 'Go', 'Java', 'R'],
      description:
        'A streaming trading terminal on the Wickra core — live charts, order-book, tape and 460 indicators — with a native TUI and a Web renderer, in ten languages.',
      license: 'https://github.com/wickra-lib/wickra-terminal#license',
      publisher: { '@id': 'https://terminal.wickra.org/#organization' },
    },
  ],
}

export default defineConfig({
  title: 'Wickra Terminal',
  description:
    'A streaming trading terminal on the Wickra core — live charts, order-book, tape and 460 indicators — with a native TUI and a Web renderer, in ten languages.',
  lang: 'en-US',
  cleanUrls: true,

  // Served at the domain root (terminal.wickra.org via Cloudflare Pages).
  base: '/',

  sitemap: { hostname: 'https://terminal.wickra.org' },

  // README.md is repo documentation, not a site page — keep it out of the build.
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/wickra-mark.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Wickra Terminal — one core, ten languages, two renderers' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A streaming trading terminal on the Wickra core: live charts, order-book, tape and 460 indicators, with a native TUI and a Web renderer sharing one data-driven core, in ten languages.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://terminal.wickra.org/og-banner.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://terminal.wickra.org/og-banner.webp' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)],
  ],

  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/(?:index)?\.md$/, '')
    const canonical = `https://terminal.wickra.org/${path}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )
  },

  themeConfig: {
    siteTitle: 'Wickra Terminal',
    logo: { src: '/wickra-mark.svg', alt: 'Wickra Terminal' },
    logoLink: 'https://wickra.org/',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Indicator demo', link: '/demo' },
      { text: 'Live (library)', link: 'https://live.wickra.org' },
      { text: 'Benchmarks', link: '/benchmarks' },
      {
        text: 'API',
        items: [
          { text: 'Rust', link: '/api/rust' },
          { text: 'Python', link: '/api/python' },
          { text: 'Node', link: '/api/node' },
          { text: 'WASM', link: '/api/wasm' },
          { text: 'C', link: '/api/c' },
          { text: 'C#', link: '/api/csharp' },
          { text: 'Go', link: '/api/go' },
          { text: 'Java', link: '/api/java' },
          { text: 'R', link: '/api/r' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/wickra-lib/wickra-terminal' },
      // The registry dropdown is deliberately absent until the first release.
      // Nothing is published yet -- verified against the registries' own APIs,
      // not their web pages, which answer 200 or 403 for names that do not
      // exist: PyPI 404, npm 404, NuGet 404, docs.rs 404, and r-universe lists
      // only `wickra`. Seven menu entries leading to seven dead ends is worse
      // than no menu, and it is the same call already made for the README's
      // registry badges. Restore it with the release.
      {
        text: 'Pre-release',
        items: [
          { text: 'Changelog', link: 'https://github.com/wickra-lib/wickra-terminal/blob/main/CHANGELOG.md' },
          { text: 'Roadmap', link: 'https://github.com/wickra-lib/wickra-terminal/blob/main/ROADMAP.md' },
          { text: 'Build from source', link: 'https://github.com/wickra-lib/wickra-terminal#quickstart' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Wickra (core)', link: 'https://wickra.org' },
          { text: 'Docs', link: 'https://docs.wickra.org' },
          { text: 'Exchange', link: 'https://exchange.wickra.org' },
          { text: 'Backtest', link: 'https://backtest.wickra.org' },
          { text: 'Terminal', link: 'https://terminal.wickra.org' },
          { text: 'Screener', link: 'https://screener.wickra.org' },
          { text: 'X-Ray', link: 'https://xray.wickra.org' },
          { text: 'Radar', link: 'https://radar.wickra.org' },
          { text: 'Copilot', link: 'https://copilot.wickra.org' },
          { text: 'Shazam', link: 'https://shazam.wickra.org' },
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'Bindings',
          items: [
            { text: 'Rust', link: '/api/rust' },
            { text: 'Python', link: '/api/python' },
            { text: 'Node', link: '/api/node' },
            { text: 'WASM', link: '/api/wasm' },
            { text: 'C', link: '/api/c' },
            { text: 'C#', link: '/api/csharp' },
            { text: 'Go', link: '/api/go' },
            { text: 'Java', link: '/api/java' },
            { text: 'R', link: '/api/r' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wickra-lib/wickra-terminal' }],

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'medium' } },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false,
  },

  vite: {
    // wickra-wasm is a wasm-pack `--target bundler` build: its JS glue does
    // `import * as wasm from './wickra_wasm_bg.wasm'` and expects the bundler
    // to instantiate the module and expose its exports. vite-plugin-wasm does
    // exactly that, and vite-plugin-top-level-await handles the top-level await
    // the wasm init emits.
    plugins: [wasm(), topLevelAwait()],
    optimizeDeps: {
      // esbuild's dep pre-bundling can't follow the .wasm ESM import, so keep
      // wickra-wasm out of it and let vite-plugin-wasm handle it on demand.
      exclude: ['wickra-wasm'],
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
