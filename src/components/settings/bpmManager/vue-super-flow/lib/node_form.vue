<template>
    <div class="form-container" v-if="visible">
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                编辑
            </div>
            <div class="ef-node-form-body">
                <!--开始节点-->
                <Form :model="node" ref="dataForm" :label-width="80" v-show="node.prop === 'start'">
                    <FormItem label="ID">
                        <Input  v-model="node.id" disabled ></Input >
                    </FormItem>
                    <FormItem label="类型">
                        <Input  v-model="node.prop" disabled ></Input >
                    </FormItem>
                    <FormItem label="名称">
                        <Input  v-model="node.name"></Input >
                    </FormItem>
                    <FormItem>
                        <Button size="small">重置</Button>
                        <Button type="primary" size="small" @click="save">保存</Button>
                    </FormItem>
                </Form>
                <!--结束节点-->
                <Form :model="node" ref="dataForm" :label-width="80" v-show="node.prop === 'end'">
                    <FormItem label="ID">
                        <Input  v-model="node.id" disabled ></Input >
                    </FormItem>
                    <FormItem label="类型">
                        <Input  v-model="node.prop" disabled ></Input >
                    </FormItem>
                    <FormItem label="名称">
                        <Input  v-model="node.name"></Input >
                    </FormItem>
                    <FormItem>
                        <Button size="small">重置</Button>
                        <Button type="primary" size="small" @click="save">保存</Button>
                    </FormItem>
                </Form>
                <!--任务节点-->
                <Form :model="node" ref="dataForm" :label-width="80" v-show="node.prop === 'approval'">
                    <FormItem label="ID">
                        <Input  v-model="node.id" disabled ></Input >
                    </FormItem>
                    <FormItem label="类型">
                        <Input  v-model="node.prop" disabled ></Input >
                    </FormItem>
                    <FormItem label="名称">
                        <Input  v-model="node.name"></Input >
                    </FormItem>
                    <FormItem label="参与角色">
                        <Select v-model="node.roles" placeholder="请选择">
                            <Option
                                    v-for="item in roleList"
                                    :key="item.value"
                                    :value="item.value">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="视图">
                        <Select v-model="node.view" placeholder="请选择">
                            <Option
                                    v-for="item in viewList"
                                    :key="item.value"
                                    :value="item.value">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="是否开启通知">
                        <RadioGroup v-model="node.message">
                            <Radio label="1" key="1">是</Radio>
                            <Radio label="0" key="0">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="操作按钮">
                        <CheckboxGroup v-model="node.actions">
                            <template v-for="(item,index) in actionList">
                                <Checkbox :label="item.value">{{item.name}}</Checkbox>
                            </template>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem>
                        <Button size="small">重置</Button>
                        <Button type="primary" size="small" @click="save">保存</Button>
                    </FormItem>
                </Form>
                <!--条件节点-->
                <Form :model="node" ref="dataForm" :label-width="80" v-show="node.prop === 'condition'">
                    <FormItem label="ID">
                        <Input  v-model="node.id" disabled ></Input >
                    </FormItem>
                    <FormItem label="类型">
                        <Input  v-model="node.prop" disabled ></Input >
                    </FormItem>
                    <FormItem label="名称">
                        <Input  v-model="node.name"></Input >
                    </FormItem>
                    <FormItem label="条件">
                        <Input  v-model="node.condition"></Input >
                    </FormItem>
                    <FormItem>
                        <Button size="small">重置</Button>
                        <Button type="primary" size="small" @click="save">保存</Button>
                    </FormItem>
                </Form>
                <!--线节点-->
                <Form :model="line" ref="dataForm" :label-width="80" v-show="node.prop === 'line'">
                    <FormItem label="ID">
                        <Input  v-model="node.id" disabled ></Input >
                    </FormItem>
                    <FormItem label="类型">
                        <Input  v-model="node.prop" disabled ></Input >
                    </FormItem>
                    <FormItem label="名称">
                        <Input  v-model="node.name"></Input >
                    </FormItem>
                    <FormItem label="条件">
                        <Input  v-model="node.condition"></Input >
                    </FormItem>
                    <FormItem>
                        <Button size="small">重置</Button>
                        <Button type="primary" size="small" @click="save">保存</Button>
                    </FormItem>
                </Form>
            </div>
            <!--            <div class="el-node-form-tag"></div>-->
        </div>
    </div>

</template>

<script>
    import {
    Row,
    Col,
    Divider,
    Button,
    FormItem,
    Form,
    RadioGroup,
    CheckboxGroup
    } from "view-design";
    import { cloneDeep } from 'lodash'

    export default {
        props:{
            visible: {
                type: Boolean,
                default: false
            },
            nodeSetting:{
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
                data: {},
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
        components: {
            Button,
            FormItem,
            Form,
            RadioGroup,
            CheckboxGroup
        },
        watch:{
            nodeSetting:{
                handler(val){
                    this.node = {
                        id: this.nodeSetting.id,
                        ...this.nodeSetting.meta,
                    };
                }
            },
        },
        methods: {
            /**
             * 表单修改，这里可以根据传入的ID进行业务信息获取
             * @param data
             * @param id
             */
            nodeInit(data, id) {
                this.type = 'node'
                this.data = data
                data.nodeList.filter((node) => {
                    if (node.id === id) {
                        this.node = cloneDeep(node)
                    }
                })
            },
            lineInit(line) {
                this.type = 'line'
                this.line = line
            },
            // 修改连线
            saveLine() {
                this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
            },
            save() {
                this.data.nodeList.filter((node) => {
                    if (node.id === this.node.id) {
                        node.name = this.node.name
                        node.left = this.node.left
                        node.top = this.node.top
                        node.ico = this.node.ico
                        node.state = this.node.state
                        this.$emit('repaintEverything')
                    }
                })
            }
        },
        created(){
            
        }
    }
</script>

<style lang="less" scoped>
    .form-container{
        width: 300px;
        top:0;
        right: 0;
        float: right;
        height: 100%;
        text-align: center;
        background-color: #FFFFFF; 
        position: absolute;
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
