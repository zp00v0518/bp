// const totals = {
//   // первое число меньше, 2-е больше
//   1.5: [3.0, 1.2],
//   2: [1.4, 4.2]
// };

function getTotals(document) {
  const totals = {};
  const totalHeader = document.querySelector(
    '[data-id="market-expansion-panel-header-Тотал"]'
  );
  const totalBlock = totalHeader.parentElement.nextElementSibling;
  let totalRows = totalBlock.children;
  Array.from(totalRows).forEach((row, index) => {
    if (index === 0) return;
    const strArr = row.innerText.split('\n');
    const key = strArr[0];
    const more = +strArr[1];
    const less = +strArr[2];
    if(Number.isNaN(more) || Number.isNaN(less)) return;
    totals[key] = [less, more];
  });
  return totals;
}

module.exports = getTotals;
