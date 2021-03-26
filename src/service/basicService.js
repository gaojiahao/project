/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 18:54:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-26 15:16:17
 */
import $flyio from '@plugins/ajax';

//根据菜单
export let GetUserRoleMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserRoleMenu',
    data: data
  })
};
//审核查看信息审核常看需要客户端查询接口 
//GetReviewActionPage 传入审核类型 ReviewType 及关联ID  RelatedId 关联ID为产品主Id，
//类型为（推品审核=recommendGoodsReview，销售审核=salesReview，侵权审核=tortReview，派店审核=pieShopReview，制图审核=fileDistributionReview）
export let GetReviewActionPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetReviewActionPage',
    data: data
  })
};