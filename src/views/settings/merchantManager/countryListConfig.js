/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-25 12:24:48
 */
export default {
  data() {
    return {
      filtersConfig:{
        name:{
          name:'商户名称',
          value:'name',
          type:'text',
        }, 
        code:{
          name:'商户号',
          value:'code',
          type:'text',
        },  
        authCode:{
          name:'商编',
          value:'authCode',
          type:'text',
        },
        chargeUser:{
          name:'负责人',
          value:'chargeUser',
          type:'text',
        },
        telePhone:{
          name:'联系电话',
          value:'telePhone',
          type:'text',
        },
        address:{
          name:'联系地址',
          value:'address',
          type:'text',
        },
        enabled:{
          name:'是否启用',
          value:'enabled',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:true},
              {name:'否',value:false}
            ],
          },
        },
        createdName:{
          name:'创建者',
          value:'createdName',
          type:'text',
        },
        createdOn:{
          name:'创建日期',
          value:'createdOn',
          type:'dateTime',
        },
        modifyName:{
          name:'修改者',
          value:'modifyName',
          type:'text',
        },
        modifyOn:{
          name:'修改时间',
          value:'modifyOn',
          type:'dateTime',
        },
      }
    }
  }
}