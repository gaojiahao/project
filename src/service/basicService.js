/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 18:54:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-08 14:30:40
 */
import $flyio from '@plugins/ajax';

//根据菜单
export let GetUserRoleMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserRoleMenu',
    data: data
  })
};
