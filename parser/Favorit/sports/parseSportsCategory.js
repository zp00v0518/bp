function parseSportsCategory(elem) {
  const elemList = elem.querySelectorAll('.SportItem_item__3YwMd');
  const result = Array.from(elemList).map((item) => {
    const el = {
      url: item.href,
      name: item.innerText.split('\n')[0]
    };
    return el;
  });
  return result;
}

module.exports = parseSportsCategory;
