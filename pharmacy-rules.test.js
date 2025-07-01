import { Drug } from "./pharmacy";
import {
  degradeInBenefit,
  increaseInBenefitForHerbalTea,
  updateBenefitForFervex,
  clampBenefit,
  dayPassed,
  degradeTwiceAsFast,
  updateDrug,
} from "./pharmacy-rules";

describe("pharmacy-rules", () => {
  describe("degradeInBenefit", () => {
    it("should decrease benefit by 1 if not expired", () => {
      const drug = new Drug("test", 5, 10);
      expect(degradeInBenefit(drug)).toEqual(new Drug("test", 5, 9));
    });
    it("should decrease benefit by 2 if expired", () => {
      const drug = new Drug("test", 0, 10);
      expect(degradeInBenefit(drug)).toEqual(new Drug("test", 0, 8));
    });
  });

  describe("increaseInBenefitForHerbalTea", () => {
    it("should increase benefit by 1 if not expired", () => {
      const drug = new Drug("Herbal Tea", 5, 10);
      expect(increaseInBenefitForHerbalTea(drug)).toEqual(
        new Drug("Herbal Tea", 5, 11),
      );
    });
    it("should increase benefit by 2 if expired", () => {
      const drug = new Drug("Herbal Tea", 0, 10);
      expect(increaseInBenefitForHerbalTea(drug)).toEqual(
        new Drug("Herbal Tea", 0, 12),
      );
    });
  });

  describe("updateBenefitForFervex", () => {
    it("should set benefit to 0 if expired", () => {
      const drug = new Drug("Fervex", 0, 10);
      expect(updateBenefitForFervex(drug)).toEqual(new Drug("Fervex", 0, 0));
    });
    it("should increase benefit by 3 if expiresIn <= 5", () => {
      const drug = new Drug("Fervex", 5, 10);
      expect(updateBenefitForFervex(drug)).toEqual(new Drug("Fervex", 5, 13));
    });
    it("should increase benefit by 2 if expiresIn <= 10", () => {
      const drug = new Drug("Fervex", 10, 10);
      expect(updateBenefitForFervex(drug)).toEqual(new Drug("Fervex", 10, 12));
    });
    it("should increase benefit by 1 if expiresIn > 10", () => {
      const drug = new Drug("Fervex", 11, 10);
      expect(updateBenefitForFervex(drug)).toEqual(new Drug("Fervex", 11, 11));
    });
  });

  describe("clampBenefit", () => {
    it("should clamp benefit to 0 if below 0", () => {
      const drug = new Drug("test", 5, -5);
      expect(clampBenefit(drug)).toEqual(new Drug("test", 5, 0));
    });
    it("should clamp benefit to 50 if above 50", () => {
      const drug = new Drug("test", 5, 55);
      expect(clampBenefit(drug)).toEqual(new Drug("test", 5, 50));
    });
    it("should not change benefit if within range", () => {
      const drug = new Drug("test", 5, 25);
      expect(clampBenefit(drug)).toEqual(new Drug("test", 5, 25));
    });
  });

  describe("dayPassed", () => {
    it("should decrease expiresIn by 1", () => {
      const drug = new Drug("test", 5, 10);
      expect(dayPassed(drug)).toEqual(new Drug("test", 4, 10));
    });
  });

  describe("degradeTwiceAsFast", () => {
    it("should decrease benefit by 2 if not expired", () => {
      const drug = new Drug("test", 5, 10);
      expect(degradeTwiceAsFast(drug)).toEqual(new Drug("test", 5, 8));
    });
    it("should decrease benefit by 4 if expired", () => {
      const drug = new Drug("test", 0, 10);
      expect(degradeTwiceAsFast(drug)).toEqual(new Drug("test", 0, 6));
    });
  });

  describe("updateDrug", () => {
    it("should use Herbal Tea logic", () => {
      const drug = new Drug("Herbal Tea", 5, 10);
      expect(updateDrug(drug)).toEqual(new Drug("Herbal Tea", 4, 11));
    });
    it("should use Fervex logic", () => {
      const drug = new Drug("Fervex", 5, 10);
      expect(updateDrug(drug)).toEqual(new Drug("Fervex", 4, 13));
    });
    it("should use Magic Pill logic", () => {
      const drug = new Drug("Magic Pill", 5, 10);
      expect(updateDrug(drug)).toEqual(new Drug("Magic Pill", 5, 10));
    });
    it("should use default logic for unknown drug", () => {
      const drug = new Drug("test", 5, 10);
      expect(updateDrug(drug)).toEqual(new Drug("test", 4, 9));
    });
  });
});
