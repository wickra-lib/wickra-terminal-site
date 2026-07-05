# Python

Native PyO3 bindings over the Rust core. Construct a `Terminal` from a JSON config,
then drive it with `command(json) -> json` — subscribe a symbol, then tick.

```bash
pip install wickra-terminal
```

```python
import json
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
print(json.loads(raw)["panels"][0])
```

## More

- [PyPI](https://pypi.org/project/wickra-terminal/)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/python)
