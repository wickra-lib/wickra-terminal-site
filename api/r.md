# R

A `.Call` binding over the C ABI. Construct a terminal from a JSON config, then drive
it with `wkterm_command(term, json) -> json` — subscribe a symbol, then tick.

```r
install.packages("wickraterminal", repos = "https://wickra-lib.r-universe.dev")
```

```r
library(wickraterminal)

config <- paste0(
  '{"sources":[{"Synth":{"seed":1}}],',
  '"layout":{"panels":[{"kind":"Chart","rect":{"x":0,"y":0,"w":100,"h":100}}]}}'
)

term <- wkterm_new(config)
invisible(wkterm_command(term, '{"type":"Subscribe","source":0,"symbol":"BTC/USDT"}'))
raw <- ""
for (i in 1:20) {
  raw <- wkterm_command(term, '{"type":"Tick"}')
}
cat("wickra-terminal", wkterm_version(), "\n")
cat(raw, "\n")
```

## More

- [r-universe](https://wickra-lib.r-universe.dev)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/r)
