# Java

An FFM (Panama) wrapper over the C ABI. Construct a `Terminal` from a JSON config,
then drive it with `command(json) -> json` — subscribe a symbol, then tick.

```xml
<!-- Maven Central -->
<dependency>
  <groupId>org.wickra</groupId>
  <artifactId>wickra-terminal</artifactId>
  <version>0.1.0</version>
</dependency>
```

```java
import org.wickra.terminal.Terminal;

public final class Frame {
    private static final String CONFIG =
        "{\"sources\":[{\"Synth\":{\"seed\":1}}],"
        + "\"layout\":{\"panels\":[{\"kind\":\"Chart\",\"rect\":{\"x\":0,\"y\":0,\"w\":100,\"h\":100}}]}}";

    public static void main(String[] args) {
        try (Terminal term = new Terminal(CONFIG)) {
            term.command("{\"type\":\"Subscribe\",\"source\":0,\"symbol\":\"BTC/USDT\"}");
            String raw = "";
            for (int i = 0; i < 20; i++) {
                raw = term.command("{\"type\":\"Tick\"}");
            }
            System.out.println("wickra-terminal " + Terminal.version());
            System.out.println(raw);
        }
    }
}
```

The binding uses the Java Foreign Function & Memory API, so it needs JDK 22+ and
`--enable-native-access`.

## More

- [Maven Central](https://central.sonatype.com/artifact/org.wickra/wickra-terminal)
- [Source & examples](https://github.com/wickra-lib/wickra-terminal/tree/main/examples/java)
