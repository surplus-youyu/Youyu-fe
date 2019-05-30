const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
// const apiMocker = require('webpack-api-mocker');

const lessGlobalVarsString = fs.readFileSync(
  'src/global-variables.less',
  'utf8'
);
fs.writeFileSync(
  'src/global-variables.ts',
  `/* tslint:disable */\nexport default ${JSON.stringify(
    lessToJs(lessGlobalVarsString, {
      resolveVariables: true,
      stripPrefix: true
    })
  )};`,
  'utf8'
);

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options =>
        merge(options, {
          getCustomTransformers: () => ({
            before: [
              require('ts-import-plugin')([
                // {
                //   libraryName: 'element-ui',
                //   styleLibraryName: 'theme-chalk'
                // },
                {
                  style: false,
                  libraryName: 'lodash',
                  libraryDirectory: null,
                  camel2DashComponentName: false
                }
              ])
            ]
          })
        })
      );
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: lessToJs(lessGlobalVarsString),
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: 'http://193.112.59.226:8888'
    // before(app) {
    //   if (process.env.MOCK_DATA) {
    //     apiMocker(app, path.resolve(__dirname, './mock/index.js'));
    //   }
    // }
  }
};
