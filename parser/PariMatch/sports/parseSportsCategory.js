function parseSportsCategory(elem) {
  const children = elem.querySelectorAll('[data-id^="sport-navigation-item"]');
  const result = Array.from(children).map((item) => {
    const name = item.outerText;
    if (name.indexOf('LIVE') === -1) return
    const a = item.querySelector('a');
    const el = {
      name: name.replace(/LIVE\s/, ''),
      url: a.href.replace('/live', '')
    };
    return el;
  });
  return result.filter(i => i);
}

module.exports = parseSportsCategory;
