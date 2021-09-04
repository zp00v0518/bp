function parseSportsCategory(elem) {
  const children = elem.querySelectorAll('[data-id^="sport-navigation-item"]');
  const result = Array.from(children).map((item) => {
    const name = item.outerText;
    const el = {
      name: name.replace(/LIVE\s/, ''),
      url: item.href.replace('/live', '')
    };
    return el;
  });
  return result;
}

module.exports = parseSportsCategory;
