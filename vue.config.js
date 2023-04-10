const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
     allowedHosts: 'all',
},
configureWebpack: {
  devtool: 'cheap-module-source-map'
},
  transpileDependencies: true
})
