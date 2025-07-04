export const flow =
  <T>(...fns: ((input: T) => T)[]) =>
  (input: T) =>
    fns.reduce((v, f) => f(v), input);

export const identity = <T>(x: T) => x;

export function unfold<T, S>(fn: (seed: S) => [T, S] | null, seed: S): T[] {
  const val = fn(seed);
  if (!val) return [];
  const [head, nextSeed] = val;
  return [head, ...unfold(fn, nextSeed)];
}
