const hrefs = [];
tournamentPage.on('response', async (response) => {
  try {
    const req = response.request();
    if (
      req._method !== 'POST' ||
      req._url !== 'https://www.favorit.com.ua/frontend_api2/'
    )
      return;
    const reqData = JSON.parse(req._postData);

    if (
      !reqData.params ||
      !reqData.params.by ||
      !reqData.params.by.category_id
    )
      return;
    const data = await response.json();
    const eventsData = data.result;
    eventsData.length = 3;

  } catch (err) {
    console.log(`Проблема с урлом: ${url}`);
  }
});