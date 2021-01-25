<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-23 11:19:03
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        width="800"
        draggable >
        <Table border :loading="loading" highlight-row :columns="columns" :data="selectDataAuthData" stripe ref="selection" @on-current-change="onCurrentChange"></Table>
    </Modal>   
</template>
<script>
export default {
    name: 'AddDataAuth',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '添加数据权限'
        },
        selectDataAuthData:{
            type:Array,
            default () {
                return []
            }           
        },
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
        },
        nodeSetting:{
            handler(val){
                this.formData = this.nodeSetting['parPolicies'];
            },
            deep:true,
        },
    },
    data () {
        return {
            visble: false,
            loading: true,
            columns: [
                {
                    title: '字段名称',
                    key: 'fNameText',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.fNameText);
                    }
                },
                {
                    title: '字段值',
                    key: 'fName',
                },
                {
                    title: '字段类型',
                    key: 'type',
                },
                {
                    title: '可见',
                    key: 'isVisible',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:this.selectDataAuthData[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAuthData[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '可写',
                    key: 'isEditable',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:this.selectDataAuthData[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAuthData[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '必填',
                    key: 'required',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value: this.selectDataAuthData[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAuthData[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
            ],
            data: {
                nodeId:'',
                config: [
                    {
                        fId:1,
                        fNameText: '姓名',
                        fName: "name",
                        type: '文本',
                        isEditable: false,
                        isVisible:false,
                        required:false
                    },
                    {
                        fId:2,
                        fNameText: '性别',
                        fName: "sex",
                        type: '文本',
                        isEditable: false,
                        isVisible:false,
                        required:false
                    },
                    {
                        id:'fds3',
                        fNameText: '年龄',
                        fName: "age",
                        type: '文本',
                        isEditable: false,
                        isVisible:false,
                        required:false
                    },
                ],
            },
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','AddDataAuthModal',false);
        },
        ok(){
            this.$emit('save',this.selectDataAuthData);
            this.$emit('show','AddDataAuthModal',false);
        },
        onCurrentChange(){}
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>
