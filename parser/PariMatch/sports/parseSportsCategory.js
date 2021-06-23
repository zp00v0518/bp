function parseSportsCategory(elem) {
  // const arr = [elem.children[0], elem.children[1]];
  const arrElems = elem.querySelectorAll('[data-id][href')
  const result = Array.from(arrElems).map((item) => {
    const el = {
      name: item.lastChild.innerText
    };
    const url = item.href.replace('live', '');
    el.url = url;
    return el;
  });
  return result;
}

module.exports = parseSportsCategory;
