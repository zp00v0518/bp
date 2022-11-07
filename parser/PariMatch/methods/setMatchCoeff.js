function setMatchCoeff(document, item, config) {
  const conf = config.matchKey;
  const outcomesElems = document.querySelectorAll('.EC_oK_EC_q.EC_lJ_EC_lL.EC_lJ_EC_M');
  const winRow = outcomesElems[0];
  // const winRow = winHeader.parentElement.nextElementSibling;
  const winOutcomes = winRow.querySelectorAll('[data-id="animated-odds-value"]')
  item.coeff[conf.win1] = winOutcomes[0].innerText;
  item.coeff[conf.draw] = winOutcomes[1].innerText;
  item.coeff[conf.win2] = winOutcomes[2].innerText;

  const doubleWinHeader = outcomesElems[1]
  const doubleWinOutcomes = doubleWinHeader.querySelectorAll('[data-id="animated-odds-value"]')
  item.coeff[conf.win1_draw] = doubleWinOutcomes[0].innerText;
  item.coeff[conf.win1_win2] = doubleWinOutcomes[1].innerText;
  item.coeff[conf.win2_draw] = doubleWinOutcomes[2].innerText;
  return item;
}
module.exports = setMatchCoeff;
