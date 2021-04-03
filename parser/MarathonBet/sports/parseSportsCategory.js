function parseSportsCategory(elem) {
  const categoryElem = elem.querySelectorAll('.sport-menu')[1];
  const elemList = categoryElem.querySelectorAll('.sport-menu-item a');
  const result = Array.from(elemList).map((item) => {
    const el = {
      url: item.href,
      name: item.innerText
    };
    return el;
  });
	return result;
}

module.exports = parseSportsCategory;
