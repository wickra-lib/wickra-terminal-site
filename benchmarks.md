---
title: Benchmarks
description: What Wickra Terminal costs per tick — folding a trade, applying a depth diff, building every panel's view-model, and crossing the FFI boundary — measured with criterion.
---

# Benchmarks

A trading terminal's frame budget is dominated by the terminal's own CPU work —
folding feed events into state and building the per-frame view-models — not by
rendering. The TUI draws a few kilobytes; the browser canvas is GPU-composited.
So these measure that **core work per tick**, to show it never becomes the
bottleneck under a fast feed.

::: tip Looking for the indicator library's numbers?
This page is about the terminal. Wickra's own indicator benchmarks — the
comparison against TA-Lib, talipp, pandas-ta and the other Rust TA crates —
live at [wickra.org](https://wickra.org).
:::

## What is measured

The `terminal-bench` crate (criterion) covers five paths, one benchmark each:

- **`fold_trade`** — folding one trade into `AppState`: the tape, the footprint,
  the price history, the candle builder and every configured indicator.
- **`book_delta`** — applying an L2 depth diff to a symbol's book, including
  level removals. The highest-rate message on a live feed: a venue sends far
  more depth updates than trades, so this is the fold path that decides whether
  a busy market keeps up.
- **`frame_build`** — building a frame from state, every configured panel to a
  view-model, with no polling. What a renderer pays for a redraw with no new
  data behind it.
- **`tick_synth`** — one full tick: poll the sources, fold what arrived, build
  the frame.
- **`command_json_tick`** — the same tick through the data-driven FFI boundary:
  parse the command JSON, apply it, serialise the frame. This is what every
  binding pays per call.

## Results

Criterion defaults (100 samples per benchmark) on a Windows x86-64 laptop,
single-threaded, with the default overlay of two price indicators. Figures are
the median estimate; treat them as orders of magnitude rather than guarantees —
they move with the CPU, the toolchain and the number of indicators configured.

Measured under the release profile the artefacts ship with, `lto = "fat"` and a
single codegen unit. An earlier set of figures here was taken before those
settings existed, so it described a binary nobody ships and understated the
released one by roughly a tenth.

| Benchmark | What | Median | Throughput |
|-----------|------|--------|------------|
| `fold_trade` | fold one trade into state | 142 ns | ~7.0 M/s |
| `book_delta` | apply an L2 depth diff (six levels, two removals) | 107 ns | ~9.3 M/s |
| `frame_build` | build all five panels' view-models | 8.9 µs | ~113 K/s |
| `tick_synth` | poll + fold + build the frame | 9.7 µs | ~103 K/s |
| `command_json_tick` | the same tick across the FFI boundary | 17.7 µs | ~56 K/s |

The takeaway: a full tick that rebuilds every panel's view-model costs about ten
microseconds, so the core sustains a hundred thousand frames per second — far
above any renderer's frame budget, which is the whole point of the O(1) fold.

Two readings are worth explaining rather than leaving to look odd.

`tick_synth` sits just above `frame_build`, and the gap is small because a tick
adds polling and folding to a frame build and those cost hundred-nanosecond
amounts against a nine-microsecond baseline. That is also where the time goes:
building view-models, not folding events.

`command_json_tick` costs roughly twice a bare tick. The extra is JSON — parsing
the command and serialising a frame of five panels — not the terminal's work,
and it is the price every binding pays for the boundary being data rather than
an API. It is also why the frame is serialised once per tick rather than once
per panel.

## Reproducing them

```bash
git clone https://github.com/wickra-lib/wickra-terminal
cd wickra-terminal
cargo bench -p terminal-bench
```

## Caveats

These figures bound the terminal's own per-tick overhead only. End-to-end
latency in a live session also depends on the feed's message rate and on the
venue's own latency, neither of which is the terminal's to control. They are
also single-machine numbers: the point is the order of magnitude, not the third
digit.
