/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 14:42:31
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
        // orderCode:{
        //   name:'订单号',
        //   value:'orderCode',
        //   type:'text',
        // },
        // warehouse:{
        //   name:'仓库',
        //   value:'warehouse',
        //   type:'text',
        // },
        // buyerName:{
        //   name:'买家姓名',
        //   value:'buyerName',
        //   type:'text',
        // },
        sumAreaCode:{
          name:'国家/地区',
          type:'select',
          dataSource:{
            type:'dynamic',
            url:'/api/GetAreaList',
            data:[],
            col:[
              {k:'name',v:'abbreviation'},
              {k:'value',v:'abbreviation'}
            ]
          },
          displayField: "chinaName", //显示字段
        },
        createdTime:{
          name:'创建时间',
          value:'createdTime',
          type:'dateTime',
        },
        // modifyTime:{
        //   name:'修改时间',
        //   value:'modifyTime',
        //   type:'dateTime',
        // },
        // creater:{
        //   name:'创建者',
        //   value:'creater',
        //   type:'text',
        // },
        // modifyer:{
        //   name:'修改者',
        //   value:'modifyer',
        //   type:'text',
        // },
      }
    }
  }
}