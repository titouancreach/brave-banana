import { Drug, Pharmacy, DrugSnapshot } from "./pharmacy";
import { Option, Array } from "effect";

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

  const step = ([pharmacy, day]: readonly [Pharmacy, number]): Option.Option<
    [DrugSnapshot[], [Pharmacy, number]]
  > => {
    if (day >= forDays) return Option.none();

    const nextDrugs = pharmacy.updateBenefitValue();
    const snapshot = nextDrugs.map((d) => d.toJSON());

    const nextPharmacy = new Pharmacy(nextDrugs);

    return Option.some([snapshot, [nextPharmacy, day + 1]]);
  };

  const log = Array.unfold(seed, step);

  return log;
}
