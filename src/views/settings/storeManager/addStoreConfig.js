/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 17:48:19
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
      const chargeIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择负责人'));
        } else {
          callback();
        }
      };
      return {
        formConfig:{
          name:{
            name:'店铺名称',
            type:'text',
          },
          // code:{
          //   name:'店铺代号',
          //   type:'text',
          //   hidden: true
          // },
          account:{
            name:'账号名称',
            type:'text',
          },
          login_Id:{
            name:'login_Id',
            type:'text',
          },
          app_Key:{
            name:'app_Key',
            type:'text',
          },
          app_Secret:{
            name:'app_Secret',
            type:'text',
          },
          remark:{
            name:'备注',
            type:'textarea',
          },
          chargeId:{
            name:'负责人',
            type:'select',
            isName:true,
            dataSource:{
              type:'dynamic',
              url:'/api/GetUserInfoList',
              data:[],
              col:[
                {k:'name',v:'userName'},
                {k:'value',v:'id'}
              ]
            },
          },
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
          storeUsers:{
            name:'成员',
            type:'selectorMulti',
            isName:true,
            dataSource:{
              type:'dynamic',
              url:'/api/GetUserInfoPage',
              data:[],
              col:[
                {k:'name',v:'userName'},
                {k:'value',v:'id'}
              ]
            },
            // bind:{
            //   target: 'attributeName',
            //   bindValue: 'name'
            // },
            proertyContext: {
              "dataSourceCols": [
                {
                  "title": "id",
                  "key": "value",
                  "hidden": true
                },
                {
                  "title": "名称",
                  "key": "name"
                },
              ]
            },
            valueField: "id",  //值字段
            displayField: "name", //显示字段
          },
          status:{
            name:'是否启用',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:1},
                {name:'否',value:0}
              ],
            }
          },
        },
        formValidate: {
          name: '',
          code:'',
          account: '',
          login_Id: '',
          app_Key:'',
          app_Secret:'',
          platformId:'',
          platformName:'',
          storeUsers:[],
          chargeId:'',
          status:1,
          remark:'',
          storeBinds:[]
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入店铺名称',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              message: '请输入店铺代码',
              trigger: 'blur'
          }],
          platformId: [{ required: true, message: '请选择平台名称',validator: platformIdVali, trigger: 'change' }],
          chargeId: [{ required: true, message: '请选择负责人',validator: chargeIdVali, trigger: 'change' }],
      }, 
      }
    },
    watch:{
      "formValidate.storeUsers":{
        handler(val){
          var config = {...this.formConfig};
          config['chargeId']['dataSource']['data']=this.formValidate.storeUsers;
          this.formConfig = config;
        }
      },
      deep:true,
      immediate:true
    },
  }