/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 10:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-23 11:44:28
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
export let CreateCategoryRelation = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateCategoryRelation',
    data: data
  })
};
export let DelCategoryRelation = (data = {}) => {
  return $flyio.post({
    url: '/api/DelCategoryRelation',
    data: data
  })
};
export let GetCategoryRelatedList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetCategoryRelatedList',
    data: data
  })
};
export let DelPlatforms = (data = {}) => {
  return $flyio.post({
    url: '/api/DelPlatforms',
    data: data
  })
};
//平台类目
export let CreateEcommerceCategory = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateEcommerceCategory',
    data: data
  })
};
export let UpdateEcommerceCategory = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateEcommerceCategory',
    data: data
  })
};
export let DelEcommerceCategory = (data = {}) => {
  return $flyio.post({
    url: '/api/DelEcommerceCategory',
    data: data
  })
};
export let GetEcommerceCategoryList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetEcommerceCategoryList',
    data: data
  })
};
export let GetEcommerceCategoryById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetEcommerceCategoryById',
    data: data
  })
};
//店铺管理
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
//分类管理
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
    url: '/api/DelCategory',
    data: data
  })
};
export let GetCategoryById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetCategoryById',
    data: data
  })
};
//新增制图选项关联
export let UpdateFileRelation = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateFileRelation',
    data: data
  })
};
export let GetFileRelationList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFileRelationList',
    data: data
  })
};
//品牌管理
export let CreateBrand = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateBrand',
    data: data
  })
};
export let UpdateBrand = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateBrand',
    data: data
  })
};
export let DelBrand = (data = {}) => {
  return $flyio.post({
    url: '/api/DelBrand',
    data: data
  })
};
export let GetBrandList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetBrandList',
    data: data
  })
};
export let GetBrandById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetBrandById',
    data: data
  })
};
//属性管理
export let CreateAttributes = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateAttributes',
    data: data
  })
};
export let UpdateAttributes = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateAttributes',
    data: data
  })
};
export let DelAttributes = (data = {}) => {
  return $flyio.post({
    url: '/api/DelAttributes',
    data: data
  })
};
export let GetAttributeList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetAttributeList',
    data: data
  })
};
export let GetAttributeById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetAttributeById',
    data: data
  })
};
export let BindAttributeCategory = (data = {}) => {
  return $flyio.post({
    url: '/api/BindAttributeCategory',
    data: data
  })
};
export let GetAttributeCategoryPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetAttributeCategoryPage',
    data: data
  })
};
//属性值管理
export let CreateAttributeValue = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateAttributeValue',
    data: data
  })
};
export let UpdateAttributeValue = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateAttributeValue',
    data: data
  })
};
export let DelAttributeValue = (data = {}) => {
  return $flyio.post({
    url: '/api/DelAttributeValue',
    data: data
  })
};
//菜单管理
export let CreateAuthModule = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateAuthModule',
    data: data
  })
};
export let UpdateAuthModule = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateAuthModule',
    data: data
  })
};
export let DeleteAuthModule = (data = {}) => {
  return $flyio.post({
    url: '/api/DeleteAuthModule',
    data: data
  })
};
export let AuthModuleList = (data = {}) => {
  return $flyio.post({
    url: '/api/AuthModuleList',
    data: data
  })
};
export let AuthModulePage = (data = {}) => {
  return $flyio.post({
    url: '/api/AuthModulePage',
    data: data
  })
};
export let GetUserRoleMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserRoleMenu',
    data: data
  })
};
export let UpdateMenuStatus = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateMenuStatus',
    data: data
  })
};
//角色管理
export let AuthRoleList = (data = {}) => {
  return $flyio.post({
    url: '/api/AuthRoleList',
    data: data
  })
};
export let CreateAuthRole = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateAuthRole',
    data: data
  })
};
export let UpdateAuthRole = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateAuthRole',
    data: data
  })
};
export let DeleteAuthRole = (data = {}) => {
  return $flyio.post({
    url: '/api/DeleteAuthRole',
    data: data
  })
};
export let UpdateRoleState = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateRoleState',
    data: data
  })
};
export let AuthRolePage = (data = {}) => {
  return $flyio.post({
    url: '/api/AuthRolePage',
    data: data
  })
};
export let GetUserRoleMenuById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserRoleMenuById',
    data: data
  })
};
export let UpdateUserRoleMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateUserRoleMenu',
    data: data
  })
};
export let DeleteUserRoleMenu = (data = {}) => {
  return $flyio.post({
    url: '/api/DeleteUserRoleMenu',
    data: data
  })
};
//系统设置
export let CreateSystemConfig = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateSystemConfig',
    data: data
  })
};
export let UpdateSysetmConfig = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateSysetmConfig',
    data: data
  })
};
export let GetSystemConfigPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetSystemConfigPage',
    data: data
  })
};
export let GetSystemConfigList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetSystemConfigList',
    data: data
  })
};
export let DelSystemConfig = (data = {}) => {
  return $flyio.post({
    url: '/api/DelSystemConfig',
    data: data
  })
};
export let GetSystemConfigById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetSystemConfigById',
    data: data
  })
};
//用户管理
export let CreateUserInfo = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateUserInfo',
    data: data
  })
};
export let UpdateUserInfo = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateUserInfo',
    data: data
  })
};
export let GetUserInfoById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserInfoById',
    data: data
  })
};
export let DelUserInfo = (data = {}) => {
  return $flyio.post({
    url: '/api/DelUserInfo',
    data: data
  })
};
export let GetUserInfoPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserInfoPage',
    data: data
  })
};
export let GetUserInfoList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetUserInfoList',
    data: data
  })
};
//模型管理
export let CreateWorkflowPackage = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateWorkflowPackage',
    data: data
  })
};
export let UpdateWorkflowPackage = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateWorkflowPackage',
    data: data
  })
};
export let DelWorkflowPackage = (data = {}) => {
  return $flyio.post({
    url: '/api/DelWorkflowPackage',
    data: data
  })
};
export let GetWorkflowPackagePage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowPackagePage',
    data: data
  })
};
export let GetWorkflowPackageById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowPackageById',
    data: data
  })
};
export let GetWorkflowPackageList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowPackageList',
    data: data
  })
};
//流程管理
export let CreateWorkflowClause = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateWorkflowClause',
    data: data
  })
};
export let UpdateWorkflowClause = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateWorkflowClause',
    data: data
  })
};
export let DelWorkflowClause = (data = {}) => {
  return $flyio.post({
    url: '/api/DelWorkflowClause',
    data: data
  })
};
export let GetWorkflowClausePage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowClausePage',
    data: data
  })
};
export let GetWorkflowClauseById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowClauseById',
    data: data
  })
};
export let GetWorkflowTemplateById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowTemplateById',
    data: data
  })
};
//物流管理
export let CreateLogistics = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateLogistics',
    data: data
  })
};
export let UpdateLogistics = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateLogistics',
    data: data
  })
};
export let DelLogistics = (data = {}) => {
  return $flyio.post({
    url: '/api/DelLogistics',
    data: data
  })
};
export let GetLogisticsPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetLogisticsPage',
    data: data
  })
};
export let GetLogisticsList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetLogisticsList',
    data: data
  })
};
export let GetLogisticsById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetLogisticsById',
    data: data
  })
};
//模板管理
export let CreateFreightTemplate = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateFreightTemplate',
    data: data
  })
};
export let UpdateFreightTemplate = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateFreightTemplate',
    data: data
  })
};
export let DelFreightTemplate = (data = {}) => {
  return $flyio.post({
    url: '/api/DelFreightTemplate',
    data: data
  })
};
export let GetFreightTemplatePage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFreightTemplatePage',
    data: data
  })
};
export let GetFreightTemplateList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFreightTemplateList',
    data: data
  })
};
export let GetFreightTemplateById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetFreightTemplateById',
    data: data
  })
};
//国家管理
export let CreateArea = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateArea',
    data: data
  })
};
export let UpdateArea = (data = {}) => {
  return $flyio.post({
    url: '/api/UpdateArea',
    data: data
  })
};
export let DelArea = (data = {}) => {
  return $flyio.post({
    url: '/api/DelArea',
    data: data
  })
};
export let GetAreaPage = (data = {}) => {
  return $flyio.post({
    url: '/api/GetAreaPage',
    data: data
  })
};
export let GetAreaList = (data = {}) => {
  return $flyio.post({
    url: '/api/GetAreaList',
    data: data
  })
};
export let GetAreaById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetAreaById',
    data: data
  })
};
//工作流保存
export let CreateWorkflow = (data = {}) => {
  return $flyio.post({
    url: '/api/CreateWorkflow',
    data: data
  })
};
export let GetWorkflowById = (data = {}) => {
  return $flyio.post({
    url: '/api/GetWorkflowById',
    data: data
  })
};