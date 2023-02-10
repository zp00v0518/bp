function setMatchCoeff(document, item, config) {
  const conf = config.matchKey;
  const lineDOM = document.querySelector('#line-holder')
  const tabs = lineDOM.querySelector('[data-id="event-market-tabs-carousel"]');
  const winRow = tabs.nextElementSibling
  const winOutcomes = winRow.lastChild.firstChild.children
  console.dir(winOutcomes)
  item.coeff[conf.win1] = winOutcomes[0].lastChild.innerText;
  item.coeff[conf.draw] = winOutcomes[1].lastChild.innerText;
  item.coeff[conf.win2] = winOutcomes[2].lastChild.innerText;
  console.log(item)

  const doubleWinHeader = winRow.nextElementSibling
  const doubleWinOutcomes = doubleWinHeader.lastChild.firstChild.children
  item.coeff[conf.win1_draw] = doubleWinOutcomes[0].lastChild.innerText;
  item.coeff[conf.win1_win2] = doubleWinOutcomes[1].lastChild.innerText;
  item.coeff[conf.win2_draw] = doubleWinOutcomes[2].lastChild.innerText;
  return item;
}
module.exports = setMatchCoeff;
