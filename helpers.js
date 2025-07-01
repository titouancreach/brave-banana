/**
 * Compose functions from left to right.
 *
 * @template T
 * @param {((input: T) => T)[]} fns
 * @returns {(input: T) => T}
 */
export const flow =
  (...fns) =>
  (input) =>
    fns.reduce((v, f) => f(v), input);

/**
 * @template T
 * @param {T} x
 * @returns {T}
 */
export const identity = (x) => x;
