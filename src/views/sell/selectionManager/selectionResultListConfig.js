/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 10:40:36
 */
export default {
    data() {
      const isMainVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
          if(value==false){
            callback();   
          } else {
            callback(new Error('请选择是否主推'));
          }
        } else {
          callback();
        }
      };
      const isSelectVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
          if(value==false){
            callback();   
          } else {
            callback(new Error('请选择选品状态'));
          }
        } else {
          callback();
        }
      };
      const remarkVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入备注'));
        } else {
          callback();
        }
      };
      return {
        // formConfig:{
        //   purchasePrice:{
        //     name:'被委派人',
        //     type:'select',
        //     dataSource:{
        //       type:'static',
        //       data:[
        //         {name:'李四',value:'001'},
        //         {name:'王五',value:'002'}
        //       ],
        //     }
        //   },
        // },
        formValidate: {
          isSelect:true,
          isMain:true,
          remark:'',
        },
        ruleValidate: {
          isSelect: [{
            required: true,
            message: '请选择选品状态',
            trigger: 'change',
            validator: isSelectVali,
          }],
          isMain: [{
            required: true,
            message: '请选择是否主推',
            trigger: 'change',
            validator: isMainVali,
          }],
          remark: [{
            required: true,
            type:'string',
            message: '请输入备注',
            trigger: 'blur',
            validator: remarkVali,
          }],
        }, 
        filtersConfig:{
            productCode:{
              name:'商品编号',
              value:'productType',
              type:'text',
            },
            productName:{
              name:'产品名称',
              value:'sku',
              type:'text',
            },  
            supplier:{
              name:'供应商',
              value:'color',
              type:'text',
            },
            recommendingOfficer:{
              name:'开发员',
              value:'producName',
              type:'text',
            },
            status:{
              name:'状态',
              value:'status',
              type:'radio',
              dataSource:{
                type:'static',
                data:[
                  {name:'是',value:'true'},
                  {name:'否',value:'false'}
                ],
              },
            },
        }
      }
    }
  }