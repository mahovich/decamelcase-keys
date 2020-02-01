'use strict';
const Benchmarkify = require('benchmarkify');
const decamelcaseKeysNpm = require('decamelcase-keys');
const fixture = require('./fixture');
const decamelcaseKeys = require('..');

const benchmark = new Benchmarkify('Decamelcase benchmark').printHeader();
const bench = benchmark.createSuite('Decamelcase performance');

bench.add('npm', () => {
	decamelcaseKeysNpm(fixture, {deep: true});
});

bench.add('master', () => {
	decamelcaseKeys(fixture, {deep: true});
});

bench.run();
