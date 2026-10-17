import path, { resolve } from 'path';
import { defineConfig } from 'vite';

import watchpkg from './node_modules/moq/js/watch/package.json' with { type: 'json' };
import publishpkg from './node_modules/moq/js/publish/package.json' with { type: 'json' };
import authorpkg from './node_modules/@moq/qmux/package.json' with { type: 'json' };

import { worklet } from './node_modules/moq/js/common/vite-plugin-worklet';

import { OutputOptions } from 'rolldown';

export interface PackageJson {
  name: string;
  version: string;
  license: string;
  author: string;
  description: string;
  [key: string]: any; // Allows other unknown package.json properties
}

export function createBanner(
  pkg: PackageJson,
  moduleDesc: string = '',
): string {
  const date = new Date();
  return `/*! ${pkg.name} - v${pkg.version} - ${date.toDateString()}
 * ${pkg.description}
 * ${moduleDesc}
 * Copyright (c) ${date.getFullYear()} ${pkg.author}
 * Released under ${pkg.license} license
 */`;
}

interface ConfigMap {
  [key: string]: any | undefined;
}

const config: ConfigMap = {
  subscriber: {
    entry: resolve(import.meta.dirname, './src/subscriber.ts'),
    pkg: watchpkg,
  },
  publisher: {
    entry: resolve(import.meta.dirname, './src/publisher.ts'),
    pkg: publishpkg,
  },
};

const currentConfig =
  process.env.LIB_NAME && config[process.env.LIB_NAME as string];
if (currentConfig === undefined) {
  throw new Error('LIB_NAME is not defined or is not valid');
}

let outDir = './dist',
  formats = ['es', 'iife'];

if (process.env.OUT_DIR) {
  outDir = process.env.OUT_DIR;
}

if (process.env.FORMATS) {
  formats = process.env.FORMATS.split(',');
}

const packageInfo: PackageJson = {
  author: authorpkg.author,
  license: authorpkg.license,
  description: currentConfig.pkg.description,
  version: currentConfig.pkg.version,
  name: currentConfig.pkg.name,
};

export default defineConfig(({ mode }) => {
  let buildMinify = true,
    outputOptions: OutputOptions = {
      minify: {
        mangle: true,
        compress: true,
      },
    };

  if (mode === 'dev') {
    buildMinify = false;
    outputOptions = {};
  }

  const config = {
    root: '.',
    envDir: resolve(import.meta.dirname),
    plugins: [worklet()],
    build: {
      minify: buildMinify,
      outDir: resolve(outDir),
      sourcemap: false,
      license: {
        fileName: 'license.md',
      },
      emptyOutDir: false,
      lib: {
        ...currentConfig,
        fileName: (format: string, entryName: string) => {
          let postfix = 'module';
          if (format === 'iife') postfix = 'min';
          return `moq-net-${entryName}.${postfix}.js`;
        },
        name: 'moq',
        formats: formats,
      },
      rolldownOptions: {
        output: {
          codeSplitting: false,
          postBanner: createBanner(packageInfo, process.env.LIB_NAME),
          comments: false,
          ...outputOptions,
        },
      },
    },
  };
  return config;
});
