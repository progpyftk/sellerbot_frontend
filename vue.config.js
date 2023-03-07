const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    public: '<docker_host_external_ip>:8080',
  },
  
});
