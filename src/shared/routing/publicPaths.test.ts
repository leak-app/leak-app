/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { isPublicPath, PUBLIC_PATHS } from './publicPaths.ts';

test('the landing page, privacy policy and terms are public', () => {
  assert.equal(isPublicPath(PUBLIC_PATHS.home), true);
  assert.equal(isPublicPath(PUBLIC_PATHS.privacy), true);
  assert.equal(isPublicPath(PUBLIC_PATHS.terms), true);
});

test('a trailing slash does not change the answer', () => {
  assert.equal(isPublicPath('/privacy/'), true);
  assert.equal(isPublicPath('/terms//'), true);
});

test('app screens and look-alike paths are not public', () => {
  for (const path of [
    '/overview',
    '/login',
    '/onboarding',
    '/privacy-settings',
    '/profile/privacy',
    '/privacy/extra',
  ]) {
    assert.equal(isPublicPath(path), false, path);
  }
});
