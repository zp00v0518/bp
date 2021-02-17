const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const mode = process.env.APP_MODE;

module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: (config) => {
    config.plugins.delete('pwa');
    config.plugins.delete('workbox');
  },
  outputDir: path.resolve(__dirname, './frontend/app'),
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/style/variables.scss";
        @import "@/assets/style/mixins.scss";
        `
      }
    }
  }
  // pages: {
  //   app: {
  //     entry: 'src/main.js',
  //     template: `frontend/${mode}.html`
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.plugin('html').use(HtmlWebpackPlugin).tap(() => {
  //     return [{ template: `frontend/${mode}.html` }];
  //   });
  // }
};
