import { Drug } from "./pharmacy";
import { flow, identity } from "effect";

export function degradeInBenefit(drug: Drug) {
  return new Drug(
    drug.name,
    drug.expiresIn,
    drug.expiresIn <= 0 ? drug.benefit - 2 : drug.benefit - 1,
  );
}

export function increaseInBenefitForHerbalTea(drug: Drug) {
  return new Drug(
    drug.name,
    drug.expiresIn,
    drug.expiresIn <= 0 ? drug.benefit + 2 : drug.benefit + 1,
  );
}

export function updateBenefitForFervex(drug: Drug) {
  if (drug.expiresIn <= 0) {
    return new Drug(drug.name, drug.expiresIn, 0);
  }

  if (drug.expiresIn <= 5) {
    return new Drug(drug.name, drug.expiresIn, drug.benefit + 3);
  }

  if (drug.expiresIn <= 10) {
    return new Drug(drug.name, drug.expiresIn, drug.benefit + 2);
  }

  return new Drug(drug.name, drug.expiresIn, drug.benefit + 1);
}

export function clampBenefit(drug: Drug) {
  return new Drug(
    drug.name,
    drug.expiresIn,
    Math.min(Math.max(drug.benefit, 0), 50),
  );
}

export function dayPassed(drug: Drug) {
  return new Drug(drug.name, drug.expiresIn - 1, drug.benefit);
}

// Drugs that have no special behavior
const updateOtherDrug = flow(degradeInBenefit, clampBenefit, dayPassed);

// Herbal Tea special behavior
const updateHerbalTea = flow(
  increaseInBenefitForHerbalTea,
  clampBenefit,
  dayPassed,
);

// Fervex special behavior
const updateFervex = flow(updateBenefitForFervex, clampBenefit, dayPassed);

// Magic Pill special behavior
const updateMagicPill = flow(identity);

// Dafalgan special behavior
const updateDafalgan = flow(
  degradeInBenefit,
  degradeInBenefit,
  clampBenefit,
  dayPassed,
);

/**
 * Update the drug by its type.
 *
 * @param {Drug} drug
 * @returns {Drug}
 */
export function updateDrug(drug: Drug) {
  switch (drug.name) {
    case "Herbal Tea":
      return updateHerbalTea(drug);
    case "Fervex":
      return updateFervex(drug);
    case "Magic Pill":
      return updateMagicPill(drug);
    case "Dafalgan":
      return updateDafalgan(drug);
    default:
      return updateOtherDrug(drug);
  }
}
