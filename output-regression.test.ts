import fs from "fs";
import { getInitialPharmacyState, runSimulation } from "./simulation";

describe("output.json regression", () => {
  it("should match the committed output.json exactly", () => {
    const expected = JSON.parse(fs.readFileSync("output.json", "utf-8"));
    const pharmacy = getInitialPharmacyState();
    const actual = runSimulation(pharmacy, 30);
    expect({ result: actual }).toEqual(expected);
  });
});
