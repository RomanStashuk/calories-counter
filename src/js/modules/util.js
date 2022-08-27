const LEAD_ZERO = /^0+/;
const NOT_NUMBERS = /[^\d]/g;

const formatInput = (input) => {
  return input.value.replace(NOT_NUMBERS, '').replace(LEAD_ZERO, '');
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
};

export { formatInput, formatNumber };
