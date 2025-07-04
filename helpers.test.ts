import { unfold } from "./helpers";

describe("unfold", () => {
  it("should unfold using a simple increment function (+1)", () => {
    const fn = (n: number): [number, number] | null =>
      n > 5 ? null : [n, n + 1];
    const result = unfold<number, number>(fn, 1);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return an empty array if fn returns null on first call", () => {
    const fn = (): [number, number] | null => null;
    const result = unfold<number, number>(fn, 0);
    expect(result).toEqual([]);
  });

  it("should work with a function that generates Fibonacci numbers", () => {
    const fn = ([a, b]: [number, number]): [number, [number, number]] | null =>
      a > 10 ? null : [a, [b, a + b]];
    const result = unfold<number, [number, number]>(fn, [1, 1]);
    expect(result).toEqual([1, 1, 2, 3, 5, 8]);
  });
});
