function parseSportsCategory(elem) {
  // const arr = [elem.children[0], elem.children[1]];
  const result = Array.from(elem.children).map((item) => {
    const el = {
      name: item.firstChild.innerText
    };
    const link = item.querySelector('.hidden.groups li a').href;
    const url = link
      .split('/')
      .splice(0, 5)
      .join('/');
    el.url = url;
    return el;
  });
  return result;
}

module.exports = parseSportsCategory;
