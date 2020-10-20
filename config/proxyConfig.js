/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-20 11:15:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-20 11:18:23
 */
let target = 'http://crossborder.erp.com';

module.exports = {
    proxy: {
        '/api/app': {
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api/app': '/api/app'
        }
        },
        '/api/abp': {
        target,
        changeOrigin: true,
        },

    }
  }
