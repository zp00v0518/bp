function setMatchCoeff(document, item, config) {
  const conf = config.matchKey;
  const winHeader = document.querySelector('[data-id^="market-expansion-panel-header-Победитель матча"]');
  const winRow = winHeader.parentElement.nextElementSibling;
  const winOutcomes = winRow.querySelectorAll('[data-id="animated-odds-value"]')
  item.coeff[conf.win1] = winOutcomes[0].innerText;
  item.coeff[conf.draw] = winOutcomes[1].innerText;
  item.coeff[conf.win2] = winOutcomes[2].innerText;

  const doubleWinHeader = document.querySelector('[data-id^="market-expansion-panel-header-Двойной исход"]');
  const doubleWinRow = doubleWinHeader.parentElement.nextElementSibling;
  const doubleWinOutcomes = doubleWinRow.querySelectorAll('[data-id="animated-odds-value"]')
  item.coeff[conf.win1_draw] = doubleWinOutcomes[0].innerText;
  item.coeff[conf.win1_win2] = doubleWinOutcomes[1].innerText;
  item.coeff[conf.win2_draw] = doubleWinOutcomes[2].innerText;
  return item;
}
module.exports = setMatchCoeff;
