async function getCategoryUrls(browser, url) {
  const categoryPage = await browser.newPage();
  let result = [];
  try {
    await categoryPage.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 50000
    });

    await categoryPage.waitForSelector('.SportsCategoriesMenu_wrapper__35tdM');
    const pageFrame = categoryPage.mainFrame();
    const allCategory = await pageFrame.$eval(
      '.Categories_container__1K7kU',
      async (elem) => {
        const elems = elem.querySelectorAll('.Categories_categoryLink__3e_ND');
        const hr = Array.from(elems).map((i) => i.href);
        return hr;
      }
    );
    const footballLink = allCategory[3];
    await categoryPage.goto(footballLink, {
      waitUntil: 'networkidle2',
      timeout: 50000
    });
    result = removeSomeUrls(allCategory);
  } catch (err) {
    console.log(err);
    categoryPage.close();
    return result;
  }
  categoryPage.close();
  return result;
}

function removeSomeUrls(arr) {
  const y = arr.splice(2);
  return y;
}

module.exports = getCategoryUrls;
