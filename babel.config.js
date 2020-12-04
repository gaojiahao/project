/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 15:03:24
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins:[
    ["import",{
        "libraryName": "iview",
        "libraryDirectory": "src/components",
        "style": true
      }
    ]
  ]
};
