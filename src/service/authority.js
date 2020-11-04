/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 18:54:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-03 19:43:25
 */
import $flyio from '@plugins/ajax';

//新增菜单
export let addMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/app/module',
    data: data
  })
};