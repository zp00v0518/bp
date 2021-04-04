const parseConfig = {
  parseCount: 0,
  splitUrls: 2,
  browserConfig: {
    // devtools: true,
    // headless: false,
    args: ['--log-level="0"', '--window-size=1920,1070'],
    //   args: ['--window-size=1920,1070', '--window-position=-310,-1080']
    defaultViewport: null
  }
};

module.exports = parseConfig;
