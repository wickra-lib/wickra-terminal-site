# Go

A cgo wrapper over the C ABI. Construct a `Terminal` from a JSON config, then drive it
with `Command(json) -> json` — subscribe a symbol, then tick.

```bash
go get github.com/wickra-lib/wickra-terminal-go
```

```go
package main

import (
	"fmt"

	wickra "github.com/wickra-lib/wickra-terminal-go"
)

const config = `{"sources":[{"Synth":{"seed":1}}],` +
	`"layout":{"panels":[{"kind":"Chart","rect":{"x":0,"y":0,"w":100,"h":100}}]}}`

func main() {
	term, err := wickra.New(config)
	if err != nil {
		panic(err)
	}
	defer term.Close()

	if _, err := term.Command(`{"type":"Subscribe","source":0,"symbol":"BTC/USDT"}`); err != nil {
		panic(err)
	}
	var raw string
	for i := 0; i < 20; i++ {
		raw, _ = term.Command(`{"type":"Tick"}`)
	}
	fmt.Println("wickra-terminal", wickra.Version())
	fmt.Println(raw)
}
```

## More

- [Go module (pkg.go.dev)](https://pkg.go.dev/github.com/wickra-lib/wickra-terminal-go)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/go)
