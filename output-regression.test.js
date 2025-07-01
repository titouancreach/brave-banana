import { Drug, Pharmacy } from "./pharmacy";
import fs from "fs";

function runSimulation() {
  const drugs = [
    new Drug("Doliprane", 20, 30),
    new Drug("Herbal Tea", 10, 5),
    new Drug("Fervex", 12, 35),
    new Drug("Magic Pill", 15, 40),
  ];
  const pharmacy = new Pharmacy(drugs);
  const log = [];
  for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
    log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
  }
  return { result: log };
}

describe("output.json regression", () => {
  it("should match the committed output.json exactly", () => {
    const expected = JSON.parse(fs.readFileSync("output.json", "utf-8"));
    const actual = runSimulation();
    expect(actual).toEqual(expected);
  });
});
