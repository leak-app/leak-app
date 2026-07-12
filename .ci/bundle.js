#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const appsScriptDir = path.join(rootDir, 'apps-script');
const assetsDir = path.join(distDir, 'assets');

const cli = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

const step = (n, label) => console.log(cli.cyan(`  ${n}.`) + ' ' + label);
const ok = (msg) => console.log('     ' + cli.green('✓') + ' ' + cli.dim(msg));
const fail = (msg) => {
  console.error('     ' + cli.red('✗') + ' ' + msg);
  process.exit(1);
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    ok(`Created ${path.relative(rootDir, dir)}`);
  }
}

function findAssetsFromIndex() {
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) return null;
  const html = fs.readFileSync(indexPath, 'utf8');
  const jsMatch = html.match(/src=["']([^"']+\.js)["']/);
  const cssMatch = html.match(/href=["']([^"']+\.css)["']/);
  if (!jsMatch || !cssMatch) return null;
  return {
    js: path.join(distDir, jsMatch[1].replace(/^\//, '')),
    css: path.join(distDir, cssMatch[1].replace(/^\//, '')),
  };
}

function findLatestAssets() {
  if (!fs.existsSync(assetsDir)) return null;
  const files = fs.readdirSync(assetsDir);
  const js = files
    .filter((f) => f.endsWith('.js'))
    .sort()
    .pop();
  const css = files
    .filter((f) => f.endsWith('.css'))
    .sort()
    .pop();
  if (!js || !css) return null;
  return {
    js: path.join(assetsDir, js),
    css: path.join(assetsDir, css),
  };
}

function main() {
  console.log('');
  console.log(cli.bold('  Bundle React app → Apps Script'));
  console.log(cli.dim('  dist/ → apps-script/'));
  console.log('');

  step(1, 'Checking dist folder');
  if (!fs.existsSync(distDir)) {
    fail(`dist/ not found. Run ${cli.yellow('npm run build')} first.`);
  }
  ok('dist/ exists');

  step(2, 'Resolving assets');
  const assets = findAssetsFromIndex() ?? findLatestAssets();
  if (!assets) {
    fail('No JS or CSS found in dist. Check your build output.');
  }
  if (!fs.existsSync(assets.js))
    fail(`JS file missing: ${path.relative(rootDir, assets.js)}`);
  if (!fs.existsSync(assets.css))
    fail(`CSS file missing: ${path.relative(rootDir, assets.css)}`);
  ok(path.relative(distDir, assets.js));
  ok(path.relative(distDir, assets.css));

  step(3, 'Preparing apps-script folder');
  ensureDir(appsScriptDir);

  step(4, 'Writing js.html and css.html');
  const jsContent = fs.readFileSync(assets.js, 'utf8');
  const cssContent = fs.readFileSync(assets.css, 'utf8');
  fs.writeFileSync(
    path.join(appsScriptDir, 'js.html'),
    `<script>\n${jsContent}</script>`
  );
  fs.writeFileSync(
    path.join(appsScriptDir, 'css.html'),
    `<style>\n${cssContent}</style>`
  );
  ok('js.html');
  ok('css.html');

  console.log('');
  console.log(
    cli.green('  Done.') +
      ' ' +
      cli.dim('Deploy apps-script/ to Google Apps Script.')
  );
  console.log('');
}

main();
