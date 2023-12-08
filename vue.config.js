
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    entry: "./src/main.js",
    devServer: {
        hot: true,
        allowedHosts: "all"
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
},
};
