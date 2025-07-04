import { Drug } from "./pharmacy.js";
import { flow, identity } from "effect";

import { Match } from "effect";

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

export function updateDrug(drug: Drug) {
  return Match.value(drug.name).pipe(
    Match.when("Herbal Tea", () => updateHerbalTea(drug)),
    Match.when("Fervex", () => updateFervex(drug)),
    Match.when("Magic Pill", () => updateMagicPill(drug)),
    Match.when("Dafalgan", () => updateDafalgan(drug)),
    Match.orElse(() => updateOtherDrug(drug)),
  );
}
