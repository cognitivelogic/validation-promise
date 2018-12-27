type ArgFunc<T extends object = object> = (value: string, row: T) => any;
type MsgFunc<T extends object = object> = (value: string, row: T, arg: any | ArgFunc<T>) => string;

/**
 * Check if a value is not equal to the given argument using loose type checking
 */
export default <T extends object = object>(
  value: string,
  row: T,
  msg: MsgFunc<T>,
  arg: any | ArgFunc<T>,
): Promise<string | void> => {
  if (typeof arg === 'function') {
    arg = arg(value, row);
  }

  if (value != arg) {
    return Promise.resolve();
  }
  return Promise.reject(msg(value, row, arg));
};
