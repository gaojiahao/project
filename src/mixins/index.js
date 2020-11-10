/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-24 11:57:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-10 12:31:25
 */
export default {
    data() {
      return {
        // leftMenu:{},
        menuList: {
          'index': {
            name: '首页',
            value: 'index',
            status: true,
            children: [],
          },
          'basicinfo': {
            name: '基础信息',
            value: 'basicinfo',
            status: true,
            children: [
              {
                name: '分类管理',
                value: 'typeManager',
                status: true,
                auth: true,
              },
              {
                name: '属性管理',
                value: 'propertyManager',
                status: true,
                auth: false
              },
              {
                name: '品牌管理',
                value: 'brandManager',
                status: true,
                auth: false
              },
              {
                name: '平台管理',
                value: 'platformManager',
                status: true,
                auth: false
              },
              {
                name: '店铺管理',
                value: 'storeManager',
                status: true,
                auth: false,
                children: [
                    {
                        name: '添加店铺',
                        value: 'addStore',
                        status: true,
                        auth: false,    
                    }
                ]
              },
            ],
            auth: '',
          },
          'product': {
            name: '产品管理',
            value: 'product',
            status: true,
            children: [
              {
                name: '销售推品',
                value: 'sell',
                status: true,
                children: [
                  {
                    name: '新建成品',
                    value: 'addFinishProduct',
                    status: true,     
                  },
                  {
                    name: '推荐审核意见',
                    value: 'recommendAuditOpinion',
                    status: true,     
                  },
                ], 
              },
              {
                name: '开发新品',
                value: 'developNewProducts',
                status: true,
                children: [
                  {
                    name: '新建新品',
                    value: 'addNewProduct',
                    status: true,     
                  },
                ],   
              }
            ],
          },
          'customer': {
            name: '客户管理',
            value: 'customer',
            status: true,
            children: [],
          },
          'authority': {
            name: '权限管理',
            value: 'authority',
            status: true,
            children: [
              {
                name: '菜单管理',
                value: 'menuManager',
                status: true,
                auth: false,    
              },
              {
                name: '用户管理',
                value: 'userManager',
                status: true,
                auth: false,    
              },
              {
                name: '角色管理',
                value: 'roleManager',
                status: true,
                auth: false,    
              }
            ]
          },
          'bpm': {
            name: '流程管理',
            value: 'bpm',
            status: true,
            children: [
              {
                name: '新建流程',
                value: 'saveBpm',
                status: true,
                children: [],
              },
              {
                name: '更新流程',
                value: 'updataBpm',
                status: false,
                children: [],
              }
            ],
          },
        }
      };
    },
  };