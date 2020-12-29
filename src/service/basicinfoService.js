/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-29 14:44:40
 */
import $flyio from '@plugins/ajax';

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
