# Rust

The native crate. Build a `Terminal` from a `Config`, subscribe a symbol, then pull
frames with `tick` / `command_json`.

```bash
cargo add wickra-terminal
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

- [crates.io/crates/wickra-terminal](https://crates.io/crates/wickra-terminal) · [docs.rs](https://docs.rs/wickra-terminal)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/rust)
- [Renderers & panels](https://github.com/wickra-lib/wickra-terminal/tree/main/docs)
