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
    const containerSelector = '#z_contentw #sports'
    await page.waitForSelector(containerSelector);
    await page.addScriptTag({ content: `${utils.parseWithFunction}` });
    urls = await page.$$eval(
      containerSelector + ' li a',
      (arr, stringFuncs) => {
        console.clear();
        const pageFuncs = window.parseWithFunction(stringFuncs);
        console.dir(arr);
        const res = arr.map((el) => {
          const template = pageFuncs.getTemplateTurnament();
          template.url = el.href,
          template.name = el.textContent
          return template;
        });
        return res;
      },
      utils.stringifyWithFunc(pageFuncs)
    );
  } catch (err) {
    console.log(err);
  }
  setInfoOnTournament(urls, item);
  return urls;
}

module.exports = parseSportCategoryOnTournament;
