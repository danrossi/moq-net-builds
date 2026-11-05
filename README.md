# Build MOQ Net Subscriber and Publisher Library

Creates module builds of the [Moq net github sources](https://github.com/moq-dev/moq) for [Moq.dev](https://moq.dev/watch/)

For iife builds of the plugin instead of importing as ES/Typescript. The MOQ Net library can be built as an iife package for dynamically including into the page to be used globally.

    Note: There is bundling bugs with how the Moq workers are bundled since an update requiring using workspaces for resolving packages. Using aliases causes a bug bundling the workers.

    There is a build change requiring to build the libav package from source as there is no npm release. This requires [Nix](https://nixos.org/download.html) installed first. Nix cannot work with bun installed git packages or submodules so requires a full git checkout first in the setup to build libav.

## Requirements

bun
vite

## Setup

Setup the git checkout and first build libAV package

```
./setup.sh
```

## Update Packages

```
./update.sh
```

## Building

```
npm run build
```
