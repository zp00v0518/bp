function getTotatls(elem) {
  const totals = {};
  const tabel = elem.querySelectorAll('tr .ps .ps')[1];
  const row = tabel.rows[1];
  const str = row.innerText;
  const allTotals = str.match(/\([\d.]{1,}\)[^\(]{0,}/gi);
  allTotals.forEach((txt) => {
    const nums = txt.match(/[\d\.]{1,}/gi);
    const key = nums.splice(0, 1)[0];
    if (+key % 0.5 === 0) {
      totals[key] = [nums[1], nums[0]];
    }
  });
  return totals;
}

module.exports = getTotatls;