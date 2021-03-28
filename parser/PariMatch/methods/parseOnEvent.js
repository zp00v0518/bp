function parseOnEvent(row, extraRow, options) {
  const item = options.setNamesCommand(row);
  item.url = window.location.href;
  item.coeff = {};
  options.getDate(row, item);
  options.setMatchCoeff(row, item, options.appConfig);
  const totals = options.getTotatls(extraRow);
  if (totals) {
    item.coeff.totals = totals;
  }
  return item;
}

module.exports = parseOnEvent;
