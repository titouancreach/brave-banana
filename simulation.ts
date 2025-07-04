import { Drug, Pharmacy } from "./pharmacy.js";
import { Option, Array } from "effect";
import type { DrugSnapShot } from "./Drug.js";

export function getInitialPharmacyState() {
  return new Pharmacy([
    new Drug("Doliprane", 20, 30),
    new Drug("Herbal Tea", 10, 5),
    new Drug("Fervex", 12, 35),
    new Drug("Magic Pill", 15, 40),
  ]);
}

type StepState = [Pharmacy, number];

export function runSimulation(pharmacy: Pharmacy, forDays = 30) {
  const seed: StepState = [new Pharmacy(pharmacy.drugs), 0];

  const log = Array.unfold(
    seed,
    ([pharmacy, day]): Option.Option<[DrugSnapShot[], StepState]> => {
      if (day >= forDays) return Option.none();

      const nextDrugs = pharmacy.updateBenefitValue();
      const snapshot = nextDrugs.map((d) => d.toJSON());

      const nextPharmacy = new Pharmacy(nextDrugs);

      return Option.some([snapshot, [nextPharmacy, day + 1] as const]);
    },
  );

  return log;
}
