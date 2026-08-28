# Rust

The native crate. Build a `Terminal` from a `Config`, subscribe a symbol, then pull
frames with `tick` / `command_json`.

Two crates, and which one you want depends on what you are building.
`wickra-terminal` is the TUI binary, so it is installed rather than added as a
dependency; `terminal-core` is the library the snippet below uses.

```bash
cargo install wickra-terminal   # the native TUI
cargo add terminal-core         # the core, to build your own front-end
```

```rust
use terminal_core::{Config, SourceSpec, Symbol, Terminal};

let mut config = Config::default_layout();
config.sources = vec![SourceSpec::Synth { seed: 1 }];

let mut terminal = Terminal::new(&config).expect("valid config");
terminal.subscribe(0, &Symbol::new("BTC", "USDT")).expect("subscribe");

for _ in 0..20 {
    terminal.tick();
}
let frame = terminal.command_json("{\"type\":\"Tick\"}").expect("tick");
println!("{frame}");
```

## More

- [crates.io/crates/wickra-terminal](https://crates.io/crates/wickra-terminal) (the TUI) · [crates.io/crates/terminal-core](https://crates.io/crates/terminal-core) · [docs.rs](https://docs.rs/terminal-core)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/rust)
- [Renderers & panels](https://github.com/wickra-lib/wickra-terminal/tree/main/docs)
