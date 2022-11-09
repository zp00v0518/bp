const { setInfoOnTournament, getTemplateTurnament } = require('../../methods');

class Callback {
  constructor(config) {
    this.config = config;
    this.sportData = [];
    this.categoryData = [];
    this.path = {
      sport: 'frontend/sport/get',
      tournament: 'frontend/tournament/get',
      category: 'frontend/category/get'
    };
    this.reqData = null;
  }
  async handlerResponse(response, item) {
    if (!this.checkHandler(response)) return false;
    const { reqData, path } = this;
    const method = reqData.method;
    if (!Object.values(path).includes(method)) return false;
    if (method === path.sport) await this.getSportData(response);
    if (method === path.tournament && reqData?.params?.by?.service_id === 0) {
      const result = await this.getTournaments(response, item);
      return result;
    }
    if (method === path.category) await this.getCategoryData(response);
    return false;
  }
  checkHandler(response) {
    const req = response.request();
    const method = req._method;
    if (!method || method !== 'POST') return;
    const requestUrl = req._url;
    if (requestUrl !== this.config.response.api1) return;
    try {
      const reqData = JSON.parse(req._postData);
      this.reqData = reqData;
      return true;
    } catch (err) {
      return false;
    }
  }
  async getSportData(response) {
    const d = await response.json();
    this.sportData = d.result;
  }
  async getCategoryData(response) {
    const d = await response.json();
    this.categoryData = d.result;
  }
  async getTournaments(response, item) {
    const data = await response.json();
    if (data && data.result) {
      const { categoryData } = this;
      const reg = /s\/sport/gi;
      const categoryUrl = item.url.replace(reg, 's/category');
      const result = data.result.map((tournament) => {
        const { category_id } = tournament;
        const categoryItem = categoryData.find(
          (i) => i.category_id === category_id
        );
        const template = getTemplateTurnament();
        template.url = categoryUrl + tournament.category_id;
        template.name =
          categoryItem.category_name + ' ' + tournament.tournament_name;
        return template;
      });
      return result;
    }
  }
}
async function parseSportCategoryOnTournament(page, item, config) {
  const { url } = item;
  let urls = [];
  try {
    const callback = new Callback(config);

    page.on('response', async (response) => {
      const z = await callback.handlerResponse(response, item);
      // const z = await responseCallback(response, item, config);
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
  try {
    const reqData = JSON.parse(req._postData);
    if (reqData.method === 'frontend/sport/get') {
      const d = await response.json();
      sportData = d.result;
    }
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
  } catch (err) {
    console.log(err);
  }

  return false;
}

module.exports = parseSportCategoryOnTournament;
