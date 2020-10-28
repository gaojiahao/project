/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-24 11:57:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 14:40:51
 */
export default {
    data() {
      return {
        leftMenu:{},
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
                        value: 'addSotre',
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
        }
      };
    },
    created() {
        var storage = window.sessionStorage;
        var activeMenu =  JSON.parse(storage.getItem("activeMenu"));
        if(activeMenu&&activeMenu.oneLevel){  
          this.leftMenu = activeMenu;
        } else {
          var data = {};
          data['oneLevel'] = this.menuList['index'];
          this.leftMenu = data;
          storage.setItem("activeMenu", JSON.stringify(data));
        }
    },
  };