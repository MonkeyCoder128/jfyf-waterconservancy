
module.exports = {
  lintOnSave: false,  // 取消lint语法检测，此处可不配置
  outputDir: "dist", // build打包输出目录
  assetsDir: process.env.NODE_ENV == 'production' ? "reservoir-web" : "", // 静态文件输出目录，基于dist
  indexPath: "index.html",  // 输出html文件名
  productionSourceMap: false, // 取消.map文件的打包，加快打包速度
  configureWebpack: (config) => {
    // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
    if (process.env.NODE_ENV !== 'production') return;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = false;	//生产环境去掉console.log
    return {  // 此处配置webpack.config.js的相关配置
      plugins: [],
      performance: {}
    };
  },

}