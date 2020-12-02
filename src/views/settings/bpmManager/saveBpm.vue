<template>
<div>
    <!--顶部操作按钮-->
    <div style="height:48px">
        <div style="float:left">
            <Button type="info">临时保存</Button>
            <Button type="success">表单设置</Button>
            <Button type="warning" @click.native="save">保存流程图</Button>
        </div>
    </div>
    <div class="super-flow-base-demo">
        <!--左侧菜单-->
        <div class="node-container">
            <span class="node-item" v-for="item in nodeItemList" @mousedown="evt => nodeItemMouseDown(evt, item.value)">
                {{item.label}}
            </span>
            <span class="node-item">
                保存
            </span>
        </div>
        <!--画布-->
        <div class="flow-container" ref="flowContainer">
            <super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin" :graph-menu="graphMenuList" :node-menu="nodeMenuList" :link-menu="linkMenuList" :enter-intercept="enterIntercept" :output-intercept="outputIntercept" :link-desc="linkDesc" @node-mousedown="nodeMousedown" @line-mousedown="lineMousedown">
                <template v-slot:node="{data}">
                    <div :class="`flow-node flow-node-${data.prop}`">
                        <header>
                            {{data.name}}
                        </header>
                        <section>
                            {{data.desc}}
                        </section>
                    </div>
                </template>
            </super-flow>
            <flow-node-form ref="nodeForm" :visible="visible" :nodeSetting="nodeSetting" @save="settingSubmit"></flow-node-form> 
            <Modal :title="drawerConf.title" v-model="drawerConf.visible" @on-ok="" @on-cancel="" width="500px">
                <Form v-show="drawerConf.type === drawerType.node" ref="nodeSetting" :model="nodeSetting" label-position="right" :label-width="100">
                    <FormItem label="节点名称" prop="name">
                        <Input v-model="nodeSetting.name" placeholder="请输入节点名称" :style="{width:'200px'}">
                        </Input>
                    </FormItem>
                    <FormItem label="条件" prop="desc">
                        <Input v-model="nodeSetting.desc" placeholder="请输入条件" :style="{width:'200px'}">
                        </Input>
                    </FormItem>
                    <FormItem label="参与角色" prop="name">
                        <Select :style="{width:'200px'}" clearable filterable>
                            <Option value="001">总经理</Option>
                            <Option value="002">开发主管</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="参与者" prop="name">
                        <Select :style="{width:'200px'}" clearable filterable>
                            <Option value="true">李四</Option>
                            <Option value="false">王五</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="开启通知" prop="message">
                        <RadioGroup>
                            <Radio label="true">
                                是
                            </Radio>
                            <Radio label="false">
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
                <Form v-show="drawerConf.type === drawerType.link" ref="linkSetting" :model="linkSetting" label-position="right" :label-width="100">
                    <FormItem label="条件" prop="desc">
                        <Input v-model="nodeSetting.desc" placeholder="请输入条件" :style="{width:'200px'}">
                        </Input>
                    </FormItem>
                    <FormItem label="参与角色" prop="name">
                        <Select :style="{width:'200px'}" clearable filterable>
                            <Option value="001">总经理</Option>
                            <Option value="002">开发主管</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="参与者" prop="name">
                        <Select :style="{width:'200px'}" clearable filterable>
                            <Option value="true">李四</Option>
                            <Option value="false">王五</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="开启通知" prop="message">
                        <RadioGroup>
                            <Radio label="true">
                                是
                            </Radio>
                            <Radio label="false">
                                否
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="连线描述" prop="desc">
                        <Input v-model="linkSetting.desc" placeholder="请输入连线描述" :style="{width:'200px'}">
                        </Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="error" size="large" @click="drawerConf.cancel">取 消</Button>
                    <Button type="primary" size="large" @click="settingSubmit">确 定</Button>
                </div>
            </Modal>
        </div>
    </div>
</div>
</template>

