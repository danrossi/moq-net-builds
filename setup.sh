#!/bin/sh
git clone https://github.com/moq-dev/moq.git
bun install && bun run --cwd moq/js/libav build path:.
source ./update.sh