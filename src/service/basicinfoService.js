/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-07 20:05:08
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
