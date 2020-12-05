/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:37:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-05 12:07:43
 */
const os = require('os');
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const Happypack = require('happypack');
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length });
const CompressionWebpackPlugin = require('compression-webpack-plugin');
let proxyConfig = require("./config/proxyConfig");
const publicPath = "Rose";

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
      .end()
      // config.module
      // .rule("js")
      // .exclude
      //   .add('/node_modules/')
      //   .end()
      // .test(/\.js$/)
      // .use(['babel-loader', 'vue-loader', 'iview-loader','vue-router', 'vuex'])
      // .loader(['babel-loader', 'vue-loader', 'iview-loader','vue-router', 'vuex'])
      // .end();
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
      config.optimization= {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            exclude: /node_modules/,
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'], // 移除console
              },
            },
          }
        )],
      };
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
          new CompressionWebpackPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp(
                  '\\.(' + productionGzipExtensions.join('|') + ')$'
              ),
              threshold: 10240, // 只有大小大于该值的资源会被处理 10240
              minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
              deleteOriginalAssets: false // 删除原文件
          })
      );
      config.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    test: /node_modules/,
                    name: 'vendor',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100
                },
                common: {
                    chunks: 'all',
                    test: /[\\/]src[\\/]js[\\/]/,
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 60
                },
                styles: {
                    name: 'styles',
                    test: /\.(sa|sc|c)ss$/,
                    chunks: 'all',
                    enforce: true
                },
                runtimeChunk: {
                    name: 'manifest'
                }
            }
        }
      }
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
      config.plugins.push(
        new Happypack({
          loaders: ['babel-loader'],
          //threads: 5, // 线程数取决于你电脑性能的好坏，好的电脑建议开更多线程
          threadPool: happyThreadPool,
          verbose: true,
        })
      );
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".json", ".vue", ".css", ".less"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@assets": path.resolve(__dirname, "./src/assets"),
          "@components": path.resolve(__dirname, "./src/components"),
          "@service": path.resolve(__dirname, "./src/service"),
          "@views": path.resolve(__dirname, "./src/views"),
          "@css": path.resolve(__dirname, "./src/css"),
          "@plugins": path.resolve(__dirname, "./src/plugins"),
          "@less": path.resolve(__dirname, "./src/less"),
          "@mixins": path.resolve(__dirname, "./src/mixins"),
          "@utils": path.resolve(__dirname, "./src/utils")
        } // 别名配置
      },
      // optimization: {
      //   minimize: true,
      //   minimizer: [
      //     new TerserPlugin({
      //       parallel: true,
      //       exclude: /node_modules/,
      //       terserOptions: {
      //         ecma: undefined,
      //         warnings: false,
      //         parse: {},
      //         compress: {
      //           drop_console: true,
      //           drop_debugger: false,
      //           pure_funcs: ['console.log'], // 移除console
      //         },
      //       },
      //     }
      //   )],
      // },
    });
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: IS_PROD ? true:false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项
    loaderOptions: {
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
