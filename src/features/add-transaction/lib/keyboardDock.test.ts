/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { isTextEntryField, keyboardInset } from './keyboardDock.ts';

test('a text input or textarea opens the system keyboard', () => {
  assert.equal(isTextEntryField({ tagName: 'INPUT', type: 'text' }), true);
  assert.equal(isTextEntryField({ tagName: 'INPUT', type: 'search' }), true);
  assert.equal(isTextEntryField({ tagName: 'TEXTAREA' }), true);
  assert.equal(
    isTextEntryField({ tagName: 'DIV', isContentEditable: true }),
    true
  );
});

test('buttons, checkboxes and read-only inputs do not', () => {
  assert.equal(isTextEntryField({ tagName: 'BUTTON' }), false);
  assert.equal(isTextEntryField({ tagName: 'INPUT', type: 'checkbox' }), false);
  assert.equal(
    isTextEntryField({ tagName: 'INPUT', type: 'text', readOnly: true }),
    false
  );
  assert.equal(isTextEntryField(null), false);
});

test('no inset while the layout viewport already shrinks with the keyboard (Android)', () => {
  assert.equal(keyboardInset(700, 700, 0), 0);
});

test('the bar is lifted by the hidden height when only the visual viewport shrinks (iOS)', () => {
  assert.equal(keyboardInset(800, 500, 0), 300);
  // The page is scrolled inside the visual viewport: only the part below it counts.
  assert.equal(keyboardInset(800, 500, 40), 260);
});

test('the inset never goes negative', () => {
  assert.equal(keyboardInset(600, 600, 20), 0);
});
