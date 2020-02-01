declare namespace decamelcaseKeys {
	interface Options {
		/**
		Recurse nested objects and objects in arrays.

		@default false
		*/
		readonly deep?: boolean;

		/**
		The separator to use to put in between the words.

		@default '_'
		*/
		readonly separator?: string;

		/**
		Exclude keys from being snake-cased.

		@default []
		*/
		readonly exclude?: ReadonlyArray<string | RegExp>;

		/**
		Exclude children at the given object paths in dot-notation from being snake-cased. For example, with an object like `{a: {b: '🦄'}}`, the object path to reach the unicorn is `'a.b'`.

		@default []

		@example
		```
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
		// {
		// 	a_b: 1,
		// 	a_c: {
		// 		c_d: 1,
		// 		c_e: {
		// 			eF: 1
		// 		}
		// 	}
		// }
		```
		*/
		readonly stopPaths?: ReadonlyArray<string>;
	}
}

/**
Convert object keys from camelCase/PascalCase to snake_case or into a lowercased one with a custom separator.

@param input - Object or array of objects to snake-case.

@example
```
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
*/
declare function decamelcaseKeys(
	input: ReadonlyArray<{[key: string]: any}>,
	options?: decamelcaseKeys.Options
): Array<{[key: string]: unknown}>;
declare function decamelcaseKeys(
	input: {[key: string]: any},
	options?: decamelcaseKeys.Options
): {[key: string]: unknown};

export = decamelcaseKeys;
