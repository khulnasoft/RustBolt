# Profiling

In this section, we'll explore how to profile Rustbolt for identifying bottlenecks.
By examining where Rustbolt spends its time, we can gain insights into how to improve performance.
Since different profilers have different strengths. It is good to use more than one.

<!-- toc -->

## Build release version with debug info

Performance analysis should be conducted on a release version that includes debug information. This approach ensures accurate performance results while providing sufficient debug information for analysis. Use the following command to profiling using local build rustbolt.

1. Build a release version with debug information:

```sh
pnpm build:binding:profiling
```

2. Change `@rustbolt/core` and `@rustbolt/cli` to use `link` protocol to link to local build Rustbolt:

```diff title="package.json"
  dependencies: {
-    "@rustbolt/core": "x.y.z",
-    "@rustbolt/cli": "x.y.z",
     # link protocol only works in pnpm
+    "@rustbolt/core": "link:{your_rustbolt_repo}/packages/rustbolt",
+    "@rustbolt/cli": "link:{your_rustbolt_repo}/packages/rustbolt-cli"
  }
```

3. Reinstall:

```sh
pnpm install
```

## Tracing

[`tracing`](https://crates.io/crates/tracing) is used to instrumenting Rustbolt.

The supported tracing levels for

- release builds are `INFO`, `WARN` and `ERROR`
- debug builds are `TRACE`, `DEBUG`, `INFO`, `WARN` and `ERROR`

Two ways to enable tracing:

- if you are using `@rustbolt/cli`, you can enable it by `RUSTBOLT_PROFILE` environment variable.
- if you are using `@rustbolt/core` without `@rustbolt/cli`, you can enable it by `rustbolt.experiments.globalTrace.register` and `rustbolt.experiments.globalTrace.cleanup`, checkout [how we implement `RUSTBOLT_PROFILE` in `@rustbolt/cli` with these two function](https://github.com/khulnasoft/rustbolt/blob/9be47217b5179186b0825ca79990ab2808aa1a0f/packages/rustbolt-cli/src/utils/profile.ts#L219-L224) for more details.

### Chrome

[`tracing-chrome`](https://crates.io/crates/tracing-chrome) is supported for viewing tracing information graphically.

![image](https://github.com/SyMind/rustbolt-dev-guide/assets/19852293/1af08ba1-a2e9-4e3e-99ab-87c1e62e067b)

Setting the environment variable `RUSTBOLT_PROFILE=TRACE=layer=chrome` before running Rustbolt, for example

```bash
RUSTBOLT_PROFILE=TRACE=layer=chrome rustbolt build
```

produces a trace file (`.rustbolt-profile-${timestamp}-${pid}/trace.json`) in the current working directory.

The JSON trace file can be viewed in either `chrome://tracing` or [ui.perfetto.dev](https://ui.perfetto.dev).

### Terminal

Granular tracing event values can be viewed inside the terminal via `RUSTBOLT_PROFILE=TRACE=layer=logger`, for example

```bash
RUSTBOLT_PROFILE=TRACE=layer=logger rustbolt build
```

will print the options passed to Rustbolt as well as each individual tracing event.

## CPU profiling

### Samply

[Samply](https://github.com/mstange/samply) supports performance analysis for both Rust and JavaScript simultaneously. Follow these steps to perform a complete performance analysis:

- Run the following command to start performance analysis:

```sh
samply record -- node --perf-prof --perf-basic-prof --interpreted-frames-native-stack {your_rustbolt_folder}/rustbolt-cli/bin/rustbolt.js -c {your project}/rustbolt.config.js
```

- After the command execution, the analysis results will automatically open in the [Firefox Profiler](https://profiler.firefox.com/). The screenshot below is from a [Samply profiler](https://profiler.firefox.com/public/5fkasm1wcddddas3amgys3eg6sbp70n82q6gn1g/calltree/?globalTrackOrder=0&symbolServer=http%3A%2F%2F127.0.0.1%3A3000%2F2fjyrylqc9ifil3s7ppsmbwm6lfd3p9gddnqgx1&thread=2&v=10).

:::warning
Node.js currently only supports `--perf-prof` on Linux platforms. JavaScript profiling in Samply depends on `--perf-prof` support. If you need to use Samply for JavaScript profiling on other platforms, consider using Docker for profiling, or you can compile Node.js yourself for macOS using [node-perf-maps](https://github.com/tmm1/node/tree/v8-perf-maps) for profiling purposes.
:::

#### JavaScript profiling

Rustbolt’s JavaScript typically runs in the Node.js thread. Select the Node.js thread to view the time distribution on the Node.js side.

![Javascript Profiling](https://assets.rustbolt.dev/rustbolt/assets/profiling-javascript.png)

#### Rust profiling

Rustbolt’s Rust code usually runs in the tokio thread. Select the tokio thread to view the time distribution on the Rust side.

![Rust Profiling](https://assets.rustbolt.dev/rustbolt/assets/profiling-rust.png)

### Node.js profiling

If we find that the performance bottleneck is on the JS side (e.g. js loader), then we need to further analyse the js side, and we can use Nodejs Profiling to analyse. for example

```bash
node --cpu-prof {rustbolt_bin_path} -c rustbolt.config.js
```

or

```bash
RUSTBOLT_PROFILE=JSCPU rustbolt build
```

this will generates a cpu profile like `CPU.20230522.154658.14577.0.001.cpuprofile`, and we can use speedscope to visualize the profile, for example

```bash
npm install -g speedscope
speedscope CPU.20230522.154658.14577.0.001.cpuprofile
```

### Rsdoctor timeline

If we want to analyze the time cost of loaders and plugins or the compilation behavior of loaders, we can use Rsdoctor to view:

![image](https://assets.rustbolt.dev/others/assets/rsdoctor/rsdoctor-loader-timeline.png)

Refer to [Rsdoctor Compilation Analysis](/guide/optimization/profile#use-rsdoctor)

## Mac Xcode instruments

Xcode instruments can be used to produce a CPU profile if you are on a Mac.

![image](https://github.com/SyMind/rustbolt-dev-guide/assets/19852293/124e3aee-944a-4509-bb93-1c9213f026d3)

To install Xcode Instruments, simply install the Command Line Tools:

```bash
xcode-select --install
```

For normal Rust builds, [`cargo instruments`](https://github.com/cmyr/cargo-instruments) can be used as the glue
for profiling and creating the trace file.

Since Rustbolt takes quite a while to build, you can use the following procedure without invoking `cargo instruments`.
It has the same effect.

In workspace root's `Cargo.toml`, turn on debug symbols and disable symbol stripping in the `[profile.release]` section

```toml
[profile.release]
debug = 1 # debug info with line tables only
strip = false # do not strip symbols
```

Then build the project

```bash
pnpm run build:cli:release
```

The final binary is located at `packages/rustbolt-cli/bin/rustbolt` once the project is built.

Under the hood, `cargo instruments` invokes the `xcrun` command,
which means we can run the following in our own project that uses Rustbolt.

```bash
xcrun xctrace record --template 'Time Profile' --output . --launch -- /path/to/rustbolt/packages/rustbolt-cli/bin/rustbolt build
```

It produces the following output

```
Starting recording with the Time Profiler template. Launching process: rustbolt.
Ctrl-C to stop the recording
Target app exited, ending recording...
Recording completed. Saving output file...
Output file saved as: Launch_rustbolt_2023-04-24_11.32.06_9CFE3A63.trace
```

We can open the trace file by

```bash
open Launch_rustbolt_2023-04-24_11.32.06_9CFE3A63.trace
```
