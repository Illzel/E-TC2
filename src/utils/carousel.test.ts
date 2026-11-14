import test from 'node:test';
import assert from 'node:assert/strict';
import { findIndexByDivision, getNextIndex, getPrevIndex } from './carousel';

test('getNextIndex wraps cleanly at end of list', () => {
  assert.equal(getNextIndex(0, 4), 1);
  assert.equal(getNextIndex(3, 4), 0);
  assert.equal(getNextIndex(0, 0), 0);
});

test('getPrevIndex wraps cleanly at start of list', () => {
  assert.equal(getPrevIndex(2, 4), 1);
  assert.equal(getPrevIndex(0, 4), 3);
  assert.equal(getPrevIndex(0, 0), 0);
});

test('findIndexByDivision locates matching division slide or falls back to 0', () => {
  const items = [
    { divisionId: 'remote' as const },
    { divisionId: 'repair' as const },
    { divisionId: 'creator' as const },
    { divisionId: 'ai' as const },
  ];

  assert.equal(findIndexByDivision(items, 'creator'), 2);
  assert.equal(findIndexByDivision(items, 'ai'), 3);
});
