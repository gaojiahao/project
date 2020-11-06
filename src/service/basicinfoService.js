/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-05 15:18:27
 */
/* 基础信息接口 */
import $flyio from '@plugins/ajax';

// 获取平台列表
export let getEcommercePlatformList = (data = {}) => {
  return $flyio.ajax({
    url: '/api/app/ecommercePlatform',
    data: {}
  })
};
//新增平台
export let addEcommercePlatform = (data = {}) => {
  return $flyio.post({
    url: '/api/app/ecommercePlatform',
    data: data
  })
};