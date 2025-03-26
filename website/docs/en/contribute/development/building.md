# Building

Please see [prerequisites](./prerequisites) for setting up Rust and Node.js.

## Install Node.js dependencies

Install Node.js dependencies via [pnpm](https://pnpm.io/).

```bash
# enable pnpm with corepack
corepack enable

# Install dependencies
pnpm i
```

## Building Rustbolt

- Run `cargo build` to compile Rust code.
- Run `pnpm run build:cli:dev` to compile both Node.js and Rust code.

The built binary is located at `packages/rustbolt-cli/bin/rustbolt`.
