import { Drug, Pharmacy } from "./pharmacy";
import { describe, it, expect } from "vitest";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn for a normal drug", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("should degrade the benefit twice as fast after expiration for a normal drug", () => {
    expect(new Pharmacy([new Drug("test", 0, 4)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 2)],
    );
  });

  it("the benefit should never be negative", () => {
    expect(new Pharmacy([new Drug("test", 0, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 0)],
    );
  });

  it("Herbal Tea increases its benefit over time", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 10, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 9, 11)]);
  });

  it("Herbal Tea increases its benefit twice as fast after expiration", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", -1, 12)]);
  });

  it("the benefit should never exceed 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 5, 50)]).updateBenefitValue(),
    ).toEqual([new Drug("Herbal Tea", 4, 50)]);
  });

  it("Magic Pill never expires and its benefit never changes", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 10, 40)]).updateBenefitValue(),
    ).toEqual([new Drug("Magic Pill", 10, 40)]);
  });

  it("Fervex increases its benefit by 1 if more than 10 days left", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 11, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 10, 11)]);
  });

  it("Fervex increases its benefit by 2 if 10 days or less left", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 9, 12)]);
  });

  it("Fervex increases its benefit by 3 if 5 days or less left", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", 4, 13)]);
  });

  it("Fervex drops its benefit to 0 after expiration", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("Dafalgan degrades in benefit twice as fast as a normal drug before expiration", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 5, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", 4, 8)]);
  });

  it("Dafalgan degrades in benefit four times as fast after expiration", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 10)]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", -1, 6)]);
  });

  it("Dafalgan's benefit should never be negative", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 3)]).updateBenefitValue(),
    ).toEqual([new Drug("Dafalgan", -1, 0)]);
  });
});
