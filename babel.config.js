/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 09:33:05
 */
const plugins = [];
if(['production', 'prod'].includes(process.env.NODE_ENV)) {  
  plugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    "@vue/babel-preset-app",
    // ["@vue/app",{"useBuiltIns": "entry"}]
  ],
  plugins: plugins
};

// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"]
// };
