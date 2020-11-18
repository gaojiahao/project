/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:37:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-18 16:32:37
 */
const { endianness } = require("os");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const loader = require("sass-loader");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const productionGzipExtensions = ["js", "css"];
const Happypack = require('happypack');
let proxyConfig = require("./config/proxyConfig");

const CompressionWebpackPlugin = require('compression-webpack-plugin')

const publicPath = "Rose";
const compress = new CompressionWebpackPlugin(
  {
    filename: info => {
      return `${info.path}.gz${info.query}`
    },
    algorithm: 'gzip', 
    threshold: 10240,
    test: new RegExp(
      '\\.(' +
      ['js'].join('|') +
      ')$'
    ),
    minRatio: 0.8,
    deleteOriginalAssets: false
  }
 )
module.exports = {
  publicPath: `/${publicPath}`, // 基本路径`/${publicPath}`
  outputDir: "dist", // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        extractCSS: IS_PROD ? true : false // 把vue的css提取到单独的文件，默认
      })
      .end()
      .use("iview")
      .loader("iview-loader")
      .options({ prefix: false })
      .end();
      //分割代码
    //压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //       bypassOnDebug: true
    //   })
    //   .end()
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      config.plugins.push(compress);
      config.optimization.splitChunks({
        chunks: 'all'
      });
      config.optimization.minimize(true);
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    config.plugins.push(
      new Happypack({
        loaders: ['babel-loader', 'vue-loader', 'iview-loader','vue-router', 'vuex',],
        threads: 5 // 线程数取决于你电脑性能的好坏，好的电脑建议开更多线程
      })
    );
    // config.plugins.push(compress);
    //   config.optimization.splitChunks({
    //     chunks: 'all'
    //   });
    // config.optimization.minimize(true);
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".json", ".vue", ".scss", ".css", ".less"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@assets": path.resolve(__dirname, "./src/assets"),
          "@components": path.resolve(__dirname, "./src/components"),
          "@service": path.resolve(__dirname, "./src/service"),
          "@views": path.resolve(__dirname, "./src/views"),
          "@scss": path.resolve(__dirname, "./src/scss"),
          "@css": path.resolve(__dirname, "./src/css"),
          "@plugins": path.resolve(__dirname, "./src/plugins"),
          "@less": path.resolve(__dirname, "./src/less"),
          "@mixins": path.resolve(__dirname, "./src/mixins"),
          "@utils": path.resolve(__dirname, "./src/utils")
        } // 别名配置
      },
      // optimization: {
      //   minimizer: [
      //     new UglifyJsPlugin({
      //       uglifyOptions: {
      //         output: { // 删除注释
      //           comments: false
      //         },
      //         //生产环境自动删除console
      //         compress: {
      //           //warnings: false, // 若打包错误，则注释这行
      //           drop_debugger: true,  //清除 debugger 语句
      //           drop_console: true,   //清除console语句
      //           pure_funcs: ['console.log']
      //         }
      //       },
      //       sourceMap: false,
      //       parallel: true,
      //       cache: true
      //     })
      //   ]
      // },
      // plugins: [
      //   new CompressionWebpackPlugin({
      //     filename: "[path].gz[query]",
      //     algorithm: 'gzip', 
      //     threshold: 10240,
      //     test: new RegExp(
      //       '\\.(' +
      //       ['js'].join('|') +
      //       ')$'
      //     ),
      //     minRatio: 0.8,
      //     deleteOriginalAssets: false
      //   })
      // ] 
    });
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "@scss/base.scss";`
      },
      less: {
        javascriptEnabled: true
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    // hot:true,
    // open : true,
    // port : 8080,
    // host : "0.0.0.0",
    proxy: {
      //配置跨域
      "/api": {
        target: "http://crossborder.erp.com", //这里后台的地址模拟的;应该填写你们真实的后台接口
        //ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "/api" //请求的时候使用这个api就可以
        }
      },
      "/posts": {
        target: "http://jsonplaceholder.typicode.com", //这里后台的地址模拟的;应该填写你们真实的后台接口
        //ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/posts": "/posts" //请求的时候使用这个api就可以
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, './src/less/common.less')
      ]
    }
  }
};
