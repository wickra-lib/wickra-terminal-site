# C#

Idiomatic .NET over the C ABI. Construct a `Terminal` from a JSON config, then drive
it with `Command(json) -> json` — subscribe a symbol, then tick.

```bash
dotnet add package WickraTerminal
```

```csharp
using WickraTerminal;

const string config =
    "{\"sources\":[{\"Synth\":{\"seed\":1}}]," +
    "\"layout\":{\"panels\":[{\"kind\":\"Chart\",\"rect\":{\"x\":0,\"y\":0,\"w\":100,\"h\":100}}]}}";

using var term = new Terminal(config);
term.Command("{\"type\":\"Subscribe\",\"source\":0,\"symbol\":\"BTC/USDT\"}");
string raw = string.Empty;
for (int i = 0; i < 20; i++)
{
    raw = term.Command("{\"type\":\"Tick\"}");
}
Console.WriteLine(raw);
```

Targets .NET 8.

## More

- [NuGet](https://www.nuget.org/packages/WickraTerminal)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/csharp)
