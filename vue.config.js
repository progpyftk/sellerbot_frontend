const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    public: '0.0.0.0:8080',
    disableHostCheck: true,
 },

 devServer: {
  client: {
    webSocketURL: 'ws://0.0.0.0:8080/ws',
  },
},





  

});
