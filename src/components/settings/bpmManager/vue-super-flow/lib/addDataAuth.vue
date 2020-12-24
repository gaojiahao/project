<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-23 16:06:04
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        width="800"
        draggable >
        <Table border :loading="loading" highlight-row :columns="columns" :data="selectDataAuthData&&selectDataAuthData.config" stripe ref="selection" @on-current-change="onCurrentChange"></Table>
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
            type:Object,
            default () {
                return {
                    
                }
            }           
        },
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
        },
    },
    data () {
        return {
            visble: false,
            loading: true,
            columns: [
                {
                    title: '字段名称',
                    key: 'fieldName',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.fieldName);
                    }
                },
                {
                    title: '字段值',
                    key: 'fieldCode',
                },
                {
                    title: '字段类型',
                    key: 'type',
                },
                {
                    title: '可见',
                    key: 'hidden',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:this.selectDataAuthData['config'][params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAuthData['config'][params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '可写',
                    key: 'edit',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value:this.selectDataAuthData['config'][params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAuthData['config'][params.index][params.column.key] = event;
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
                                value: this.selectDataAuthData['config'][params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAuthData['config'][params.index][params.column.key] = event;
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
                        id:'fds',
                        fieldName: '姓名',
                        fieldCode: "name",
                        type: '文本',
                        edit: false,
                        hidden:false,
                        required:false
                    },
                    {
                        id:'fds2',
                        fieldName: '性别',
                        fieldCode: "sex",
                        type: '文本',
                        edit: false,
                        hidden:false,
                        required:false
                    },
                    {
                        id:'fds3',
                        fieldName: '年龄',
                        fieldCode: "age",
                        type: '文本',
                        edit: false,
                        hidden:false,
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
            this.$emit('save',this.selectDataAuthData.nodeId,this.selectDataAuthData);
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
