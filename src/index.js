import './sass/style.scss';

import Counter from './js/modules/counter';

const counter = document.querySelectorAll('.counter');

counter.forEach((element) => {
  const counter = new Counter(element);
  counter.init();
});
