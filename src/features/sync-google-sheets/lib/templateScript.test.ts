/// <reference types="node" />
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { copyTemplateScript, TEMPLATE_SCRIPT_PATH } from './templateScript.ts';

test('copies the fetched script to the clipboard', async () => {
  const written: string[] = [];
  const result = await copyTemplateScript({
    fetchText: async (url) => {
      assert.equal(url, TEMPLATE_SCRIPT_PATH);
      return 'function buildTemplate() {}';
    },
    writeClipboard: async (text) => {
      written.push(text);
    },
  });
  assert.equal(result, 'copied');
  assert.deepEqual(written, ['function buildTemplate() {}']);
});

test('reports failure when the script cannot be fetched', async () => {
  const result = await copyTemplateScript({
    fetchText: async () => {
      throw new Error('network');
    },
    writeClipboard: async () => {
      assert.fail('clipboard must not be touched');
    },
  });
  assert.equal(result, 'failed');
});

test('reports failure when the clipboard is blocked', async () => {
  const result = await copyTemplateScript({
    fetchText: async () => 'function buildTemplate() {}',
    writeClipboard: async () => {
      throw new Error('NotAllowedError');
    },
  });
  assert.equal(result, 'failed');
});

test('never copies an empty script', async () => {
  const result = await copyTemplateScript({
    fetchText: async () => '   ',
    writeClipboard: async () => {
      assert.fail('clipboard must not be touched');
    },
  });
  assert.equal(result, 'failed');
});

test('the published script file exists and defines buildTemplate', () => {
  const file = new URL(
    `../../../../public${TEMPLATE_SCRIPT_PATH}`,
    import.meta.url
  );
  const source = readFileSync(file, 'utf8');
  assert.match(source, /function buildTemplate\(\)/);
  assert.match(source, /function onOpen\(\)/);
});
