import { calculate, fetchStats } from './chess.js';

const calcButton = document.querySelector('#calc');
calcButton.addEventListener('click', (event) => {
  calculate();
});

const fetchButton = document.querySelector('#fetch');
fetchButton.addEventListener('click', (event2) => {
  fetchStats();
});

document.addEventListener('keypress', function (event) {
  if (event.key == 'Enter') {
    const focus = document.activeElement.className;
    if (focus == 'text username') {
      fetchStats();
    } else if (focus == 'text rating') {
      calculate();
    }
  }
});
