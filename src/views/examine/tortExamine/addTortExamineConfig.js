/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-24 15:28:40
 */
export default {
    data() {
      return {
        formConfig2:{
          url:{
            name:'参考链接',
            type:'selectorMulti',
            disabled: false, //是否禁用
            hidden: false,    //是否隐藏
            dataSource: {
              data:[
                {id:1,platform:'亚马逊',url:"www.baidu.com",comment:"无"},
                {id:2,platform:'ebay',url:"www.sogou.com",comment:"无1"},
                {id:3,platform:'京东',url:"www.sohu.com",comment:"无2"}
              ]
            },
            proertyContext: {
              "dataSourceCols": [
                {
                  "title": "id",
                  "key": "id"
                },
                {
                  "title": "平台",
                  "key": "platform"
                },
                {
                  "title": "参考链接",
                  "key": "url"
                },
                {
                  "title": "备注",
                  "key": "comment"
                },
              ]
            },
            valueField: "id",  //值字段
            displayField: "url", //显示字段
          },
          examine:{
            name:'是否侵权',
            type:'radio',
            dataSource:{
              data:[
                { name:'是',value:'true'},
                { name:'否',value:'false'},
              ]
            }
          },
          opinion:{
            name:'侵权审核意见',
            type:'textarea',
          },
        },
        formValidate2: {
          url:'',
          examine:'',
          opinion:'',
        },
        ruleValidate2: {
          url: [{
            required: true,
            type: 'string',
            message: '请输入调研平台',
            trigger: 'blur'
          }],
          examine: [{
            required: true,
            type: 'string',
            message: '是否侵权',
            trigger: 'change'
        }],
          opinion: [{
              required: true,
              type: 'string',
              message: '请输入侵权审核意见',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }