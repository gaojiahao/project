/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-23 11:11:17
 */
export default {
    data() {
        const packageIdVali = (rule, value, callback) => {
            if (value == ''||value === undefined) {
                callback(new Error('请选择模型名称'));
            } else {
              callback();
            }
        };
        return {
            formConfig:{
                packageId:{
                    name:'模型名称',
                    type:'select',
                    dataSource:{
                        type:'dynamic',
                        url:'/api/GetWorkflowPackageList',
                        data:[],
                        col:[
                            {k:'name',v:'packageName'},
                            {k:'value',v:'id'}
                          ]
                    },
                    bind:{
                      target: 'packageName',
                      bindValue: 'packageName'
                    }
                },
                workflowName:{
                    name:'流程名称',
                    type:'text',
                },
                workflowIcon:{
                    name:'流程icon',
                    type:'text',
                },
            },
            formValidate: {
                packageId:'',
                packageName: '',
                workflowName:'',
                templateId:0,
                workflowIcon: '',
            },
            ruleValidate: {
                packageId: [{
                    required: true,
                    message: '请选择模型名称',
                    trigger: 'change',
                    validator: packageIdVali,
                }],
                workflowName: [{
                    required: true,
                    type: 'string',
                    message: '请输入流程名称',
                    trigger: 'blur'
                }],
            },
        }
    }
}