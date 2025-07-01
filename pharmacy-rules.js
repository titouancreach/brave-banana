import { Drug } from "./pharmacy";
import { flow, identity } from "./helpers";

/**
 * @param {Drug} drug
 * @returns {Drug}
 */
export function degradeInBenefit(drug) {
  return new Drug(
    drug.name,
    drug.expiresIn,
    drug.expiresIn <= 0 ? drug.benefit - 2 : drug.benefit - 1,
  );
}

/**
 * @param {Drug} drug
 * @returns {Drug}
 */
export function increaseInBenefitForHerbalTea(drug) {
  return new Drug(
    drug.name,
    drug.expiresIn,
    drug.expiresIn <= 0 ? drug.benefit + 2 : drug.benefit + 1,
  );
}

/**
 *
 * @param {Drug} drug
 * @returns {Drug}
 */
export function updateBenefitForFervex(drug) {
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

/**
 * Clamp the benefit between 0 and 50.
 *
 * @param {Drug} drug
 * @returns {Drug}
 */
export function clampBenefit(drug) {
  return new Drug(
    drug.name,
    drug.expiresIn,
    Math.min(Math.max(drug.benefit, 0), 50),
  );
}

/**
 * Decrease the expiresIn by 1.
 *
 * @param {Drug} drug
 * @returns {Drug}
 */
export function dayPassed(drug) {
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
export function updateDrug(drug) {
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
