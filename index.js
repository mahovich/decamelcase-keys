'use strict';
const mapObj = require('map-obj');
const decamelize = require('decamelize');
const QuickLru = require('quick-lru');

const has = (array, key) => array.some(x => {
	if (typeof x === 'string') {
		return x === key;
	}

	x.lastIndex = 0;
	return x.test(key);
});

const cache = new QuickLru({maxSize: 100000});

// Reproduces behavior from `map-obj`
const isObject = value =>
	typeof value === 'object' &&
	value !== null &&
	!(value instanceof RegExp) &&
	!(value instanceof Error) &&
	!(value instanceof Date);

const decamelcaseConvert = (input, options) => {
	options = {
		deep: false,
		separator: undefined,
		...options
	};

	const {exclude, separator, stopPaths, deep} = options;

	const stopPathsSet = new Set(stopPaths);

	const makeMapper = parentPath => (key, value) => {
		if (deep && isObject(value)) {
			const path = parentPath === undefined ? key : `${parentPath}.${key}`;

			if (!stopPathsSet.has(path)) {
				value = mapObj(value, makeMapper(path));
			}
		}

		if (!(exclude && has(exclude, key))) {
			const cacheKey = separator === undefined ? key : `${key}_${separator}`;

			if (cache.has(cacheKey)) {
				key = cache.get(cacheKey);
			} else {
				const ret = decamelize(key, separator);

				if (key.length < 100) { // Prevent abuse
					cache.set(cacheKey, ret);
				}

				key = ret;
			}
		}

		return [key, value];
	};

	return mapObj(input, makeMapper(undefined));
};

module.exports = (input, options) => {
	if (Array.isArray(input)) {
		return Object.keys(input).map(key => decamelcaseConvert(input[key], options));
	}

	return decamelcaseConvert(input, options);
};
