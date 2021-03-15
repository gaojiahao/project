/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-14 10:49:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 19:11:57
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
    url: '/api/UpdateFileDistribution',
    data: data
  })
};
export let DelFileDistribution = (data = {}) => {
  return $flyio.post({
    url: '/api/DelFileDistribution',
    data: data
  })
};
export let GetFileDistributionPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFileDistributionPage',
    data: data
  })
};
export let GetFileDistributionById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFileDistributionById',
    data: data
  })
};
export let GetFileDistributionInfo = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFileDistributionInfo',
    data: data
  })
};
export let GetDistributionPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetDistributionPage',
    data: data
  })
};
//侵权审核
export let CreateGoodsTort = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateGoodsTort',
    data: data
  })
};
export let GetGoodsTortReviewPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsTortReviewPage',
    data: data
  })
};
export let GetGoodsTortById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsTortById',
    data: data
  })
};
export let GetPlatfromOptional = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPlatfromOptional',
    data: data
  })
};
//选品审核
export let GetGoodsSelectionReviewPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsSelectionReviewPage',
    data: data
  })
};
//派店审核列表
export let GetPieShopReviewPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPieShopReviewPage',
    data: data
  })
};
//美工制图
export let CreateGoodsFile = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateGoodsFile',
    data: data
  })
};
export let UpdateGoodsFile = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateGoodsFile',
    data: data
  })
};
export let DelGoodsFile = (data = {}) => {
  return $flyio.post({
    url: '/api/DelGoodsFile',
    data: data
  })
};
export let GetGoodsFilePage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsFilePage',
    data: data
  })
};
export let GetGoodsFileById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsFileById',
    data: data
  })
};
export let GetDistributionAndRelation = (data = {}) => {
  return $flyio.post({
    url: '/api/GetDistributionAndRelation',
    data: data
  })
};