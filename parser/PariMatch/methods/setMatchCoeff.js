function setMatchCoeff(row, item, config) {
  const tr = row.firstChild;
  const cells = tr.children;
  const conf = config.matchKey;
  item.coeff[conf.win1] = cells[8].innerText;
  item.coeff[conf.draw] = cells[9].innerText;
  item.coeff[conf.win2] = cells[10].innerText;
  item.coeff[conf.win1_draw] = cells[11].innerText;
  item.coeff[conf.win1_win2] = cells[12].innerText;
  item.coeff[conf.win2_draw] = cells[13].innerText;
  return item;
}
module.exports = setMatchCoeff;
