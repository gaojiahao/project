/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 14:08:57
 */
export default {
    data() {
      // const isElectrifiedVali = (rule, value, callback) => {
      //   if (value == ''||value === undefined) {
      //       callback(new Error('请选择是否带电'));
      //   } else {
      //     callback();
      //   }
      // };
      const sumAreaCodeVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
          callback(new Error('请选择汇总地区合集'));
        } else {
          callback();
        }
      };
      const minWeightVali = (rule, value, callback) => {
        if(value===0){
          callback();
        }
        if (value == ''||value === undefined) {
          callback(new Error('请输入单品最小重量'));
        } else {
          if(value<0){
            callback(new Error('单品最小重量不能为负数'));
          }
          if(value>this.formValidate['maxWeight']){
            callback(new Error('单品最小重量不能大于单品最大重量'));  
          }
          callback();
        }
      };
      const maxWeightVali = (rule, value, callback) => {
        if(value===0){
          callback();
        }
        if (value == ''||value === undefined) {
          callback(new Error('请输入单品最大重量'));
        } else {
          if(value<0){
            callback(new Error('单品最大重量不能为负数'));
          }
          if(value<this.formValidate['minWeight']){
            callback(new Error('单品最大重量不能小于单品最小重量'));  
          }
          callback();
        }
      };
      return {
        formConfig:{
          sumName:{
            name:'汇总地区名称',
            type:'text',
            length:200
          },
          sumCode:{
            name:'汇总地区简称',
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
            haveName:'chinaName'
          },
          isElectrified:{
            name:'是否带电',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:true},
                {name:'否',value:false}
              ],
            }  
          },
          minWeight:{
            name:'单品最小重量',
            type:'number',
            unit:'g',
            precision:2
          },
          maxWeight:{
            name:'单品最大重量',
            type:'number',
            unit:'g',
            precision:2
          },
          sumAreaCode:{
            name:'汇总地区合集',
            type:'selectorMulti',
            isName:true,
            dataSource:{
              type:'dynamic',
              url:'/api/GetAreaPage',
              data:[],
              col:[
                {k:'name',v:'abbreviation'},
                {k:'value',v:'id'}
              ]
            },
            proertyContext: {
              "dataSourceCols": [
                {
                  "title": "id",
                  "key": "value",
                  "hidden": true
                },
                {
                  "title": "简称",
                  "key": "abbreviation"
                },
                {
                  "title": "中文名称",
                  "key": "chinaName"
                },
                {
                  "title": "英文名称",
                  "key": "longName"
                },
              ]
            },
            valueField: "id",  //值字段
            displayField: "name", //显示字段
            checkField:'name',
            haveName:'chinaName'
          },
        },
        formValidate: {
          sumName:'',
          sumCode: '',
          isElectrified:false,
          minWeight:0,
          maxWeight:0,
          sumAreaCode:[]
        },
        ruleValidate: {
          sumName: [{
              required: true,
              message: '请输入汇总地区名称',
              trigger: 'blur'
          }],
          sumCode: [{
            required: true,
            message: '请输入汇总地区简称',
            trigger: 'change'
          }],
          chinaName: [{
            required: true,
            message: '请输入中文名称',
            trigger: 'blur'
          }],
          minWeight: [{
            required: true,
            // message: '请输入正确的重量',
            trigger: 'blur',
            validator: minWeightVali
          }],
          maxWeight: [{
            required: true,
            // message: '请输入正确的重量',
            trigger: 'blur',
            validator: maxWeightVali
          }],
          // isElectrified: [{
          //   // required: true,
          //   message: '请选择是否带电',
          //   trigger: 'change',
          //   // validator: isElectrifiedVali
          // }],
          sumAreaCode: [{
            required: true,
            message: '请选择汇总地区合集',
            trigger: 'change',
            validator: sumAreaCodeVali
          }],
        }, 
      }
    }
  }