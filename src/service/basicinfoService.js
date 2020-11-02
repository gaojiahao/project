/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-31 10:24:36
 */
/* 基础信息接口 */
import $flyio from '@plugins/ajax';

// 获取评论列表(PC)
export let getEcommercePlatformList = (data = {}) => {
  return $flyio.ajax({
    url: '/api/app/ecommercePlatform',
    data: {}
  })
};