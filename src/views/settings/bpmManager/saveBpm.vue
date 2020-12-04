<template>
<div>
    <!--顶部操作按钮-->
    <div style="height:48px;line-height: 48px;">
        <div style="float:left">
            <Button size="small" type="info">临时保存</Button>
            <Button size="small" type="success">表单设置</Button>
            <Button size="small" @click.native="zoomAdd">放大</Button>
            <Button size="small" @click.native="zoomSub">缩小</Button>
            <Button size="small" type="warning" @click.native="save">保存流程图</Button>
        </div>
    </div>
    <div class="super-flow-base-demo">
        <!--左侧菜单-->
        <div class="node-container">
            <template v-for="item in nodeItemList">
                <!--<span class="node-item" @mousedown="evt => nodeItemMouseDown(evt, item)">
                    {{item.label}}
                </span>-->
                <div class="item" @mousedown="evt => nodeItemMouseDown(evt, item)" v-if="item.key=='start'">
                    <div class="start">
                        {{item.label}}
                    </div>
                </div>
                <div class="item" @mousedown="evt => nodeItemMouseDown(evt, item)" v-if="item.key=='task'">
                    <div class="task">
                        {{item.label}}
                    </div>
                </div>
                <div class="item" @mousedown="evt => nodeItemMouseDown(evt, item)" v-if="item.key=='condition'">
                    <div class="condition">
                        <div class="text">{{item.label}}</div>
                        <div class="top"></div>
                        <div class="bottom"></div>
                    </div>
                </div>
                <div class="item" @mousedown="evt => nodeItemMouseDown(evt, item)" v-else-if="item.key=='end'">
                    <div class="end">
                        {{item.label}}
                    </div>
                </div>
            </template>
        </div>
        <!--画布-->
        <!--<div class="flow-container" ref="flowContainer">-->
            <super-flow ref="superFlow" :node-list="nodeList" :link-list="linkList" :origin="origin" :graph-menu="graphMenuList" :node-menu="nodeMenuList" :link-menu="linkMenuList" :enter-intercept="enterIntercept" :output-intercept="outputIntercept" :link-desc="linkDesc" @node-mousedown="nodeMousedown" @line-mousedown="lineMousedown">
                <template v-slot:node="{data}">
                    <div :class="`flow-node flow-node-${data.prop}`">
                        <template v-if="data.prop=='condition'">
                            <div class="text">{{data.name}}</div>
                            <div class="top"></div>
                            <div class="bottom"></div>   
                        </template>
                        <template v-else>
                            {{data.name}}
                        </template>
                        <!--<header>
                            {{data.name}}
                        </header>
                        <section>
                            {{data.desc}}
                        </section>-->
                    </div>
                </template>
            </super-flow>
        <!--</div>-->
        <flow-node-form ref="nodeForm" :visible="visible" :nodeSetting="nodeSetting"></flow-node-form>
    </div>
</div>
</template>

<script>
const drawerType = {
    node: 0,
    link: 1
}
import SuperFlow from '@components/settings/bpmManager/vue-super-flow/lib';
import '@components/settings/bpmManager/vue-super-flow/lib/index.css';
import FlowNodeForm from '@components/settings/bpmManager/vue-super-flow/lib/node_form';

