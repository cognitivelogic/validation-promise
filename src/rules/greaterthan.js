// @flow

type ArgFunc = (value: string, row: Object) => number;
type CompareSet = {
  value: string;
  compare: string
};

/**
 * Check if a value is greater than foo
 * @param {String} value To validate
 * @param {Object} row Form data
 * @param {Function} msg Error message function
 * @param {*} arg Validation arguement
 * @return {Promise} .
 */
export default (value: string, row: Object, msg: Function, arg: number|ArgFunc|CompareSet) : Promise<?string> => {
  let compare = arg;
  if (typeof arg === 'function') {
    compare = arg(value, row);
  }
  if (typeof compare === 'object') {
    value = compare.value;
    compare = compare.compare;
  }
  if (parseInt(value, 10) > parseInt(compare, 10)) {
    return Promise.resolve();
  }

  return Promise.reject(msg(value, row, arg));
};
