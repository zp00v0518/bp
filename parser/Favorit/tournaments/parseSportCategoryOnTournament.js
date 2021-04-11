const { setInfoOnTournament, getTemplateTurnament } = require('../../methods');

async function parseSportCategoryOnTournament(page, item, config) {
  const { url } = item;
  let urls = [];
  try {
    page.on('response', async (response) => {
      const z = await responseCallback(response, item, config);
      if (!z) return;
      urls = z;
      page.close();
      // isGetData = true;
    });
    await page.goto(url, {
      waitUntil: 'networkidle2'
    });
    await page.waitForTimeout(20000);
  } catch (err) {
    if (
      err.name !== 'TimeoutError' &&
      err.message !== 'Navigation failed because browser has disconnected!'
    ) {
      console.log(err);
      console.log(`Проблема с ${item.url}`);
    }
  }
  setInfoOnTournament(urls, item);
  return urls;
}

async function responseCallback(response, item, config) {
  const req = response.request();
  const method = req._method;
  if (!method || method !== 'POST') return;
  const requestUrl = req._url;
  if (requestUrl !== config.response.api1) return;
  const reqData = JSON.parse(req._postData);
  if (reqData.method !== 'frontend/tournament/get') return;
  const data = await response.json();
  if (data && data.result) {

    const reg = /s\/sport/gi;
    const categoryUrl = item.url.replace(reg, 's/category');

    const result = data.result.map((tournament) => {
      const template = getTemplateTurnament();
      template.url = categoryUrl + tournament.category_id;
      template.name = tournament.tournament_name;
      return template;
    });
    return result;
  }
  return false;
}

module.exports = parseSportCategoryOnTournament;
