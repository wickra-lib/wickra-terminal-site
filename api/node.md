# Node.js

Native napi-rs bindings over the Rust core. Construct a `Terminal` from a JSON config,
then drive it with `command(json) -> json` — subscribe a symbol, then tick.

::: warning Pre-release
Nothing is published yet. The terminal depends on `wickra-exchange` as a git
dependency and `cargo publish` rejects those, so the first release waits on that
crate reaching crates.io. What follows is what installing will look like; until
then, [build from
source](https://github.com/wickra-lib/wickra-terminal#quickstart).
:::

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
