/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { deserializeUserIdentity, initialsOf } from './deserialize.ts';

test('two or more words: first letter of the first and the last word', () => {
  assert.equal(initialsOf({ email: 'a@b.c', name: 'Minh Anh' }), 'MA');
  assert.equal(initialsOf({ email: 'a@b.c', name: 'Nguyễn Văn An' }), 'NA');
});

test('one word: a single letter, upper-cased', () => {
  assert.equal(initialsOf({ email: 'a@b.c', name: 'đạt' }), 'Đ');
});

test('no name: the first letter of the email', () => {
  assert.equal(initialsOf({ email: 'minhanh@gmail.com' }), 'M');
  assert.equal(initialsOf({ email: 'x@y.z', name: '   ' }), 'X');
});

test('the identity falls back to a Vietnamese display name', () => {
  assert.deepEqual(deserializeUserIdentity({ email: 'minhanh@gmail.com' }), {
    initials: 'M',
    displayName: 'Người dùng',
    email: 'minhanh@gmail.com',
  });
});
