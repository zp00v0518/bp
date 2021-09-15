const { setInfoOnTournament } = require('../../methods');

async function parseSportCategoryOnTournament(page, item) {
  const { url } = item;
  const curUrl = url + '?interval=ALL_TIME&cpcids=all';
  let urls = [];
  try {
    await page.goto(curUrl, {
      waitUntil: 'domcontentloaded'
    });
    await page.waitForSelector('#events_content');
    urls = await page.$$eval('.category-label-link', (arr) => {
      const res = arr.map((el) => {
        const template = {
          url: el.href,
          name: el.textContent
        };
        return template;
      });
      return res;
    });
  } catch (err) {
    console.log(err);
  }
  setInfoOnTournament(urls, item)
  return urls;
}

module.exports = parseSportCategoryOnTournament;
