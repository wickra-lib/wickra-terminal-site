# WASM

A `wasm-bindgen` build for the browser and other WebAssembly runtimes — the same core
that drives the bundled Web renderer. The same `Terminal` handle and JSON command
protocol as the native bindings, producing byte-identical frames.

::: warning Pre-release
Nothing is published yet. The terminal depends on `wickra-exchange` as a git
dependency and `cargo publish` rejects those, so the first release waits on that
crate reaching crates.io. What follows is what installing will look like; until
then, [build from
source](https://github.com/wickra-lib/wickra-terminal#quickstart).
:::

```bash
npm install wickra-terminal-wasm
```

The package is a `--target bundler` build, so there is no default export and no
`init` to await: a bundler wires the module up and instantiates it for you.
(`--target web`, which the repository's own `web/` renderer builds locally, is the
one that takes `import init` and `await init()`.)

```javascript
import { Terminal } from 'wickra-terminal-wasm'

const config = JSON.stringify({
  sources: [{ Synth: { seed: 1 } }],
  layout: { panels: [{ kind: 'Chart', rect: { x: 0, y: 0, w: 100, h: 100 } }] },
})

const term = new Terminal(config)
term.command(JSON.stringify({ type: 'Subscribe', source: 0, symbol: 'BTC/USDT' }))
const raw = term.command(JSON.stringify({ type: 'Tick' }))
console.log(JSON.parse(raw).panels[0])
```

## More

- [npm (wickra-terminal-wasm)](https://www.npmjs.com/package/wickra-terminal-wasm)
- [Web renderer](https://github.com/wickra-lib/wickra-terminal/tree/main/web) · [Source & bindings](https://github.com/wickra-lib/wickra-terminal/tree/main/bindings/wasm)
