import { Drug, Pharmacy, DrugSnapshot } from "./pharmacy";
import { unfold } from "./helpers";

export function getInitialPharmacyState() {
  return new Pharmacy([
    new Drug("Doliprane", 20, 30),
    new Drug("Herbal Tea", 10, 5),
    new Drug("Fervex", 12, 35),
    new Drug("Magic Pill", 15, 40),
  ]);
}

export function runSimulation(pharmacy: Pharmacy, forDays = 30) {
  const seed = [new Pharmacy(pharmacy.drugs), 0] as const;

  const step = ([pharmacy, day]: readonly [Pharmacy, number]):
    | [DrugSnapshot[], [Pharmacy, number]]
    | null => {
    if (day >= forDays) return null;

    const nextDrugs = pharmacy.updateBenefitValue();
    const snapshot = nextDrugs.map((d) => d.toJSON());

    const nextPharmacy = new Pharmacy(nextDrugs);

    return [snapshot, [nextPharmacy, day + 1]];
  };

  const log = unfold(step, seed);

  return log;
}
