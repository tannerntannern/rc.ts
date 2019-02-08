# rc.ts
There's an ungodly number of packages to choose from that do similar things, so I will keep the introduction brief:

`rc.ts` is a no-nonsense runtime-configuration loader and validator for TypeScript applications.  All you have to do is define a schema for your config and `rc.ts` will use it for _both compile time and runtime_ type-safety when loading a config file.

### Is `rc.ts` for you?
`rc.ts` may or may not be worth your time:

**Pros**
* It is very un-opinionated.
* Config schemas are written in a simple, easily understandable format.
* Types are enforced at compile time _and_ runtime without needing to duplicate your schema.

**Cons**
* It relies on [io-ts](https://github.com/gcanti/io-ts), which may be a deal-breaker for some folks.
* Since the design is very minimal, only `.json` and `.js` config formats are supported.  Sorry, YAML enthusiasts.

## Basic Example
(coming soon)

## Installation
