function getTotals(row) {
  try {
    const totalsTable = row.querySelector('[data-block-type-id="3"]');
    const lessMore = totalsTable.querySelector('.block-market-table-wrapper')
      .firstElementChild;
    const rows = lessMore.querySelectorAll(
      '[data-header-highlighted-bounded="true"]'
    );
    const item = {};
    Array.from(rows).forEach((tr) => {
      const less = tr.firstElementChild;
      if (less.dataset.sel) {
        const lessData = JSON.parse(less.dataset.sel);
        const key = lessData.sn.match(/[\d\.]{1,}/gi);
        if (key) {
					// TODO: умножается коэффициент!!!!!!
          item[key] = [lessData.prices[1]*2];
          // item[key] = [lessData.prices[1]];
          const more = tr.lastElementChild;
          const moreData = JSON.parse(more.dataset.sel);
          item[key].push(moreData.prices[1]);
        }
      }
    });
    return item;
  } catch (err) {
    return false;
  }
}

module.exports = getTotals;
