import { Drug, Pharmacy } from "./pharmacy";
import { unfold } from "./helpers";

export function getInitialPharmacyState() {
  return new Pharmacy([
    new Drug("Doliprane", 20, 30),
    new Drug("Herbal Tea", 10, 5),
    new Drug("Fervex", 12, 35),
    new Drug("Magic Pill", 15, 40),
  ]);
}

/**
 * @typedef {import("./pharmacy").DrugSnapshot} DrugSnapshot
 */

/**
 * @param {number} forDays
 * @param {Pharmacy} pharmacy
 * @returns {DrugSnapshot[][]}
 */
export function runSimulation(pharmacy, forDays = 30) {
  /**
   * @type {[Pharmacy, number]}
   */
  // we want to avoid mutating the parameter
  const seed = [new Pharmacy(pharmacy.drugs), 0];

  /**
   * @param {[Pharmacy, number]} input
   * @returns {[DrugSnapshot[], [Pharmacy, number]] | null}
   */
  const step = ([pharmacy, day]) => {
    if (day >= forDays) return null;

    const nextDrugs = pharmacy.updateBenefitValue();
    const snapshot = nextDrugs.map((d) => d.toJSON());

    const nextPharmacy = new Pharmacy(nextDrugs);

    return [snapshot, [nextPharmacy, day + 1]];
  };

  const log = unfold(step, seed);

  return log;
}
