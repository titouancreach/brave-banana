import { unfold } from "./helpers";

describe("unfold", () => {
  it("should unfold using a simple increment function (+1)", () => {
    /**
     * @param {number} n
     * @returns {[number, number] | null}
     */
    const fn = (n) => (n > 5 ? null : [n, n + 1]);
    const result = unfold(fn, 1);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return an empty array if fn returns null on first call", () => {
    /**
     * @returns {[number, number] | null}
     */
    const fn = () => null;
    const result = unfold(fn, 0);
    expect(result).toEqual([]);
  });

  it("should work with a function that generates Fibonacci numbers", () => {
    /**
     * @param {[number, number]} param0
     * @returns {[number, [number, number]] | null}
     */
    const fn = ([a, b]) => (a > 10 ? null : [a, [b, a + b]]);
    const result = unfold(fn, [1, 1]);
    expect(result).toEqual([1, 1, 2, 3, 5, 8]);
  });
});
