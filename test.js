const test = require('ava');
const decamelcaseKeys = require('.');

test('main', t => {
	t.true(decamelcaseKeys({fooBar: true}).foo_bar);
	t.true(decamelcaseKeys({FooBar: true}).foo_bar);
	t.true(decamelcaseKeys({'foo Bar': true})['foo bar']);
	t.true(decamelcaseKeys({'foo-Bar': true})['foo-bar']);
	t.true(decamelcaseKeys({thisIsATest: true}).this_is_a_test);
});

test('handles acronyms', t => {
	t.true(decamelcaseKeys({myURLString: true}).my_url_string);
	t.true(decamelcaseKeys({URLString: true}).url_string);
	t.true(decamelcaseKeys({StringURL: true}).string_url);
	t.true(decamelcaseKeys({testGUILabel: true}).test_gui_label);
	t.true(decamelcaseKeys({CAPLOCKED1: true}).caplocked1);
	t.true(decamelcaseKeys({UPPERCASE: true}).uppercase);
	t.true(decamelcaseKeys({'UPPER CASE': true})['upper case']);
});

test('without changes', t => {
	t.true(decamelcaseKeys({'foo-bar': true})['foo-bar']);
	// eslint-disable-next-line camelcase
	t.true(decamelcaseKeys({foo_bar: true}).foo_bar);
	t.true(decamelcaseKeys({_id: true})._id);

	t.deepEqual(
		decamelcaseKeys({foo: true, obj: {deepOption: 'not set'}}),
		{foo: true, obj: {deepOption: 'not set'}}
	);
});

test('exclude option', t => {
	t.deepEqual(decamelcaseKeys({fooBar: true}, {exclude: [/^f/]}), {fooBar: true});

	t.deepEqual(
		decamelcaseKeys({fooBar: true, barFoo: false}, {exclude: ['barFoo']}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, barFoo: false}
	);
});

test('deep option', t => {
	t.deepEqual(
		decamelcaseKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {one_two: false, arr: [{three_four: true}]}}
	);
});

test('stopPaths option', t => {
	t.deepEqual(
		decamelcaseKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true, stopPaths: ['obj']}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}
	);

	t.deepEqual(
		decamelcaseKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true, stopPaths: ['obj.arr']}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {one_two: false, arr: [{threeFour: true}]}}
	);

	t.deepEqual(
		decamelcaseKeys({qWE: [[{fooBar: 1}, {oneTwo: 2}, {fooBar: 3, oneTwo: 4}]]}, {deep: true, stopPaths: ['qWE.fooBar']}),
		// eslint-disable-next-line camelcase
		{q_we: [[{foo_bar: 1}, {one_two: 2}, {foo_bar: 3, one_two: 4}]]}
	);

	t.deepEqual(
		decamelcaseKeys({aB: 1, aC: {cD: 1, cE: {eF: 1}}}, {deep: true, stopPaths: ['aC.cE']}),
		// eslint-disable-next-line camelcase
		{a_b: 1, a_c: {c_d: 1, c_e: {eF: 1}}}
	);
});

test('separator option only', t => {
	t.true(decamelcaseKeys({NewFooBar: true}, {separator: '-'})['new-foo-bar']);
	t.true(decamelcaseKeys({thisIsATest: true}, {separator: ' '})['this is a test']);
	t.true(decamelcaseKeys({thisIsATest: true}, {separator: ''}).thisisatest);
	t.true(decamelcaseKeys({unicornRainbow: true}, {separator: '|'})['unicorn|rainbow']);
	t.true(decamelcaseKeys({thisHasSpecialCharactersLikeČandŠ: true}, {separator: ' '})['this has special characters like čand š']);
});

test('separator and deep options', t => {
	t.deepEqual(
		decamelcaseKeys({PFooBar: true, PObj: {PTwo: false, PArr: [{PThreeFour: true}]}}, {deep: true, separator: '-'}),
		{'p-foo-bar': true, 'p-obj': {'p-two': false, 'p-arr': [{'p-three-four': true}]}}
	);
});

test('handles nested arrays', t => {
	t.deepEqual(
		decamelcaseKeys({qWE: [['a', 'b']]}, {deep: true}),
		// eslint-disable-next-line camelcase
		{q_we: [['a', 'b']]}
	);
});

test('accepts an array of objects', t => {
	t.deepEqual(
		decamelcaseKeys([{fooBar: true}, {barFoo: false}]),
		// eslint-disable-next-line camelcase
		[{foo_bar: true}, {bar_foo: false}]
	);
});

test('different separator option values', t => {
	t.true(decamelcaseKeys({fooBarUPPERCASE: true}).foo_bar_uppercase);
	t.true(decamelcaseKeys({fooBarUPPERCASE: true}, {separator: '-'})['foo-bar-uppercase']);
	t.true(decamelcaseKeys({fooBarUPPERCASE: true}, {separator: '.'})['foo.bar.uppercase']);

	t.deepEqual(
		decamelcaseKeys({PFooBar: true, PObj: {PTwo: false, PArr: [{PThreeFour: true}]}}, {deep: true, separator: '-'}),
		{'p-foo-bar': true, 'p-obj': {'p-two': false, 'p-arr': [{'p-three-four': true}]}}
	);

	t.deepEqual(
		decamelcaseKeys({PFooBar: true, PObj: {PTwo: false, PArr: [{PThreeFour: true}]}}, {deep: true}),
		// eslint-disable-next-line camelcase
		{p_foo_bar: true, p_obj: {p_two: false, p_arr: [{p_three_four: true}]}}
	);
});
