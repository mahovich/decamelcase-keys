# decamelcase-keys &middot; [![Build Status](https://travis-ci.org/mahovich/decamelcase-keys.svg?branch=master)](https://travis-ci.org/mahovich/decamelcase-keys) [![npm version](https://img.shields.io/npm/v/decamelcase-keys.svg?style=flat)](https://www.npmjs.com/package/decamelcase-keys)

> Convert object keys from camelCase/PascalCase to snake_case or into a lowercased one with a custom separator.

Distinctive features from similar packages:

- convertible object keys are cached to increase performance when re-converting a key
- supports different languages ​​for writing convertible keys (not only English)

*This project uses [`decamelize`](https://github.com/sindresorhus/decamelize) and was made on the basis of [`camelcase-keys`](https://github.com/sindresorhus/camelcase-keys)*

## Install

```
$ npm i decamelcase-keys
```

## Usage

```js
const decamelcaseKeys = require('decamelcase-keys');

// Convert an object
decamelcaseKeys({fooBar: true});
//=> {foo_bar: true}

// Convert an array of objects
decamelcaseKeys([{fooBar: true}, {barFoo: false}]);
//=> [{foo_bar: true}, {bar_foo: false}]

// Recurse nested objects
decamelcaseKeys({fooBar: true, nested: {unicornRainbow: true}}, {deep: true});
//=> {foo_bar: true, nested: {unicorn_rainbow: true}}

// Convert object keys with a custom separator (for example, in kebab case)
decamelcaseKeys({FooBar: true, Nested: {UnicornRainbow: true}}, {deep: true, separator: '-'});
//=> {'foo-bar': true, nested: {'unicorn-rainbow': true}}

// Exclude keys from being snake-cased
decamelcaseKeys({fooBar: true, barFoo: false}, {exclude: ['barFoo']});
//=> {foo_bar: true, barFoo: false}

// Exclude children at the given object paths
decamelcaseKeys({aB: 1, aC: {cD: 1, cE: {eF: 1}}}, {deep: true, stopPaths: ['aC.cE']});
//=> {a_b: 1, a_c: {c_d: 1, c_e: {eF: 1}}}
```

## API

### decamelcaseKeys(input, options?)

#### input

Type: `object | object[]`

An object or array of objects to snake-case.

#### options

Type: `object`

##### deep

Type: `boolean`\
Default: `false`

Recurse nested objects and objects in arrays.

##### separator

Type: `string`\
Default: `'_'`

The separator to use to put in between the words.

##### exclude

Type: `Array<string | RegExp>`\
Default: `[]`

Exclude keys from being snake-cased.

##### stopPaths

Type: `string[]`\
Default: `[]`

Exclude children at the given object paths in dot-notation from being snake-cased. For example, with an object like `{a: {b: '🦄'}}`, the object path to reach the unicorn is `'a.b'`.

```js
decamelcaseKeys({
	aB: 1,
	aC: {
		cD: 1,
		cE: {
			eF: 1
		}
	}
}, {
	deep: true,
	stopPaths: [
		'aC.cE'
	]
}),
/*
{
	a_b: 1,
	a_c: {
		c_d: 1,
		c_e: {
			eF: 1
		}
	}
}
*/
```

## Related

See [`camelcase-keys`](https://github.com/sindresorhus/camelcase-keys) for the inverse.

## License

`decamelcase-keys` is [MIT licensed](https://github.com/mahovich/decamelcase-keys/blob/master/LICENSE).
