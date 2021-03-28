async function getCategoryUrls(browser, url) {
  const categoryPage = await browser.newPage();
  let result = [];
  try {
    await categoryPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    await categoryPage.waitForSelector('ul#sports');
    const pageFrame = categoryPage.mainFrame();
    result = await pageFrame.$eval('ul#sports', async (elem) => {
      const elems = elem.querySelectorAll('a');
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
  const removeList = ['zhenshhiny'];
  return arr.filter((url) => {
    let flag = false;
    flag = removeList.some((removeItem) => url.includes(removeItem));
    return !flag;
  });
}

module.exports = getCategoryUrls;
