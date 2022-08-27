import { formatNumber } from './util';

export default class Result {
  constructor(element) {
    this.root = element.querySelector('.counter__result');
    this.counter = element;
    this.caloriesMinOutput = this.root.querySelector('#calories-minimal');
    this.caloriesNormOutput = this.root.querySelector('#calories-norm');
    this.caloriesMaxOutput = this.root.querySelector('#calories-maximal');
  }

  show(calories) {
    this.caloriesNormOutput.textContent = formatNumber(calories.norm);
    this.caloriesMinOutput.textContent = formatNumber(calories.min);
    this.caloriesMaxOutput.textContent = formatNumber(calories.max);
    this.root.classList.remove('counter__result--hidden');
    this.root.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  hide() {
    this.caloriesMinOutput.textContent = 0;
    this.caloriesNormOutput.textContent = 0;
    this.caloriesMaxOutput.textContent = 0;
    this.root.classList.add('counter__result--hidden');
    this.counter.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}
