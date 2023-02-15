const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api/.*': {
        target: 'localhost:3000',
        changeOrigin: true,
      },
      '^/static/.*':{
        target: 'localhost:3000',
        changeOrigin: true,
      },
    }
  }
});
