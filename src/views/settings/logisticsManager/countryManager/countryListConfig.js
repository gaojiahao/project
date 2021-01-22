/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 14:49:25
 */
export default {
  data() {
    return {
      filtersConfig:{
        longName:{
          name:'全称',
          value:'longName',
          type:'text',
        }, 
        abbreviation:{
          name:'简称',
          value:'abbreviation',
          type:'text',
        },  
        chinaName:{
          name:'中文名称',
          value:'chinaName',
          type:'text',
        },
        areaLevel:{
          name:'层级',
          value:'areaLevel',
          type:'dateTime',
        },
        directLevel:{
          name:'直观级别州，市',
          value:'areaLevel',
          type:'dateTime',
        },
        modifyBy:{
          name:'修改者',
          value:'modifyBy',
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