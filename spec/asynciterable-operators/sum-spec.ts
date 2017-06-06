'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { of } from '../../dist/cjs/asynciterable/of';
import { sum } from '../../dist/cjs/asynciterable/sum';

test('AsyncIterable#sum laws', async t => {
  const xs = of(1, 2, 3);
  t.equal(await sum(xs), await sum(xs, async x => x));
  t.end();
});

test('AsyncIterable#sum no selector empty', async t => {
  const xs = empty<number>();
  const res = await sum(xs);
  t.equal(res, 0);
  t.end();
});

test('AsyncIterable#sum no selector', async t => {
  const xs = of(1, 2, 3);
  const res = await sum(xs);
  t.equal(res, 6);
  t.end();
});

test('AsyncIterable#sum with selector empty', async t => {
  const xs = empty<number>();
  const res = await sum(xs, async x => x * 2);
  t.equal(res, 0);
  t.end();
});

test('AsyncIterable#sum with selector', async t => {
  const xs = of(1, 2, 3);
  const res = await sum(xs, async x => x * 2);
  t.equal(res, 12);
  t.end();
});