<script>
const drawerType = {
    node: 0,
    link: 1
}
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Modal,
    RadioGroup,
    Radio,
    Row,
    ColorPicker,
    Col,
    Button
} from "view-design";
import SuperFlow from '@components/settings/bpmManager/vue-super-flow/lib';
import FlowNodeForm from '@components/settings/bpmManager/vue-super-flow/lib/node_form';

import list from './nodeList'
export default {
    name: 'SaveBpm',
    components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        Modal,
        RadioGroup,
        Radio,
        Row,
        ColorPicker,
        Col,
        Button,
        FlowNodeForm,
        SuperFlow
    },
    mixins: [list],
    data() {
        return {
            drawerType,
            drawerConf: {
                title: '',
                visible: false,
                type: null,
                info: null,
                open: (type, info) => {
                    const conf = this.drawerConf
                    conf.visible = true
                    conf.type = type
                    conf.info = info
                    if (conf.type === drawerType.node) {
                        conf.title = '节点'
                        if (this.$refs.nodeSetting) this.$refs.nodeSetting.resetFields()
                        this.$set(this.nodeSetting, 'name', info.data.name)
                        this.$set(this.nodeSetting, 'desc', info.data.desc)
                    } else {
                        conf.title = '连线'
                        if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
                        this.$set(this.linkSetting, 'desc', info.data ? info.data.desc : '')
                    }
                },
                cancel: () => {
                    this.drawerConf.visible = false
                    if (this.drawerConf.type === drawerType.node) {
                        //this.$refs.nodeSetting.clearValidate()
                    } else {
                        //this.$refs.linkSetting.clearValidate()
                    }
                }
            },
            linkSetting: {
                desc: ''
            }, //线配置
            nodeSetting: {
                name: '',
                desc: ''
            }, //节点配置
            dragConf: {
                isDown: false,
                isMove: false,
                offsetTop: 0,
                offsetLeft: 0,
                clientX: 0,
                clientY: 0,
                ele: null,
                info: null
            },
            origin: [681, 465], //流程图初始化的点
            nodeList: [],       //节点列表
            linkList: [],       //线列表
            //鼠标右键快捷菜单
            graphMenuList: [
                [{
                        label: '开始节点',
                        disable(graph) {
                            return !!graph.nodeList.find(node => node.data.prop === 'start')
                        },
                        selected: (graph, coordinate) => {
                            const start = graph.nodeList.find(node => node.data.prop === 'start')
                            if (!start) {
                                graph.addNode({
                                    width: 100,
                                    height: 80,
                                    coordinate: coordinate,
                                    type: 'start',
                                    data: {
                                        prop: 'start',
                                        name: '开始节点'
                                    }
                                })
                            }
                        }
                    },
                    {
                        label: '条件节点',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                type: 'condition',
                                data: {
                                    prop: 'condition',
                                    name: '条件节点'
                                }
                            })
                        }
                    },
                    {
                        label: '审批节点',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                type: 'approval',
                                data: {
                                    prop: 'approval',
                                    name: '审批节点'
                                }
                            })
                        }
                    },
                    {
                        label: '抄送节点',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                type: 'cc',
                                data: {
                                    prop: 'cc',
                                    name: '抄送节点'
                                }
                            })
                        }
                    },
                    {
                        label: '结束节点',
                        disable(graph) {
                            return !!graph.nodeList.find(point => point.data.prop === 'end')
                        },
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 80,
                                height: 50,
                                coordinate: coordinate,
                                type: 'end',
                                data: {
                                    prop: 'end',
                                    name: '结束节点'
                                }
                            })
                        }
                    }
                ],
                [{
                        label: '保存',
                        selected: (graph, coordinate) => {
                            console.log(JSON.stringify(graph.toJSON(), null, 2))
                        }
                    },
                    {
                        label: '全选',
                        selected: (graph, coordinate) => {
                            graph.selectAll()
                        }
                    }
                ]
            ],
            //节点右键菜单列表
            nodeMenuList: [
                [{
                    label: '删除',
                    disable: false,
                    hidden(node) {
                        return node.data.prop === 'start'
                    },
                    selected(node, coordinate) {
                        node.remove()
                    }
                }],
                [{
                    label: '编辑',
                    selected: (node, coordinate) => {
                        this.drawerConf.open(drawerType.node, node)
                    }
                }]
            ],
            //线右键菜单列表
            linkMenuList: [
                [{
                    label: '删除',
                    disable: false,
                    selected: (link, coordinate) => {
                        link.remove()
                    }
                }],
                [{
                    label: '编辑',
                    disable: false,
                    selected: (link, coordinate) => {
                        this.drawerConf.open(drawerType.link, link)
                    }
                }]
            ],
            index: 0,
            //左侧菜单模块
            nodeItemList: [{
                    label: '开始',
                    value: {
                        width: 100,
                        height: 80,
                        data: {
                            prop: 'start',
                            name: '开始',
                        },
                    }
                }, {
                    label: '审批节点',
                    value: {
                        width: 160,
                        height: 80,
                        data: {
                            prop: 'approval',
                            name: '审批节点'
                        }
                    }
                },
                {
                    label: '条件节点',
                    value: {
                        width: 160,
                        height: 80,
                        data: {
                            prop: 'condition',
                            name: '条件节点'
                        },
                    }
                },
                {
                    label: '结束',
                    value: {
                        width: 100,
                        height: 80,
                        data: {
                            prop: 'end',
                            name: '结束'
                        }
                    }
                },
            ],
            visible:false, //是否显示右侧表单
        }
    },
    watch: {
        index: {
            handler(val) {
                this.nodeList = this.list[val].nodeList;
                this.linkList = this.list[val].linkList;
            }
        },
    },
    created() {
        var data = this.$route.query;
        if (data.id) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].id == data.id) {
                    this.nodeList = this.list[i].nodeList;
                    this.linkList = this.list[i].linkList;
                }
            }
        }
    },
    methods: {
        enterIntercept(formNode, toNode, graph) {
            const formType = formNode.data.prop
            switch (toNode.data.prop) {
                case 'start':
                    return false
                case 'approval':
                    return [
                        'start',
                        'approval',
                        'condition',
                        'cc'
                    ].includes(formType)
                case 'condition':
                    return [
                        'start',
                        'approval',
                        'condition',
                        'cc'
                    ].includes(formType)
                case 'end':
                    return [
                        'approval',
                        'cc'
                    ].includes(formType)
                default:
                    return true
            }
        },
        outputIntercept(node, graph) {
            return !(node.data.prop === 'end')
        },
        linkDesc(link) {
            return link.data ? link.data.desc : ''
        },
        //保存节点数据
        settingSubmit(data) {
            console.log(data);
            const conf = this.drawerConf
            if (this.drawerConf.type === drawerType.node) {
                if (!conf.info.data) conf.info.data = {}
                Object.keys(this.nodeSetting).forEach(key => {
                    this.$set(conf.info.data, key, this.nodeSetting[key])
                })
                this.$refs.nodeSetting.resetFields()
            } else {
                if (!conf.info.data) conf.info.data = {}
                Object.keys(this.linkSetting).forEach(key => {
                    this.$set(conf.info.data, key, this.linkSetting[key])
                })
                this.$refs.linkSetting.resetFields()
            }
            conf.visible = false
            // var item = {
            //     ...data
            // }
            // for(var key in item){
            //     console.log(key)
            //     this.$set(this.nodeSetting, key, item[key]);
            // }
        },
        //保存工作流数据
        save() {
            console.log(JSON.stringify(this.$refs.superFlow.graph.toJSON(), null, 2))
        },
        //暂时没用
        docMousemove({
            clientX,
            clientY
        }) {
            const conf = this.dragConf
            if (conf.isMove) {

                conf.ele.style.top = clientY - conf.offsetTop + 'px'
                conf.ele.style.left = clientX - conf.offsetLeft + 'px'

            } else if (conf.isDown) {

                // 鼠标移动量大于 5 时 移动状态生效
                conf.isMove =
                    Math.abs(clientX - conf.clientX) > 5 ||
                    Math.abs(clientY - conf.clientY) > 5

            }
        },
        //拖动模块生成节点
        docMouseup({
            clientX,
            clientY
        }) {
            const conf = this.dragConf
            conf.isDown = false

            if (conf.isMove) {
                const {
                    top,
                    right,
                    bottom,
                    left
                } = this.$refs.flowContainer.getBoundingClientRect()

                // 判断鼠标是否进入 flow container
                if (
                    clientX > left &&
                    clientX < right &&
                    clientY > top &&
                    clientY < bottom
                ) {

                    // 获取拖动元素左上角相对 super flow 区域原点坐标
                    const coordinate = this.$refs.superFlow.getMouseCoordinate(
                        clientX - conf.offsetLeft,
                        clientY - conf.offsetTop
                    )

                    // 添加节点
                    this.$refs.superFlow.addNode({
                        coordinate,
                        ...conf.info
                    })

                }

                conf.isMove = false
            }

            if (conf.ele) {
                conf.ele.remove()
                conf.ele = null
            }
        },
        //暂时没用
        nodeItemMouseDown(evt, info) {
            const {
                clientX,
                clientY,
                currentTarget
            } = evt

            const {
                top,
                left
            } = evt.currentTarget.getBoundingClientRect()

            const conf = this.dragConf
            const ele = currentTarget.cloneNode(true)

            Object.assign(this.dragConf, {
                offsetLeft: clientX - left,
                offsetTop: clientY - top,
                clientX: clientX,
                clientY: clientY,
                info,
                ele,
                isDown: true
            })

            ele.style.position = 'fixed'
            ele.style.margin = '0'
            ele.style.top = clientY - conf.offsetTop + 'px'
            ele.style.left = clientX - conf.offsetLeft + 'px'

            this.$el.appendChild(this.dragConf.ele)
        },
        //拖动节点放下后
        nodeMousedown(data){
            console.log(data);
            this.visible = true;
            this.selectNode(data);
        },
        selectNode(data){
            this.$nextTick(() => {
                this.nodeSetting = {
                    ...data
                };
            })
        },
        lineMousedown(data){
            console.log(data);
            this.visible = true;
            this.selectLine(data);
        },
        selectLine(data){
            this.$nextTick(() => {
                this.nodeSetting = {
                    ...data
                };
            })
        },
    },
    mounted(){
        //监听鼠标的拖动
        document.addEventListener('mousemove', this.docMousemove)
        document.addEventListener('mouseup', this.docMouseup)
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('mousemove', this.docMousemove)
            document.removeEventListener('mouseup', this.docMouseup)
        })
    }
}
</script>