import list from './nodeList'
export default {
    name: 'SaveBpm',
    components: {
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
                        label: '开始',
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
                                        name: '开始'
                                    }
                                })
                            }
                        }
                    },
                    {
                        label: '条件',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                type: 'condition',
                                data: {
                                    prop: 'condition',
                                    name: '条件'
                                }
                            })
                        }
                    },
                    {
                        label: '审批',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                type: 'task',
                                data: {
                                    prop: 'task',
                                    name: '审批'
                                }
                            })
                        }
                    },
                    {
                        label: '抄送',
                        disable: false,
                        selected: (graph, coordinate) => {
                            graph.addNode({
                                width: 160,
                                height: 80,
                                coordinate: coordinate,
                                type: 'cc',
                                data: {
                                    prop: 'cc',
                                    name: '抄送'
                                }
                            })
                        }
                    },
                    {
                        label: '结束',
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
                                    name: '结束'
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
                    key: 'start',
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
                    key: 'task',
                    label: '任务',
                    value: {
                        width: 160,
                        height: 80,
                        data: {
                            prop: 'task',
                            name: '任务'
                        }
                    }
                },
                {
                    key: 'condition',
                    label: '条件',
                    value: {
                        width: 160,
                        height: 80,
                        data: {
                            prop: 'condition',
                            name: '条件'
                        },
                    }
                },
                {
                    key: 'end',
                    label: '结束',
                    value: {
                        width: 80,
                        height: 50,
                        data: {
                            prop: 'end',
                            name: '结束'
                        }
                    }
                },
            ],
            visible:false, //是否显示右侧表单
            selectModel:'',
            zoom: 0.5
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
    methods: {
        enterIntercept(formNode, toNode, graph) {
            const formType = formNode.data.prop
            switch (toNode.data.prop) {
                case 'start':
                    return false
                case 'task':
                    return [
                        'start',
                        'task',
                        'condition',
                        'cc'
                    ].includes(formType)
                case 'condition':
                    return [
                        'start',
                        'task',
                        'condition',
                        'cc'
                    ].includes(formType)
                case 'end':
                    return [
                        'task',
                        'cc'
                    ].includes(formType)
                default:
                    return true
            }
        },
        outputIntercept(node, graph) {
            return !(node.data.prop === 'end')
        },
        //线的名称
        linkDesc(link) {
            return link.data ? link.data.name : ''
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
                console.log(conf);

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
                var aa =document.getElementsByClassName('super-flow')[0];
                const {
                    top,
                    right,
                    bottom,
                    left
                } = document.getElementsByClassName('super-flow')[0].getBoundingClientRect();

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

                    var item = {};
                    var nodeItemList= [{
                        label: '开始',
                        value: {
                            width: 40,
                            height: 40,
                            data: {
                                prop: 'start',
                                name: '开始',
                            },
                        }
                    }, {
                        label: '任务',
                        value: {
                            width: 120,
                            height: 50,
                            data: {
                                prop: 'task',
                                name: '任务'
                            }
                        }
                    },
                    {
                        label: '条件',
                        value: {
                            width: 140,
                            height: 60,
                            data: {
                                prop: 'condition',
                                name: '条件'
                            },
                        }
                    },
                    {
                        label: '结束',
                        value: {
                            width: 40,
                            height: 40,
                            data: {
                                prop: 'end',
                                name: '结束'
                            }
                        }
                    },];
                    for(var i=0;i<nodeItemList.length;i++){
                        if(this.selectModel == nodeItemList[i]['label']){
                            item = nodeItemList[i]['value'];
                        }    
                    }
                    this.$refs.superFlow.addNode({
                        ...item,
                        coordinate: coordinate,  
                    })

                }

                conf.isMove = false
            }

            if (conf.ele) {
                conf.ele.remove()
                conf.ele = null
            }
        },
        //点击左侧菜单瞬间生成配置
        nodeItemMouseDown(evt, info) {
            console.log(info.label)
            this.selectModel = info.label;
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
                // info,
                ele,
                isDown: true
            })

            ele.style.position = 'fixed'
            ele.style.margin = '0'
            ele.style.top = clientY - conf.offsetTop + 'px'
            ele.style.left = clientX - conf.offsetLeft + 'px'

            console.log("clientY",clientY)
            console.log("clientX",clientX)
            console.log("conf.offsetTop",conf.offsetTop)
            console.log("conf.offsetLeft",conf.offsetLeft)
            console.log("ele",this.dragConf.ele)

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
        zoomAdd() {
            if (this.zoom > 0.9) {
                return
            }
            this.zoom = this.zoom + 0.1
            this.$refs.superFlow.$el.style.transform = `scale(${this.zoom})`
        },
        zoomSub() {
            if (this.zoom <= 0) {
                return
            }
            this.zoom = this.zoom - 0.1
            this.$refs.superFlow.$el.style.transform = `scale(${this.zoom})`
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
    mounted(){
        //监听鼠标的拖动
        document.addEventListener('mousemove', this.docMousemove)
        document.addEventListener('mouseup', this.docMouseup)
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('mousemove', this.docMousemove)
            document.removeEventListener('mouseup', this.docMouseup)
        });
    }
}
</script>

