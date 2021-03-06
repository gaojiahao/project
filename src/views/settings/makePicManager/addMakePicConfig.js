/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-30 19:06:14
 */
export default {
  data() {
    return {
      formConfig:{
        name:{
          name:'名称',
          type:'text',
        },
        code:{
          name:'编码',
          type:'text',
        },
        enabled:{
          name:'是否启用',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:true},
              {name:'否',value:false}
            ],
          }
        },
      },
      formValidate: {
        congfigType:'filetype',
        name: '',
        code:'',
        enabled:true
      },
      ruleValidate: {
        name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
        }],
        type: [{ 
          required: true, 
          message: '请选择类型', 
          trigger: 'change' 
        }],
      }, 
      filtersConfig:{
        storeName:{
          name:'店铺名称',
          value:'storeName',
          type:'text',
        }, 
        platFormName:{
          name:'平台名称',
          value:'platFormName',
          type:'text',
        },  
        name:{
          name:'负责人',
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
              {name:'已启用',value:'true'},
              {name:'未启用',value:'false'}
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