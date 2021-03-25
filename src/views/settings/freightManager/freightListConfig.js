/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 17:27:46
 */
export default {
  data() {
    return {
      filtersConfig:{
        sumName:{
          name:'汇总地区名称',
          value:'sumName',
          type:'text',
        }, 
        sumCode:{
          name:'汇总地区简称',
          value:'sumCode',
          type:'text',
        },  
        isElectrified:{
          name:'是否带电',
          value:'isElectrified',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:true},
              {name:'否',value:false}
            ],
          } 
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