<!--
 * User: CHT
 * Date: 2020/5/27
 * Time: 9:52
-->
<template>
<div class="super-flow-base-demo">
    <super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin" :graph-menu="graphMenuList" :node-menu="nodeMenuList" :link-menu="linkMenuList" :enter-intercept="enterIntercept" :output-intercept="outputIntercept" :link-desc="linkDesc">
        <template v-slot:node="{meta}">
            <div :class="`flow-node flow-node-${meta.prop}`">
                <header>
                    {{meta.name}}
                </header>
                <section>
                    {{meta.desc}}
                </section>
            </div>
        </template>
    </super-flow>

    <Modal :title="drawerConf.title" v-model="drawerConf.visible" @on-ok="ok" @on-cancel="cancel" width="500px">
        <Form v-show="drawerConf.type === drawerType.node" ref="nodeSetting" :model="nodeSetting">
            <FormItem label="节点名称" prop="name">
                <Input v-model="nodeSetting.name" placeholder="请输入节点名称">
                </Input>
            </FormItem>
            <FormItem label="节点描述" prop="desc">
                <Input v-model="nodeSetting.desc" placeholder="请输入节点描述">
                </Input>
            </FormItem>
        </Form>
        <Form v-show="drawerConf.type === drawerType.link" ref="linkSetting" :model="linkSetting">
            <FormItem label="连线描述" prop="desc">
                <Input v-model="linkSetting.desc" placeholder="请输入连线描述">
                </Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="error" size="large" @click="drawerConf.cancel">取 消</Button>
            <Button type="primary" size="large" @click="settingSubmit">确 定</Button>
        </div>
    </Modal>

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

import list from './nodeList'
export default {
    name: "UpdataBpm",
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
                        this.$set(this.nodeSetting, 'name', info.meta.name)
                        this.$set(this.nodeSetting, 'desc', info.meta.desc)
                    } else {
                        conf.title = '连线'
                        if (this.$refs.linkSetting) this.$refs.linkSetting.resetFields()
                        this.$set(this.linkSetting, 'desc', info.meta ? info.meta.desc : '')
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
            },
            nodeSetting: {
                name: '',
                desc: ''
            },
            origin: [681, 465],
            nodeList: [],
            linkList: [],
            graphMenuList: [
                [{
                        label: '开始节点',
                        disable(graph) {
                            return !!graph.nodeList.find(node => node.meta.prop === 'start')
                        },
                        selected: (graph, coordinate) => {
                            const start = graph.nodeList.find(node => node.meta.prop === 'start')
                            if (!start) {
                                graph.addNode({
                                    width: 100,
                                    height: 80,
                                    coordinate: coordinate,
                                    meta: {
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
                                meta: {
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
                                meta: {
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
                                meta: {
                                    prop: 'cc',
                                    name: '抄送节点'
                                }
                            })
                        }
                    },
                    {
                        label: '结束节点',
                        disable(graph) {
                            return !!graph.nodeList.find(point => point.meta.prop === 'end')
                        },
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 80,
                                height: 50,
                                coordinate: coordinate,
                                meta: {
                                    prop: 'end',
                                    name: '结束节点'
                                }
                            })
                        }
                    }
                ],
                [{
                        label: '打印数据',
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
            nodeMenuList: [
                [{
                    label: '删除',
                    disable: false,
                    hidden(node) {
                        return node.meta.prop === 'start'
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
        }
    },
    watch: {
        index: {
            handler(val) {
                this.nodeList = this.list[val].nodeList;
                this.linkList = this.list[val].linkList;
            }
        }
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
            const formType = formNode.meta.prop
            switch (toNode.meta.prop) {
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
            return !(node.meta.prop === 'end')
        },
        linkDesc(link) {
            return link.meta ? link.meta.desc : ''
        },
        settingSubmit() {
            const conf = this.drawerConf
            if (this.drawerConf.type === drawerType.node) {
                if (!conf.info.meta) conf.info.meta = {}
                Object.keys(this.nodeSetting).forEach(key => {
                    this.$set(conf.info.meta, key, this.nodeSetting[key])
                })
                this.$refs.nodeSetting.resetFields()
            } else {
                if (!conf.info.meta) conf.info.meta = {}
                Object.keys(this.linkSetting).forEach(key => {
                    this.$set(conf.info.meta, key, this.linkSetting[key])
                })
                this.$refs.linkSetting.resetFields()
            }
            conf.visible = false
        },
        ok() {},
        cancel() {},
        selectItem(index) {
            this.index = index;
        },
        add() {}
    }
}
</script>

<style lang="less" scoped>
.super-flow-base-demo {
    width: 100%;
    height: 800px;
    margin: 0 auto;
    background-color: #f5f5f5;
    background: linear-gradient(90deg, rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;

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
