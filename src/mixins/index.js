/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-24 11:57:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 17:13:01
 */
export default {
    data() {
      return {
        // leftMenu:{},
        menuList: {
          'index': {
            name: '工作台',
            value: 'index',
            status: true,
            children: [],
          },
          'settings': {
            name: '系统设置',
            value: 'settings',
            status: true,
            children: [
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
                name: '制图选项管理',
                value: 'makePicManager',
                status: true,
                auth: false
              },
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
              },
              {
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
            ],
            auth: '',
          },
          'basicInfo':{
            name: '基础资料',
            value: 'basicInfo',
            status: true,
            children: [
              {
                name: '新品开发管理',
                value: 'developNewProducts',
                status: true,
                // children: [
                //   {
                //     name: '新建新品',
                //     value: 'addNewProduct',
                //     status: true,     
                //   },
                // ],   
              },
              {
                name: '产品管理',
                value: 'productManager',
                status: true,
                children: []
              },
              {
                name: '供应商管理',
                value: 'supplierManager',
                status: true,
              },
              {
                name: '客户管理',
                value: 'customerManager',
                status: true,
              }
            ]
          },
          'sell': {
            name: '销售管理',
            value: 'sell',
            status: true,
            children: [
              {
                name: '选品管理',
                value: 'selectionManager',
                status: true,  
                children:[
                  {
                    name: '选品结果',
                    value: 'selectionResultList',
                    status: true,
                  }  
                ]
              },
              {
                name: '销售推品',
                value: 'sellManager',
                status: true,
                children: [
                  {
                    name: '新建推品',
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
                name: '主推调研',
                value: 'mainResearch',
                status: true,
                children: [
                  {
                    name: '调研结果',
                    value: 'researchResult',
                    status: true,     
                  },
                ],   
              }
            ],
          },
          'examine':{
            name: '审核管理',
            value: 'examine',
            status: true,
            children: [
              {
                name: '派店审核',
                value: 'appointStoreExamine',
                status: true,
                children:[
                  {
                    name: '产品派店',
                    value: 'productAppointStore',
                    status: true,
                  }  
                ]
              }
            ]
          }  
        }
      };
    },
  };