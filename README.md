# Graasp SDK

[![Latest version published on NPM](https://img.shields.io/npm/v/@graasp/sdk?logo=npm)](https://www.npmjs.com/package/@graasp/sdk)
[![Latest version released on Github](https://img.shields.io/github/package-json/v/graasp/graasp-sdk?color=deepskyblue&logo=github)](https://github.com/graasp/graasp-sdk/releases/latest)
![NPM package downloads per month](https://img.shields.io/npm/dm/@graasp/sdk?color=green)
![example branch parameter](https://github.com/graasp/graasp-sdk/actions/workflows/test.yml/badge.svg?branch=main)
![typescript version](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-sdk/dev/typescript)

This repository contains all shared utils and types for the Graasp ecosystem.

## Installation

Run yarn to install the packages.

```sh
yarn
```

## Testing

This project uses [vitest](https://vitest.dev/) as the test runner. It is fast, supports ESM and has an API similar to Jest (which was used previously).

To start the tests run:

```sh
yarn test
```

The tests will run in watch mode, meaning that when you edit a file, the tests in that file (or any test file depending on that file) will be re-run. This allows for a fast feedback loop.

## Building

This package exposes a ESM and a CommonJS build as well as type declarations for Typescript.

The structure is as follows:

- `esm` contains the javascript files to use with ECMAScript Modules (ESM) it is built with the [`tsconfig.esm.json`](./tsconfig.esm.json) file.
- `cjs` contains the javascript files to use with CommonJS it is built with the [`tsconfig.cjs.json`](./tsconfig.cjs.json) file.
- `types` contains the type declarations for Typescript it is built with the [`tsconfig.types.json`](./tsconfig.types.json) file.

The last bit of the build process is to add a single line `package.json` file in `esm` and `cjs` with the correct value for the `type` key (`commonjs` for `cjs` and `module` for `esm`).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
