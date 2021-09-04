function setMatchCoeff(elem, item) {
  const matches = [
    { key: 'w1', match: 'Match_Result.1' },
    { key: 'x', match: 'Match_Result.draw' },
    { key: 'w2', match: 'Match_Result.3' },
    { key: 'w1_x', match: 'Result.HD' },
    { key: 'w1_w2', match: 'Result.HA' },
    { key: 'w2_x', match: 'Result.AD' }
  ];
  const { selectionKey } = elem.dataset;
  const elemMatch = matches.find((i) => selectionKey.includes(i.match));
  if (elemMatch) {
    	// TODO: умножается коэффициент!!!!!!
    item.coeff[elemMatch.key] = +elem.dataset.selectionPrice *3;
    // item.coeff[elemMatch.key] = +elem.dataset.selectionPrice;
  }
  return item;
}
module.exports = setMatchCoeff;
