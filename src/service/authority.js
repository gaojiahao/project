/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 18:54:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-04 11:18:49
 */
import $flyio from '@plugins/ajax';

//新增菜单
export let addMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/app/module',
    data: data
  })
};

//获取菜单
export let getMenuList = (data = {}) => {
  return $flyio.ajax({
    url: '/api/app/module/paged',
    data: data
  })
};