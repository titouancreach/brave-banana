import { updateDrug } from "./pharmacy-rules.js";
import type { DrugSnapShot, DrugName } from "./Drug.js";

export class Drug {
  name: DrugName;
  expiresIn: number;
  benefit: number;

  constructor(name: DrugName, expiresIn: number, benefit: number) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  toJSON(): DrugSnapShot {
    return {
      name: this.name,
      expiresIn: this.expiresIn,
      benefit: this.benefit,
    };
  }
}

export class Pharmacy {
  drugs: Drug[];

  constructor(drugs: Drug[] = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs = this.drugs.map(updateDrug);
    return this.drugs;
  }
}
