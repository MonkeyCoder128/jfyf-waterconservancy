
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
  // publicPath: "reservoir-web", // 公共路径 默认为"/"，建议使用"./"相对路径
  devServer: {   // 本地服务器配置(npm run serve)
    port: 8000, // 端口
    host: "localhost", // 域名
    https: false, // 是否开启https
    open: true,	// 是否在开启服务器后自动打开浏览器访问该服务器 
    proxy: {
      '/api': {
        target: 'http://112.125.88.230/jfyf', //测试服务器
        // target: 'http://10.1.5.203:8000/jfyf', //杨磊
        // target: 'http://10.1.5.156:8000/jfyf', //孙少鹏
        //target: 'http://10.1.5.37/jfyf', //荆蔚杰
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        ws: false
      }
    },
  },
}