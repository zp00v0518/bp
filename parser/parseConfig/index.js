const parseConfig = {
  parseCount: 0,
  splitUrls: 3,
  browserConfig: {
    defaultViewport: null,
    // args: ['--window-size=1920,1070'], // размер имеет значение
    devtools: true,
    headless: false,
    args: ['--window-size=1920,1070', '--window-position=-310,-1080', '--log-level="1"']
  }
};

module.exports = parseConfig;
