/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-02 10:36:13
 */
export default {
  data() {
    return {
      formConfig:{
        shenhe:{
          name:'开发',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:'true'},
              {name:'否',value:'false'}
            ],
          }
        },
      },
      formValidate: {
        shenhe:'',
      },
      ruleValidate: {
        shenhe: [{ 
          required: true, 
          message: '请选择开发', 
          trigger: 'change' 
        }],
      },
      formConfig2:{
        shenhe:{
          name:'审核',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'同意',value:'true'},
              {name:'不同意',value:'false'}
            ],
          }
        },
      },
      formValidate2: {
        shenhe:'',
      },
      ruleValidate2: {
        shenhe: [{ 
          required: true, 
          message: '请审核', 
          trigger: 'change' 
        }],
      },
      filtersConfig:{
        name:{
          name:'产品名称',
          value:'name',
          type:'text',
        },
        code:{
          name:'产品编码',
          value:'code',
          type:'text',
        },
        productType:{
          name:'类目',
          value:'productType',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'积木',value:'001'},
              {name:'灯',value:'002'}
            ],
          },
        },
        createTime:{
          name:'创建时间',
          value:'createTime',
          type:'dateTime',
        },
        recommendingOfficer:{
          name:'推荐人员',
          value:'recommendingOfficer',
          type:'text',
        },
        status:{
          name:'状态',
          value:'status',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'已审核',value:'true'},
              {name:'未审核',value:'false'}
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