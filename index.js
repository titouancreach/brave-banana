// @ts-check

import fs from "fs";
import { getInitialPharmacyState, runSimulation } from "./simulation";

const pharmacy = getInitialPharmacyState();

const log = runSimulation(pharmacy, 30);

fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);
