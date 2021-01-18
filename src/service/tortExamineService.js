/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-14 10:49:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 10:56:53
 */
import $flyio from '@plugins/ajax';
//分页获取产品审核/销售审核/侵权审核
export let GetGoodsReviewPage = (data = {}) => {
    return $flyio.post({
      url: '/api/GetGoodsReviewPage',
      data: data
    })
};
export let CreateReviewAction = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateReviewAction',
    data: data
  })
};
//制图委派
export let CreateFileDistribution = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateFileDistribution',
    data: data
  })
};
export let UpdateFileDistribution = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateFileDistribution',
    data: data
  })
};
export let DelFileDistribution = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateFileDistribution',
    data: data
  })
};
export let GetFileDistributionPage = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateFileDistribution',
    data: data
  })
};