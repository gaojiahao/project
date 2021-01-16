/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-16 09:23:40
 */
export default {
  data() {
    const platformIdVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择平台名称'));
      } else {
        callback();
      }
    };
    const storeIdVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择店铺'));
      } else {
        callback();
      }
    };
    return {
      formConfig:{
        platformId:{
          name:'平台名称',
          type:'select',
          isName:true,
          dataSource:{
              type:'dynamic',
              url:'/api/GetPlatformsList',
              data:[],
          },
          bind:{
            target: 'platformName',
            bindValue: 'name'
          }
        },
        storeId:{
          name:'店铺名称',
          type:'select',
          isName:true,
          dataSource:{
              type:'dynamic',
              url:'/api/GetStoreList',
              data:[],
          },
          bind:{
            target: 'storeName',
            bindValue: 'name'
          }
        },
        remark:{
          name:'备注',
          type:'textarea',  
        },
      },
      formValidate: {
        platformId:'',
        platformName:'',
        storeId: '',
        storeName: '',
        remark:'',
      },
      ruleValidate: {
        platformId: [{ required: true, message: '请选择平台名称',validator: platformIdVali, trigger: 'change' }],
        storeId: [{
          required: true,
          message: '请选择店铺',
          trigger: 'change',
          validator: storeIdVali,
        }],
      },
      filtersConfig:{
        name:{
          name:'菜单名称',
          value:'name',
          type:'text',
        },  
        createTime:{
          name:'创建时间',
          value:'createTime',
          type:'dateTime',
        },
        status:{
          name:'状态',
          value:'status',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'已启用',value:true},
              {name:'未启用',value:false}
            ],
          },
        },
        modifyTime:{
          name:'修改时间',
          value:'modifyTime',
          type:'dateTime',
        },
        creater:{
          name:'创建者',
          value:'creater',
          type:'text',
        },
        modifyer:{
          name:'修改者',
          value:'modifyer',
          type:'text',
        },
      }
    }
  }
}