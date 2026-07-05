# About Wickra Terminal

Wickra Terminal is a streaming trading terminal built on the Wickra core: live
charts, order-book, tape and 514 streaming indicators, with a native **TUI** and a
**Web** front-end as *selectable renderers* of the same logic. One data-driven core,
N front-ends — pick the renderer with `--render tui|web`.

## What makes it different

- **One core, two renderers.** `terminal-core` folds market events into an O(1)
  `AppState` and turns panels into view-models (values, series, colours) — never
  renderer commands. The TUI maps a view-model to a ratatui widget; the Web app maps
  the *same* view-model to a canvas draw.
- **Pluggable data sources.** The `DataSource` trait is an activatable module: `Live`
  (the wickra-exchange layer over the ten largest venues), `Replay` (the
  wickra-backtest engine with time-machine seek), or `Synth` (a deterministic
  synthetic feed for demos and tests).
- **The config is data.** A `Config` names the sources and the panel layout as JSON,
  so it crosses the C ABI and WASM unchanged.
- **Deterministic core.** The frame is a pure function of the feed, byte-identical
  across all ten bindings and both build profiles.

## Why it exists

Every trading front-end re-implements the same plumbing — book, tape, indicators,
layout. Wickra Terminal defines that surface once, in Rust, as a JSON-over-C-ABI data
API (`Terminal::command_json`), and exposes it to Rust, Python, Node.js, WASM and —
over a C ABI — C, C++, C#, Go, Java and R, so a developer in any language builds their
own front-end on the same core.

## Open source

Released under the **MIT OR Apache-2.0** license — permissive, OSI-approved, free for
any use including commercial. Source, issues and releases on
[GitHub](https://github.com/wickra-lib/wickra-terminal).

## Disclaimer

Wickra Terminal is a software library, **not** a trading system, and is provided
**as-is with no warranty**. Live execution is opt-in and testnet-first; the terminal
gives no financial advice. Use it at your own risk.
