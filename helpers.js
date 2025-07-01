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

/**
 * @param {(seed: S) => [T, S] | null} fn
 * @param {S} seed
 * @returns {T[]}
 * @template T, S
 */
export function unfold(fn, seed) {
  const val = fn(seed);
  if (!val) return [];
  const [head, nextSeed] = val;
  return [head, ...unfold(fn, nextSeed)];
}
