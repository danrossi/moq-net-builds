#!/bin/sh
git clone https://github.com/moq-dev/moq.git && bun install && bun run --cwd moq/js/libav build path:.
chmod 755 update && ./update.sh