function getTotals(row) {
  try {
    const totalsTable = row.querySelector('[data-block-type-id="3"]');
    const lessMore = totalsTable.querySelector('.block-market-table-wrapper')
      .firstElementChild;
    const rows = lessMore.querySelectorAll(
      '[data-header-highlighted-bounded="true"]'
    );
    const item = {};
    console.clear()
    Array.from(rows).forEach((tr) => {
      const valueSelector = '.coeff-value';
      const coefSelector = '.coeff-price';
      const less = tr.firstElementChild;
      let valueElem = less.querySelector(valueSelector)
      if (valueElem){
        const key = valueElem.textContent.match(/[\d\.]{1,}/gi)[0]
        const lessCoef = less.querySelector(coefSelector).textContent.match(/[\d\.]{1,}/gi)[0]
        const moreElem = tr.lastElementChild;
        const moreCoef = moreElem.querySelector(coefSelector).textContent.match(/[\d\.]{1,}/gi)[0]
        item[key] = [+lessCoef, +moreCoef]
        console.log(key, lessCoef, moreCoef)
      }
    });
    return item;
  } catch (err) {
    return false;
  }
}

module.exports = getTotals;
