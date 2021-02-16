async function getHrefs(page, selector) {
  const hrefs = await page.$$eval(selector, (arr) => {
    const hrefs = arr.map((a) => a.href);
    const set = new Set(hrefs);
    return [...set];
  });
  return hrefs;
}

module.exports = getHrefs;