<style lang="less" scoped>
.super-flow-base-demo {
    width: 100%;
    height: 800px;
    margin: 0 auto;
    background: linear-gradient(90deg, rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;
    >.node-container {
        width: 200px;
        float: left;
        height: 100%;
        text-align: center;
        background-color: #FFFFFF;
    }
    >.flow-container {
        width: calc(100% - 200px);
        float: left;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .super-flow__node {
        .flow-node {
            >header {
                font-size: 14px;
                height: 32px;
                line-height: 32px;
                padding: 0 12px;
                color: #ffffff;
            }

            >section {
                text-align: center;
                line-height: 20px;
                overflow: hidden;
                padding: 6px 12px;
                word-break: break-all;
            }

            &.flow-node-start {
                >header {
                    background-color: #55abfc;
                }
            }

            &.flow-node-condition {
                >header {
                    background-color: #BC1D16;
                }
            }

            &.flow-node-approval {
                >header {
                    background-color: rgba(188, 181, 58, 0.76);
                }
            }

            &.flow-node-cc {
                >header {
                    background-color: #30b95c;
                }
            }

            &.flow-node-end {
                >header {
                    height: 50px;
                    line-height: 50px;
                    background-color: rgb(0, 0, 0);
                }
            }
        }
    }
}
</style>
