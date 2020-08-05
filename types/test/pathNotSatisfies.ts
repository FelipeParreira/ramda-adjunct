import * as RA from 'ramda-adjunct';

RA.pathNotSatisfies(() => true, [], {}); // $ExpectType boolean
RA.pathNotSatisfies(() => false, [], []); // $ExpectType boolean
RA.pathNotSatisfies(() => false, [], () => {}); // $ExpectType boolean

RA.pathNotSatisfies(() => true)([], {}); // $ExpectType boolean
RA.pathNotSatisfies(() => true)([])({}); // $ExpectType boolean

RA.pathNotSatisfies(() => 1, [], {}); // $ExpectError
RA.pathNotSatisfies(() => '', [], {}); // $ExpectError
RA.pathNotSatisfies(() => null, [], {}); // $ExpectError
RA.pathNotSatisfies(() => ([]), [], {}); // $ExpectError
RA.pathNotSatisfies(); // $ExpectError
RA.pathNotSatisfies()(); // $ExpectError
RA.pathNotSatisfies()()(); // $ExpectError
