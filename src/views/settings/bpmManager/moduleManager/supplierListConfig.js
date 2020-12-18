/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 15:07:04
 */
export default {
  data() {
    return {
      formConfig:{
        flow:{
          name:'流程列表',
          type:'selectorSingle',
          disabled: false, //是否禁用
          hidden: false,    //是否隐藏
          dataSource: {
            data:[
              {id:'1',platform:'新品开发流程',url:"新品开发流程",comment:"无"},
              {id:'2',platform:'销售推荐流程',url:"销售推荐流程",comment:"无1"},
              {id:'3',platform:'制图流程',url:"制图流程",comment:"无2"}
            ]
          },
          proertyContext: {
            "dataSourceCols": [
              {
                "title": "id",
                "key": "id"
              },
              {
                "title": "流程名称",
                "key": "platform"
              },
              {
                "title": "描述",
                "key": "url"
              },
              {
                "title": "备注",
                "key": "comment"
              },
            ]
          },
          valueField: "id",  //值字段
          displayField: "platform", //显示字段
        },
      },
      formValidate: {
        flow:'',
      },
      ruleValidate: {
        status: [{ 
          required: true, 
          message: '是否审核', 
          trigger: 'change' 
        }],
      }, 
      filtersConfig:{ 
        color:{
          name:'模型名称',
          value:'color',
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
          type:'checkbox',
          dataSource:{
            type:'static',
            data:[
              {name:'已审核',value:'1'},
              {name:'未审核',value:'0'}
            ],
          }
        },
      }
    }
  }
}