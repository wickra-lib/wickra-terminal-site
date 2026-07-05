---
layout: home
title: Wickra Terminal — a streaming trading terminal with TUI and Web renderers
titleTemplate: false

hero:
  name: "Wickra Terminal"
  text: "One core. Ten languages. Two renderers."
  tagline: "A streaming trading terminal on the Wickra core — live charts, order-book, tape and 514 indicators — with a native TUI and a Web front-end as selectable renderers of the same logic."
  image:
    src: /wickra-mark.svg
    alt: Wickra Terminal
  actions:
    - theme: brand
      text: View on GitHub
      link: https://github.com/wickra-lib/wickra-terminal
    - theme: alt
      text: Renderers & panels
      link: https://github.com/wickra-lib/wickra-terminal/tree/main/docs
    - theme: alt
      text: API
      link: /api/rust

features:
  - icon: 🧠
    title: One data-driven core
    details: "terminal-core folds market events into an O(1) AppState and turns panels into view-models — values, series, colours — never renderer commands. The logic lives in one place."
  - icon: 🖥️
    title: Two renderers, one logic
    details: "The native TUI maps a view-model to a ratatui widget; the Web app maps the same view-model to a canvas draw. Pick the front-end with --render tui|web."
  - icon: 🔌
    title: Pluggable data sources
    details: "The DataSource trait is an activatable module: Live over the ten largest venues (wickra-exchange), Replay with time-machine seek (wickra-backtest), or a deterministic Synth feed."
  - icon: 📊
    title: 514 streaming indicators
    details: "Live charts, order-book and tape panels driven by the full Wickra indicator set, updated tick by tick on a streaming O(1) state."
  - icon: 🧩
    title: The config is data
    details: A Config names the sources and the panel layout as JSON. Because it is data, the exact same terminal crosses the C ABI and WASM unchanged.
  - icon: 🌐
    title: 10 languages
    details: "The core is a JSON-over-C-ABI data API (Terminal::command_json) in Rust, Python, Node.js, WASM, C, C++, C#, Go, Java and R, so any language builds its own front-end."
---

<script setup>
const installTabs = [
  { label: 'Python', lang: 'bash', code: 'pip install wickra-terminal' },
  { label: 'Node',   lang: 'bash', code: 'npm install wickra-terminal' },
  { label: 'Rust',   lang: 'bash', code: 'cargo add wickra-terminal' },
  { label: 'WASM',   lang: 'bash', code: 'npm install wickra-terminal-wasm' },
  { label: 'C',      lang: 'bash', code: '# prebuilt header + library from GitHub releases:\n# github.com/wickra-lib/wickra-terminal/releases' },
  { label: 'C#',     lang: 'bash', code: 'dotnet add package WickraTerminal' },
  { label: 'Go',     lang: 'bash', code: 'go get github.com/wickra-lib/wickra-terminal-go' },
  { label: 'Java',   lang: 'xml',  code: '<!-- Maven Central -->\n<dependency>\n  <groupId>org.wickra</groupId>\n  <artifactId>wickra-terminal</artifactId>\n  <version>0.1.0</version>\n</dependency>' },
  { label: 'R',      lang: 'r',    code: 'install.packages("wickraterminal", repos = "https://wickra-lib.r-universe.dev")' },
]

const pyCode = `import json
from wickra_terminal import Terminal

config = json.dumps({
    "sources": [{"Synth": {"seed": 1}}],
    "layout": {"panels": [{"kind": "Chart", "rect": {"x": 0, "y": 0, "w": 100, "h": 100}}]},
})

term = Terminal(config)
term.command(json.dumps({"type": "Subscribe", "source": 0, "symbol": "BTC/USDT"}))
raw = ""
for _ in range(20):
    raw = term.command(json.dumps({"type": "Tick"}))
print(json.loads(raw)["panels"][0])`

const nodeCode = `import { Terminal } from 'wickra-terminal'

const config = JSON.stringify({
  sources: [{ Synth: { seed: 1 } }],
  layout: { panels: [{ kind: 'Chart', rect: { x: 0, y: 0, w: 100, h: 100 } }] },
})

const term = new Terminal(config)
term.command(JSON.stringify({ type: 'Subscribe', source: 0, symbol: 'BTC/USDT' }))
let raw = ''
for (let i = 0; i < 20; i++) raw = term.command(JSON.stringify({ type: 'Tick' }))
console.log(JSON.parse(raw).panels[0])`

const cliCode = `# Native TUI renderer over a live Binance feed:
wickra-terminal --render tui --source live:binance:BTC/USDT

# Same core, Web renderer, over a deterministic synthetic feed:
wickra-terminal --render web --source synth:1`

const snippetTabs = [
  { label: 'Python', lang: 'python',     code: pyCode },
  { label: 'Node',   lang: 'javascript', code: nodeCode },
  { label: 'CLI',    lang: 'bash',       code: cliCode },
]
</script>

## The config is JSON, not code

A `Config` names the `sources` to activate and the panel `layout`. The terminal folds
each source's feed into an O(1) state and renders the panels as view-models.

```json
{
  "sources": [{ "Synth": { "seed": 1 } }],
  "layout": {
    "panels": [{ "kind": "Chart", "rect": { "x": 0, "y": 0, "w": 100, "h": 100 } }]
  }
}
```

Because the config is data, the same terminal crosses the C ABI and WASM unchanged,
and the same frame comes back byte-for-byte in every language.

## Install

The same terminal core from every language — native Rust, Python, Node.js and WASM,
plus a C ABI for C, C++, C#, Go, Java and R.

<InstallTabs :tabs="installTabs" />

## Drive the core, render anywhere

Build a terminal from a config, subscribe a symbol, then pull frames. The `command`
API returns the same bytes in every binding — the [Web renderer](https://github.com/wickra-lib/wickra-terminal/tree/main/web)
is just another consumer of these frames.

<InstallTabs :tabs="snippetTabs" />

## Built on the Wickra core

Wickra Terminal is part of the [Wickra](https://wickra.org) ecosystem. Its panels are
driven by the same typed feeds and indicators that
[`wickra-core`](https://github.com/wickra-lib/wickra),
[`wickra-exchange`](https://github.com/wickra-lib/wickra-exchange) and
[`wickra-backtest`](https://github.com/wickra-lib/wickra-backtest) produce, so the
terminal shows exactly the numbers a backtest or a live strategy would see.

> Wickra Terminal is a software library, not a trading system, and gives no financial
> advice — use at your own risk.
