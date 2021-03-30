/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-14 10:49:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 12:15:16
 */
import $flyio from '@plugins/ajax';
//销售推品
export let CreateRecommendGoods = (data = {}) => {
    return $flyio.post({
      url: '/api/CreateRecommendGoods',
      data: data
    })
};
export let UpdateRecommendGoods = (data = {}) => {
    return $flyio.post({
      url: '/api/UpdateRecommendGoods',
      data: data
    })
};
export let DelRecommendGoods = (data = {}) => {
    return $flyio.post({
      url: '/api/DelRecommendGoods',
      data: data
    })
};
export let GetRecommendGoodsPage = (data = {}) => {
    return $flyio.post({
      url: '/api/GetRecommendGoodsPage',
      data: data
    })
};
export let GetRecommendGoodsById = (data = {}) => {
    return $flyio.post({
      url: '/api/GetRecommendGoodsById',
      data: data
    })
};
//选品管理
export let CreateGoodsSelection = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateGoodsSelection',
    data: data
  })
};
export let GetGoodsSelectionPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsSelectionPage',
    data: data
  })
};
//通用审核接口
export let CreateReviewAction = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateReviewAction',
    data: data
  })
};
//产品派店
export let CreatePieShop = (data = {}) => {
  return $flyio.post({
    url: '/api/CreatePieShop',
    data: data
  })
};
export let GetPieShopPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPieShopPage',
    data: data
  })
};
export let GetPieShopById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPieShopById',
    data: data
  })
};
//订单管理
export let CreateAliExpressOrder = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateAliExpressOrder',
    data: data
  })
};
export let UpdateAliExpressOrder = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateAliExpressOrder',
    data: data
  })
};
export let AliExpressOrderByID = (data = {}) => {
  return $flyio.post({
    url: '/api/AliExpressOrderByID',
    data: data
  })
};
export let DeleteAliExpressOrder = (data = {}) => {
  return $flyio.post({
    url: '/api/DeleteAliExpressOrder',
    data: data
  })
};
export let AliExpressOrderList = (data = {}) => {
  return $flyio.post({
    url: '/api/AliExpressOrderList',
    data: data
  })
};
export let AliExpressOrderPage = (data = {}) => {
  return $flyio.post({
    url: '/api/AliExpressOrderPage',
    data: data
  })
};
export let ImportAliExpressOrder = (data = {}) => {
  return $flyio.post({
    url: '/api/ImportAliExpressOrder',
    data: data
  })
};
export let ExportAliExpressOrder = (data = {}) => {
  return $flyio.post({
    url: '/api/ExportAliExpressOrder',
    data: data,
    responseType:'blob'
  })
};
//上架管理
export let GetShelvesGoodsPage  = (data = {}) => {
  return $flyio.post({
    url: '/api/GetShelvesGoodsPage ',
    data: data
  })
};
export let UpdatePrepGoods  = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdatePrepGoods ',
    data: data
  })
};