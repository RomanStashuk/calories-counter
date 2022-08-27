import { formatInput } from './util';
import Result from './result';

const PhysicalActivityCoefficients = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9
};

const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25
};

const CaloriesFormulaConstant = {
  MALE: -5,
  FEMALE: 161
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15
};

export default class Counter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector('.counter__form');
    this.elements = this.form.elements;
    this.parameters = this.elements.parameters.elements;

    this.submit = this.elements.submit;
    this.reset = this.elements.reset;

    this.gender = this.elements.gender;
    this.age = this.elements.age;
    this.height = this.elements.height;
    this.weight = this.elements.weight;
    this.activity = this.elements.activity;

    this.result = new Result(this.root);
    this.parametersItems = Array.from(this.parameters);

    this.onFormInput = this.onFormInput.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormReset = this.onFormReset.bind(this);
  }

  onFormInput() {
    this.submit.disabled = !this.form.checkValidity();
    this.reset.disabled = !this.parametersItems.some((el) => el.value);

    this.age.value = formatInput(this.age);
    this.height.value = formatInput(this.height);
    this.weight.value = formatInput(this.weight);
  }

  onFormReset() {
    this.submit.disabled = true;
    this.reset.disabled = true;
    this.result.hide();
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    const caloriesData = {
      min: this.getCaloriesMin(),
      norm: this.getCaloriesNorm(),
      max: this.getCaloriesMax()
    };

    this.result.show(caloriesData);
  }

  init() {
    this.form.addEventListener('input', this.onFormInput, true);
    this.form.addEventListener('reset', this.onFormReset);
    this.form.addEventListener('submit', this.onFormSubmit);
  }

  deinit() {
    this.form.removeEventListener('input', this.onFormInput, true);
    this.form.removeEventListener('reset', this.onFormReset);
    this.form.removeEventListener('submit', this.onFormSubmit);
  }

  getCaloriesNorm() {
    const gender = CaloriesFormulaConstant[this.gender.value.toUpperCase()];
    const age = CaloriesFormulaFactor.AGE * this.age.value;
    const height = CaloriesFormulaFactor.HEIGHT * this.height.value;
    const weight = CaloriesFormulaFactor.WEIGHT * this.weight.value;
    const activity =
      PhysicalActivityCoefficients[this.activity.value.toUpperCase()];

    return Math.round((weight + height - age - gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MIN);
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MAX);
  }
}
