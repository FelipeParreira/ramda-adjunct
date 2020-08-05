import { pathSatisfies, complement } from 'ramda';

/**
 * Complement of pathSatisfies. Checks if property of an object at a given path does not
 * satistify the input predicate.
 *
 * @func pathNotSatisfies
 * @memberOf RA
 * @category Object
 * @sig Function -> Array<String|Number> -> Object -> Boolean
 * @param {Function} pred
 * @param {Array<String\Number>} path
 * @param {Object} obj
 * @return {boolean}
 * @see {@link https: //ramdajs.com/docs/#pathSatisfies|R.pathStatisfies}
 * @example
 *
 * RA.pathNotSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2 }}); //=> false
 * RA.pathNotSatisfies(y => y > 0, ['x', 'y'], {x: {y: -1 }}); //=> true
 */
const pathNotSatisfies = complement(pathSatisfies);

export default pathNotSatisfies;
