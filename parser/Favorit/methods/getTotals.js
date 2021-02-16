function getTotals(eventData) {
  try {
    const template = {};
    const totals = eventData.filter(
      (i) => i.market_template_weigh === 14 && i.result_type_weigh === 1
    );
    if (!totals) return false;
    totals.forEach((item) => {
      const outcomes = item.outcomes;
      const key = outcomes[0].outcome_param;
      template[key] = [outcomes[1].outcome_coef, outcomes[0].outcome_coef];
    });
    return template;
  } catch (err) {
    console.log('Favorite - getTotals', eventData);
    return false;
  }
}

module.exports = getTotals;
