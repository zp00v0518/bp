const { setInfoOnTournament, getTemplateTurnament } = require('../../methods');
const utils = require('../../utils');

const pageFuncs = {
  getTemplateTurnament
};
async function parseSportCategoryOnTournament(page, item) {
  const { url } = item;
  const curUrl = url;
  let urls = [];
  try {
    await page.goto(curUrl, {
      waitUntil: 'networkidle2'
    });
    const containerSelector = '[data-id="countries-list"]';
    await page.waitForSelector(containerSelector);
    await page.addScriptTag({ content: `${utils.parseWithFunction}` });
    await page.addScriptTag({ content: `${getTemplateTurnament.toString()}` });
    const rows = await page.$$('[data-id^="country-id"]');
    for (const item of rows) {
      let id = await item.evaluate((node) => node.dataset.id);
      try {
        await item.click();
        const itemSelector = `[data-id="${id}"]`;
        await page.waitForSelector(itemSelector);
        const itemUrls = await page.$eval(
          itemSelector,
          (node, stringFuncs) => {
            console.clear();
            const pageFuncs = window.parseWithFunction(stringFuncs);
            const name_tournament = node.innerText.split('\n')[0];
            // const links = node.querySelectorAll('a[href');
            const links = node.nextElementSibling.querySelectorAll('a[href');
            const res = Array.from(links).map((el) => {
              const template = pageFuncs.getTemplateTurnament();
              template.url = el.href;
              template.name = `${name_tournament} | ${el.innerText}`;
              template.name = template.name.trim();
              return template;
            });
            return res;
          },
          utils.stringifyWithFunc(pageFuncs)
        );
        urls.push(...(itemUrls || []));
      } catch (error) {
        console.log(error);
      }
    }
  } catch (err) {
    console.log(err);
  }
  setInfoOnTournament(urls, item);
  return urls;
}

module.exports = parseSportCategoryOnTournament;
