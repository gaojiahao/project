<template>
    <div class="form-container" v-if="visible">
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                编辑
            </div>
            <div class="ef-node-form-body">
                <!--开始节点-->
                <Form :model="data" ref="formValidate" :label-width="80">
                    <FormItem label="容器编码">
                        <Input  v-model="data.containerCode" @on-blur="change"></Input >
                    </FormItem>
                    <FormItem label="容器名称">
                        <Input  v-model="data.containerName"></Input >
                    </FormItem>
                    <FormItem>
                        <Button size="small">重置</Button>
                        <Button type="primary" size="small" @click="save">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>

</template>

<script>
    import {
    Row,
    Col,
    } from "view-design";

    export default {
        name:'ModulePanel',
        props:{
            visible: {
                type: Boolean,
                default: false
            },
            data:{
                type:Object,
                default () {
                    return {}
                }
            }
        },
        data() {
            return {
                // node 或 line
                type: 'node',
                node: {},
                line: {},
                roleList: [{
                    value: '000',
                    name: '无'
                },{
                    value: '001',
                    name: '销售组长'
                }, {
                    value: '002',
                    name: '销售经理'
                }, {
                    value: '003',
                    name: '销售主管'
                },{
                    value: '004',
                    name: '总经理'
                }],
                viewList: [{
                    value: '001',
                    name: '提交视图'
                }, {
                    value: '002',
                    name: '查看视图'
                }, {
                    value: '003',
                    name: '修改视图'
                },{
                    value: '004',
                    name: '审核视图'
                }],
                actionList:[
                    {
                        name: '同意',
                        value: 'agree'
                    },
                    {
                        name: '不同意',
                        value: 'disagree'
                    },
                    {
                        name: '撤回',
                        value: 'revoke'
                    },
                    {
                        name: '终止',
                        value: 'stop'
                    },
                    {
                        name: '转办',
                        value: 'transfer'
                    }
                ]
            }
        },
        watch:{
            nodeSetting:{
                handler(val){
                    this.node = {
                        ...this.nodeSetting,
                    };
                }
            },
        },
        methods: {
            save() {
                this.$emit('save',this.node);
            },
            change(value){
                this.$emit('set-container',this.data);
            }
        },
        created(){
            
        }
    }
</script>

<style lang="less" scoped>
    .form-container{
        width: 300px;
        border: 1px solid rgb(220, 227, 232);
        text-align: center;
        background-color: #FFFFFF; 
        .ef-node-form-body{
            padding: 10px 10px 0 0;
        }
    }
    .el-node-form-tag {
        position: absolute;
        top: 50%;
        margin-left: -15px;
        height: 40px;
        width: 15px;
        background-color: #fbfbfb;
        border: 1px solid rgb(220, 227, 232);
        border-right: none;
        z-index: 0;
    }
</style>
