function parseSportsCategory(elem) {
  const elemList = elem.querySelectorAll('.SportItem_item__3YwMd');
  const result = Array.from(elemList).map((item) => {
    const span = item.querySelector('.SportItem_left__5TAtV');
    const el = {
      url: item.href,
      name: span ? span.innerText : ''
    };
    return el;
  });
  return result;
}

module.exports = parseSportsCategory;
