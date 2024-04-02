const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    setupMiddlewares: (middlewares, devServer)=>{
      if (!devServer) throw new Error("webpack-dev-server is not defined");
      const mockMiddleware = require("./mock/index.js");
      mockMiddleware(devServer.app);
      return middlewares;
    },
  },
  css: {
      loaderOptions: {
        scss: {
          additionalData: `@import "./src/style/variable.scss";`,
        }
    }
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
})