<style lang="less" scoped>
.item{
    width: 140px;
    height: 30px;
    margin: 10px 0;
    user-select: none;
    cursor: pointer;
    z-index: 6;
    .start{
        font-size: 12px;
        display: inline-block;
        height: 30px;
        width: 30px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        z-index: 6;
        border-radius: 50%;
        background:#19be6b;
        color:#fff;
    }
    .task{
        font-size: 12px;
        display: inline-block;
        height: 30px;
        width: 100px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        z-index: 6;
        border-radius: 5%;
        background:#2db7f5;
        color:#fff;    
    }
    .condition{
        width: 100px;
        font-size: 12px;
        display: inline-block;
        height: 30px;
        color:#fff; 
        z-index: 6; 
        .top{
            width: 0;
            height: 0;
            border-bottom: 15px solid #ff9900;
            border-left: 50px solid rgba(151, 151, 151, 0);
            border-right: 50px solid rgba(151, 151, 151, 0);
        }
        .bottom{
            width: 0;
            height: 0;
            border-top: 15px solid #ff9900;
            border-left: 50px solid rgba(151, 151, 151, 0);
            border-right: 50px solid rgba(151, 151, 151, 0);    
        }
        .text{
            width: 100px;
            text-align: center;
            margin-top: 5px;
            float: left;
        }
    }
    .end{
        font-size: 12px;
        display: inline-block;
        height: 30px;
        width: 30px;
        line-height: 30px;
        cursor: pointer;
        text-align: center;
        z-index: 6;
        border-radius: 50%;
        background:#BC1D16;
        color:#fff;    
    }
}
.super-flow-base-demo {
    width: 100%;
    height: calc(100vh);
    margin: 0 auto;
    background: linear-gradient(90deg, rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
    background-size: 10px 10px;
    position: relative;
    display: flex;
    >.node-container {
        width: 140px;
        float: left;
        height: 200px;
        text-align: center;
        background-color: rgba(151, 151, 151, 0.3);
    }
    >.flow-container {
        cursor: auto;
        position: relative;
        overflow: scroll;
        flex: 1;
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
                text-align: center;
                border-radius: 50%;
                background:#19be6b;
                color: #fff;
                line-height: 40px;
                height: 40px;
                width: 40px;
                >header {
                    background-color: #19be6b;
                }
            }

            &.flow-node-condition {
                width: 140px;
                font-size: 12px;
                display: inline-block;
                height: 60px;
                color: #fff;
                .top{
                    width: 0;
                    height: 0;
                    border-bottom: 30px solid #ff9900;
                    border-left: 70px solid rgba(151, 151, 151, 0);
                    border-right: 70px solid rgba(151, 151, 151, 0);
                }
                .bottom{
                    width: 0;
                    height: 0;
                    border-top: 30px solid #ff9900;
                    border-left: 70px solid rgba(151, 151, 151, 0);
                    border-right: 70px solid rgba(151, 151, 151, 0);    
                }
                .text{
                    width: 140px;
                    text-align: center;
                    margin-top: 20px;
                    float: left;
                }
                >header {
                    background-color: #ff9900;
                }
            }

            &.flow-node-task {
                text-align: center;
                background:#2db7f5;
                color: #fff;
                height: 50px;
                width: 120px;
                line-height: 50px;
                >header {
                    background-color: #2db7f5;
                }
            }

            &.flow-node-cc {
                >header {
                    background-color: #30b95c;
                }
            }

            &.flow-node-end {
                text-align: center;
                border-radius: 50%;
                background:#BC1D16;
                color: #fff;
                line-height: 40px;
                height: 40px;
                width: 40px;
                >header {
                    height: 50px;
                    line-height: 50px;
                    background-color: #BC1D16;
                }
            }
        }
    }
}
</style>
