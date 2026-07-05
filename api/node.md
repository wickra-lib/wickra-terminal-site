# Node.js

Native napi-rs bindings over the Rust core. Construct a `Terminal` from a JSON config,
then drive it with `command(json) -> json` — subscribe a symbol, then tick.

```bash
npm install wickra-terminal
```

```javascript
import { Terminal } from 'wickra-terminal'

const config = JSON.stringify({
  sources: [{ Synth: { seed: 1 } }],
  layout: { panels: [{ kind: 'Chart', rect: { x: 0, y: 0, w: 100, h: 100 } }] },
})

const term = new Terminal(config)
term.command(JSON.stringify({ type: 'Subscribe', source: 0, symbol: 'BTC/USDT' }))
let raw = ''
for (let i = 0; i < 20; i++) raw = term.command(JSON.stringify({ type: 'Tick' }))
console.log(JSON.parse(raw).panels[0])
```

## More

- [npm](https://www.npmjs.com/package/wickra-terminal)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/node)
