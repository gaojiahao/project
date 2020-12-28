/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-28 09:45:10
 */
/* 基础信息接口 */
import $flyio from '@plugins/ajax';

// 获取平台列表
export let GetPlatformsPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPlatformsPage',
    data: data
  })
};
//新增平台
export let CreatePlatforms = (data = {}) => {
  return $flyio.post({
    url: '/api/CreatePlatforms',
    data: data
  })
};
//修改平台
export let UpdatePlatforms = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdatePlatforms',
    data: data
  })
};
//查询平台
export let GetPlatformsById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPlatformsById',
    data: data
  })
};
export let GetPlatformsList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetPlatformsList',
    data: data
  })
};
export let DelPlatforms = (data = {}) => {
  return $flyio.post({
    url: '/api/DelPlatforms',
    data: data
  })
};
export let CreateStore = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateStore',
    data: data
  })
};
export let UpdateStore = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateStore',
    data: data
  })
};
export let GetStorePage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetStorePage',
    data: data
  })
};
export let GetStoreById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetStoreById',
    data: data
  })
};
export let DelStore = (data = {}) => {
  return $flyio.post({
    url: '/api/DelStore',
    data: data
  })
};
export let GetCategoryList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetCategoryList',
    data: data
  })
};
export let CreateCategory = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateCategory',
    data: data
  })
};
export let UpdateCategory = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateCategory',
    data: data
  })
};
export let DelCategory = (data = {}) => {
  return $flyio.post({
    url: '/api//api/DelCategory',
    data: data
  })
};
export let GetCategoryById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetCategoryById',
    data: data
  })
};