// Bakes the public pages (intro, privacy, terms) into static HTML after `vite build`,
// so crawlers that do not run JavaScript (for example Google's OAuth verification)
// can read them. The SPA hydrates the same markup in the browser.
//
// Writes dist/intro/index.html, dist/privacy/index.html, dist/terms/index.html and
// dist/spa.html (the untouched shell for all other routes, including `/`, which redirects
// into the app). dist/index.html stays that same shell.
// Expects the SSR bundle at dist-ssr/entry-server.js (see the "build" script).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const distDir = join(root, 'dist');

const { prerenderPublicPages } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
);

const template = await readFile(join(distDir, 'index.html'), 'utf8');

// Every route that is not pre-rendered (login, overview, ...) falls back to this empty
// shell, so it must not carry the intro page's markup.
await writeFile(join(distDir, 'spa.html'), template);

const escapeAttribute = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const escapeText = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');

function replaceOnce(source, pattern, replacement, label) {
  if (!pattern.test(source)) {
    throw new Error(`prerender: ${label} not found in dist/index.html`);
  }
  return source.replace(pattern, () => replacement);
}

// A malformed tag in <head> is not a build error for the browser: it silently turns into
// visible text at the top of the page. Fail the build instead.
function assertHeadIsClean(html, path) {
  const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'));
  const strayText = head
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<[^>]*>/g, '')
    .trim();
  if (strayText) {
    throw new Error(
      `prerender: ${path} has text inside <head>: ${JSON.stringify(strayText.slice(0, 80))}`
    );
  }
  if (/\$\d/.test(head)) {
    throw new Error(`prerender: ${path} has an unexpanded $1/$2 placeholder in <head>`);
  }
}

for (const page of prerenderPublicPages()) {
  let html = template;
  html = replaceOnce(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeText(page.title)}</title>`,
    '<title>'
  );
  html = replaceOnce(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    'meta description'
  );
  html = replaceOnce(
    html,
    /<\/head>/,
    `  <link rel="canonical" href="${escapeAttribute(page.canonicalUrl)}" />\n  </head>`,
    '</head>'
  );
  html = replaceOnce(
    html,
    /<div id="root"><\/div>/,
    `<div id="root" data-prerendered="${escapeAttribute(page.path)}">${page.html}</div>`,
    '<div id="root">'
  );

  assertHeadIsClean(html, page.path);

  const target = join(distDir, page.path, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerendered ${page.path} -> ${target.replace(root + '/', '')}`);
}
