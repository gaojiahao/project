/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 17:16:21
 */
export default {
    data() {
        return {
            formConfig:{
                moduleName:{
                    name:'模型名称',
                    type:'select',
                    dataSource:{
                        type:'static',
                        data:[
                            {name:'新品开发',value:'001'},
                            {name:'请假管理',value:'002'},
                            {name:'销售推品',value:'003'}
                        ],
                    },
                    disabled: false
                },
                flowName:{
                    name:'流程名称',
                    type:'text',
                },
                icon:{
                    name:'流程名称',
                    type:'text',
                },
                relationTable:{
                    name:'关联表',
                    type:'text', 
                },
            },
            formValidate: {
                moduleName: '',
                flowName:'',
                icon: '',
                relationTable:''
            },
            ruleValidate: {
                moduleName: [{
                    required: true,
                    type: 'string',
                    message: '请输入模型名称',
                    trigger: 'change'
                }],
                flowName: [{
                    required: true,
                    type: 'string',
                    message: '请输入流程名称',
                    trigger: 'blur'
                }],
            },
        }
    }
}