#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const [layer, sliceName] = process.argv.slice(2);
const VALID_LAYERS = ['pages', 'widgets', 'features', 'entities'];

if (!layer || !sliceName) {
  console.error('❌ Error: Missing layer or slice name.');
  process.exit(1);
}

if (!VALID_LAYERS.includes(layer.toLowerCase())) {
  console.error(`❌ Error: Invalid layer "${layer}". Must be one of: ${VALID_LAYERS.join(', ')}`);
  process.exit(1);
}

const targetDir = path.join(process.cwd(), 'src', layer.toLowerCase(), sliceName.toLowerCase());
const segments = ['ui', 'model', 'lib', 'api'];

try {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  segments.forEach((segment) => {
    const segmentPath = path.join(targetDir, segment);
    fs.mkdirSync(segmentPath, { recursive: true });
    fs.writeFileSync(path.join(segmentPath, 'index.ts'), `// Public API for ${segment}\n`);
  });

  const publicApiContent = `// Public API for ${sliceName} ${layer}\n` +
    segments.map(seg => `export * from './${seg}';`).join('\n') + '\n';

  fs.writeFileSync(path.join(targetDir, 'index.ts'), publicApiContent);
  console.log(`✅ FSD Slice initialized at: src/${layer}/${sliceName}`);
} catch (error) {
  console.error('❌ Automation failed:', error.message);
  process.exit(1);
}