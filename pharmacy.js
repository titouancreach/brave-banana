import { updateDrug } from "./pharmacy-rules";

/**
 * @typedef {('Herbal Tea' | 'Fervex' | 'Magic Pill' | 'Dafalgan' | string)} DrugName
 */

/**
 * @typedef {Object} DrugSnapshot
 * @property {DrugName} name
 * @property {number} expiresIn
 * @property {number} benefit
 */

export class Drug {
  /**
   * @param {DrugName} name
   * @param {number} expiresIn
   * @param {number} benefit
   */
  constructor(name, expiresIn, benefit) {
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
  /**
   * @param {Drug[]} drugs
   */
  constructor(drugs = []) {
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
