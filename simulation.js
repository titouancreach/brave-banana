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
 * @param {number} forDays
 * @param {Pharmacy} pharmacy
 * @returns {Drug[][]}
 */
export function runSimulation(pharmacy, forDays = 30) {
  /**
   * @type {[Pharmacy, number]}
   */
  // we want to avoid mutating the parameter
  const seed = [new Pharmacy(pharmacy.drugs), 0];

  /**
   * @param {[Pharmacy, number]} input
   * @returns {[Drug[], [Pharmacy, number]] | null}
   */
  const step = ([pharmacy, day]) => {
    if (day >= forDays) return null;

    const nextPharmacy = new Pharmacy(pharmacy.updateBenefitValue()); // unforunately, this is not pure, but we can act as if it is, it will be easier refactor later

    return [
      pharmacy.drugs.map((d) => JSON.parse(JSON.stringify(d))),
      [nextPharmacy, day + 1],
    ];
  };

  const log = unfold(step, seed);

  return log;
}
