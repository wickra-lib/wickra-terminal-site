# Security

## Reporting a vulnerability

Please report security problems **privately** — do not open a public issue for a
suspected vulnerability. Report through either channel:

- GitHub → the [wickra-terminal repository](https://github.com/wickra-lib/wickra-terminal)
  → the **Security** tab → **Report a vulnerability** (private advisory), or
- email **[support@wickra.org](mailto:support@wickra.org)**.

We aim to acknowledge within a few days, agree a disclosure timeline, and credit
reporters who wish to be named once a fix ships.

## Scope

Wickra Terminal parses untrusted `Config` JSON, command JSON and live feed data, so
its parser and command paths are the most security-relevant surface. Reports about
malformed input handling, resource exhaustion, or memory safety across the C ABI are
especially welcome.

The full policy — including supported versions — is in
[SECURITY.md](https://github.com/wickra-lib/wickra-terminal/blob/main/SECURITY.md)
in the source repository.
