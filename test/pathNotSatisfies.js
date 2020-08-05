import { assert } from 'chai';
import * as R from 'ramda';

import * as RA from '../src';

describe('pathNotSatisfies', function () {
  context(
    'given a path for a property that does not satisfy the given predicate',
    function () {
      specify('should return true', function () {
        assert.isTrue(
          RA.pathNotSatisfies((val) => !!val, ['a', 'b'], { a: { b: false } })
        );
        assert.isTrue(
          RA.pathNotSatisfies((val) => val < 10, ['a', 'b'], {
            a: {
              b: 12,
            },
          })
        );
        assert.isTrue(
          RA.pathNotSatisfies((val) => val % 2 === 0, [1, 0], [0, [23]])
        );
      });
    }
  );

  context(
    'given a path for a property that does satisfy the given predicate',
    function () {
      specify('should return false', function () {
        assert.isFalse(
          RA.pathNotSatisfies((val) => !!val, ['a', 'b'], {
            a: {
              b: true,
            },
          })
        );
        assert.isFalse(
          RA.pathNotSatisfies((val) => val < 10, ['a', 'b'], {
            a: {
              b: 9,
            },
          })
        );
        assert.isFalse(
          RA.pathNotSatisfies((val) => val % 2 === 0, [1, 0], [0, [20]])
        );
      });
    }
  );

  it('should support currying', function () {
    assert.isTrue(
      RA.pathNotSatisfies((y) => y < 0, ['x', 'y'])({
        x: {
          y: 2,
        },
      })
    );
    assert.isFalse(
      RA.pathNotSatisfies((y) => y > 0)(['x', 'y'], {
        x: {
          y: 2,
        },
      })
    );
    assert.isTrue(
      RA.pathNotSatisfies((y) => y > 0)(['x', 'y'])({
        x: {
          y: -2,
        },
      })
    );
  });

  it('should support placeholder to specify "gaps"', function () {
    const notSatisfiesFor12 = RA.pathNotSatisfies(R.__, ['a', 'b'], {
      a: { b: 12 },
    });

    assert.isTrue(notSatisfiesFor12((val) => val < 10));
    assert.isFalse(notSatisfiesFor12((val) => val > 10));

    const pathNotSatisfiesForThisObject = RA.pathNotSatisfies(R.__, R.__, {
      a: {
        b: 12,
      },
    });

    assert.isTrue(
      pathNotSatisfiesForThisObject((val) => typeof val !== 'object', ['a'])
    );
    assert.isTrue(
      pathNotSatisfiesForThisObject((val) => typeof val === 'object', [
        'a',
        'b',
      ])
    );
  });
});
