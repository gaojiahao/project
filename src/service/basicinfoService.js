/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-12 11:58:26
 */
import $flyio from '@plugins/ajax';
//新品开发管理
export let CreatePrepGoods = (data = {}) => {
  return $flyio.post({
    url: '/api/CreatePrepGoods',
    data: data
  })
};
export let UpdatePrepGoods = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdatePrepGoods',
    data: data
  })
};
export let DelPrepGoods = (data = {}) => {
  return $flyio.post({
    url: '/api/DelPrepGoods',
    data: data
  })
};
export let GetPrepGoodsPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPrepGoodsPage',
    data: data
  })
};
export let GetPrepGoodsById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPrepGoodsById',
    data: data
  })
};
export let InsertPic = (data = {}) => {
  return $flyio.post({
    url: '/api/InsertPic',
    data: data
  })
};
export let GetPrepGoodsAttributeById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPrepGoodsAttributeById',
    data: data
  })
};
export let UpdatePrepGoodsAttribute = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdatePrepGoodsAttribute',
    data: data
  })
};
export let GetOperationLogPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetOperationLogPage',
    data: data
  })
};
//添加商品销售信息
export let CraeteGoodsSupplier = (data = {}) => {
  return $flyio.post({
    url: '/api/CraeteGoodsSupplier',
    data: data
  })
};
//分页查询商品销售信息
export let GetGoodsSupplierPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetGoodsSupplierPage',
    data: data
  })
};
//供应商管理
export let CreateSupplier = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateSupplier',
    data: data
  })
};
export let UpdateSupplier = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateSupplier',
    data: data
  })
};
export let DelSupplier = (data = {}) => {
  return $flyio.post({
    url: '/api/DelSupplier',
    data: data
  })
};
export let GetSupplierPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetSupplierPage',
    data: data
  })
};
export let GetSupplierById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetSupplierById',
    data: data
  })
};
