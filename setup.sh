#!/bin/sh
cp -f package_init.json package.json && bun install && cp -f package_workspace.json package.json && bun install