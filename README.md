# Build MOQ Net Subscriber and Publisher Library

Creates module builds of the [Moq net github sources](https://github.com/moq-dev/moq) for [Moq.dev](https://moq.dev/watch/)

For iife builds of the plugin instead of importing as ES/Typescript. The MOQ Net library can be built as an iife package for dynamically including into the page to be used globally.

    Note: There is bundling bugs with how the Moq workers are bundled since an update requiring using workspaces for resolving packages. Using aliases causes a bug bundling the workers.

    There is further bugs with Bun requiring including a dummy npm lock file to not break the package install or it removes all the packages into a backup directory.

    Installing the moq git checkout first is needed before copying back the package json with the workspaces config.

## Requirements

bun
vite

## Setup

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
