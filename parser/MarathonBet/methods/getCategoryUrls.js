async function getCategoryUrls(browser, url) {
  const query = '?interval=ALL_TIME&cpcids=all';
  const categoryPage = await browser.newPage();
  const sportUrl = url + query;
  let result = [];
  try {
    await categoryPage.goto(sportUrl, {
      waitUntil: 'domcontentloaded'
    });
    await categoryPage.waitForSelector('#events_content');
    const pageFrame = categoryPage.mainFrame();
    result = await pageFrame.$eval('.sport-category-content', async (elem) => {
      const elems = elem.querySelectorAll('.category-label-link');
      return Array.from(elems).map((i) => i.href);
    });
  } catch (err) {
    console.log(err);
		categoryPage.close();
    return result;
  }
  result = removeSomeUrls(result);
	categoryPage.close();
  return result;
}

function removeSomeUrls(arr) {
	const removeList = ['Outright', 'Women']
  return arr.filter((url) => {
    let flag = false;
    flag = removeList.some(removeItem => url.includes(removeItem));
    return !flag;
  });
}

module.exports = getCategoryUrls;
