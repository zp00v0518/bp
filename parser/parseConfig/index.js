const parseConfig = {
  parseCount: 1,
  splitUrls: 2,
  browserConfig: {
    devtools: true,
    headless: false,
    args: ['--log-level="0"'] ,
    defaultViewport: null
  }
};

module.exports = parseConfig;
