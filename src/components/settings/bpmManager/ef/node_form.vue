<template>
    <div>
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                编辑
            </div>
            <div class="ef-node-form-body">
                <Form :model="node" ref="dataForm" :label-width="80" v-show="type === 'node'">
                    <FormItem label="类型">
                        <Input  v-model="node.type" disabled ></Input >
                    </FormItem>
                    <FormItem label="名称">
                        <Input  v-model="node.name"></Input >
                    </FormItem>
                    <FormItem label="left坐标">
                        <Input  v-model="node.left" disabled ></Input >
                    </FormItem>
                    <FormItem label="top坐标">
                        <Input  v-model="node.top" disabled ></Input >
                    </FormItem>
                    <FormItem label="ico图标">
                        <Input  v-model="node.ico"></Input >
                    </FormItem>
                    <FormItem label="状态">
                        <Select v-model="node.state" placeholder="请选择">
                            <Option
                                    v-for="item in stateList"
                                    :key="item.state"
                                    :value="item.state">{{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button icon="ios-add">重置</Button>
                        <Button type="primary" icon="ios-add" @click="save">保存</Button>
                    </FormItem>
                </Form>

                <Form :model="line" ref="dataForm" :label-width="80" v-show="type === 'line'">
                    <FormItem label="条件">
                        <Input  v-model="line.label"></Input >
                    </FormItem>
                    <FormItem>
                        <Button icon="ios-add">重置</Button>
                        <Button type="primary" icon="ios-add" @click="saveLine">保存</Button>
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
    Form
    } from "view-design";
    import { cloneDeep } from 'lodash'

    export default {
        data() {
            return {
                visible: true,
                // node 或 line
                type: 'node',
                node: {},
                line: {},
                data: {},
                stateList: [{
                    state: 'success',
                    label: '成功'
                }, {
                    state: 'warning',
                    label: '警告'
                }, {
                    state: 'error',
                    label: '错误'
                }, {
                    state: 'running',
                    label: '运行中'
                }]
            }
        },
        components: {
            Button,
            FormItem,
            Form
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
        }
    }
</script>

<style>
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
