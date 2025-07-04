import { updateDrug } from "./pharmacy-rules";

/**
 * @typedef {('Herbal Tea' | 'Fervex' | 'Magic Pill' | 'Dafalgan' | string)} DrugName
 */

type DrugName = "Herbal Tea" | "Fervex" | "Magic Pill" | "Dafalgan" | string;

export type DrugSnapshot = {
  name: DrugName;
  expiresIn: number;
  benefit: number;
};

export class Drug {
  name: DrugName;
  expiresIn: number;
  benefit: number;

  constructor(name: DrugName, expiresIn: number, benefit: number) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  /**
   * @returns {DrugSnapshot}
   */
  toJSON() {
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

  /**
   * @returns {Drug[]}
   */
  updateBenefitValue() {
    this.drugs = this.drugs.map(updateDrug);
    return this.drugs;
  }
}
