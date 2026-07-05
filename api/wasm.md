# WASM

A `wasm-bindgen` build for the browser and other WebAssembly runtimes — the same core
that drives the bundled Web renderer. The same `Terminal` handle and JSON command
protocol as the native bindings, producing byte-identical frames.

```bash
npm install wickra-terminal-wasm
```

```javascript
import init, { Terminal } from 'wickra-terminal-wasm'

await init()

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
