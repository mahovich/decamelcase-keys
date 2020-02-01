import {expectType} from 'tsd';
import decamelcaseKeys = require('.');

expectType<Array<{[key: string]: unknown}>>(decamelcaseKeys([{'foo-bar': true}]));
expectType<{[key: string]: unknown}>(decamelcaseKeys({'foo-bar': true}));
expectType<{[key: string]: unknown}>(
	decamelcaseKeys({'foo-bar': true}, {deep: true})
);
expectType<{[key: string]: unknown}>(
	decamelcaseKeys({'foo-bar': true}, {deep: true, separator: '-'})
);
expectType<{[key: string]: unknown}>(
	decamelcaseKeys({'foo-bar': true}, {exclude: ['foo', /bar/]})
);
expectType<{[key: string]: unknown}>(
	decamelcaseKeys({'foo-bar': true}, {stopPaths: ['foo']})
);
