/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-24 11:57:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-09 10:56:13
 */
export default {
    data() {
      return {
        // leftMenu:{},
        menuList: {
          'index': {
            name: '首页',
            value: 'index',
            children: [],
          },
          'basicinfo': {
            name: '基础信息',
            value: 'basicinfo',
            children: [
              {
                name: '分类管理',
                value: 'typeManager',
                auth: true,
              },
              {
                name: '属性管理',
                value: 'propertyManager',
                auth: false
              },
              {
                name: '品牌管理',
                value: 'brandManager',
                auth: false
              },
              {
                name: '平台管理',
                value: 'platformManager',
                auth: false
              },
              {
                name: '店铺管理',
                value: 'storeManager',
                auth: false,
                children: [
                    {
                        name: '添加店铺',
                        value: 'addStore',
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
            children: [],
          },
          'customer': {
            name: '客户管理',
            value: 'customer',
            children: [],
          },
          'authority': {
            name: '权限管理',
            value: 'authority',
            children: [
              {
                name: '菜单管理',
                value: 'menuManager',
                auth: false,    
              },
              {
                name: '用户管理',
                value: 'userManager',
                auth: false,    
              },
              {
                name: '角色管理',
                value: 'roleManager',
                auth: false,    
              }
            ]
          },
          'bpm': {
            name: '流程管理',
            value: 'bpm',
          },
        }
      };
    },
  };