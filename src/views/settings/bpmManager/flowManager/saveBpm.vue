<template>
<div>
    <!--顶部操作按钮-->
    <div style="height:48px;line-height: 48px;">
        <div style="float:left">
            <Button size="small" @click.native="goReturn()">返回</Button>
            <Button size="small" type="info">临时保存</Button>
            <Button size="small" @click.native="showModal('ShowPanel',true)" type="success">表单设置</Button>
            <Button size="small" @click.native="zoomAdd">放大</Button>
            <Button size="small" @click.native="zoomSub">缩小</Button>
            <Button size="small" type="warning" @click.native="save">保存流程图</Button>
        </div>
    </div>
    <div class="super-flow-base-demo">
        <!--左侧菜单-->
        <div class="node-container">
            <template v-for="item in nodeItemList">
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
                </div>
            </template>
        </super-flow>
        <flow-node-form ref="nodeForm" :visible="visible" :nodeSetting="nodeSetting"></flow-node-form>
    </div>
    <SiderPanel :show="isShow['ShowPanel']" @show="showModal">
        <div slot="info">
            <FieldList @show="showModal" @save="saveFormSettings"></FieldList>
        </div>
    </SiderPanel>
    <NameModal :show="isShow['NameModal']" :title="nameModalTitle" :nodeSetting="nodeSetting" @show="showModal"></NameModal>
    <ParticipantDecisionModal :show="isShow['ParticipantDecisionModal']" :nodeSetting="nodeSetting" :formData="selectParticipantDecision" :data="participantDecisionData" @show="showModal" @save="saveParticipantDecision"></ParticipantDecisionModal>
    <AddParticipant :show="isShow['AddParticipantModal']" @show="showModal" :selectAddParticipant="selectAddParticipant" :nodeSetting="nodeSetting" @save="saveAddParticipant"></AddParticipant>
    <AddDataAuth :show="isShow['AddDataAuthModal']" @show="showModal" :selectDataAuthData="selectDataAuthData" @save="saveDataAuth"></AddDataAuth>
    <AddButton :show="isShow['AddButtonModal']" @show="showModal" :selectDataAddButton="selectDataAddButton" @save="saveAddButton"></AddButton>
    <AddCondition :show="isShow['AddConditionModal']" :formSettings="formSettings" @show="showModal" :selectAddCondition="selectAddCondition" @save="saveAddCondition"></AddCondition>
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
import FieldList from '@components/settings/bpmManager/vue-super-flow/lib/fieldList';
import SiderPanel from "@components/charting/siderPanel";
import NameModal from '@components/settings/bpmManager/vue-super-flow/lib/nameModal';
import ParticipantDecisionModal from '@components/settings/bpmManager/vue-super-flow/lib/participantDecisionModal';
import AddParticipant from '@components/settings/bpmManager/vue-super-flow/lib/addParticipant';
import AddDataAuth from '@components/settings/bpmManager/vue-super-flow/lib/addDataAuth';
import AddButton from '@components/settings/bpmManager/vue-super-flow/lib/addButton';
import AddCondition from '@components/settings/bpmManager/vue-super-flow/lib/addCondition';
import {
    CreateWorkflow,
    GetWorkflowTemplateById
} from "@service/settingsService";

import list from './nodeList'
export default {
    name: 'SaveBpm',
    components: {
        FlowNodeForm,
        SuperFlow,
        SiderPanel,
        FieldList,
        NameModal,
        ParticipantDecisionModal,
        AddParticipant,
        AddDataAuth,
        AddButton,
        AddCondition
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
                edit: (type, info) => {
                    this.isShow['NameModal'] = true;
                    if (type === drawerType.node) {
                        this.selectNode(info);
                        this.nameModalTitle = '修改任务名称';
                        this.$set(this.nodeSetting, 'name', info.data.name);
                        this.$set(this.nodeSetting, 'desc', info.data.desc);
                    } else {
                        this.nameModalTitle = '修改条件名称';
                        this.$set(this.nodeSetting, 'name', info.data.name);
                        this.$set(this.nodeSetting, 'desc', info.data.desc);
                    }
                },
                openParticipantDecision: (type, info) => {
                    this.selectNode(info);
                    if(this.nodeSetting['parPolicies']&&this.nodeSetting['parPolicies']['noParPolicy']){
                        this.selectParticipantDecision = this.nodeSetting['parPolicies'];
                    } else {
                        this.selectParticipantDecision = {
                            noParPolicy:'',
                            dupParPolicy:'',
                            participatedParPolicy:''
                        }
                    }
                    this.isShow['ParticipantDecisionModal'] = true;
                },
                openAddParticipant: (type, info) => {
                    this.selectNode(info);
                    this.isShow['AddParticipantModal'] = true;
                },
                openAddDataAuth: (type, info) => {
                    this.selectNode(info);
                    if(this.nodeSetting['permissions'].length){
                        this.selectDataAuthData = this.nodeSetting['permissions'];
                    } else {
                        this.selectDataAuthData =  [
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
                                id:3,
                                fNameText: '年龄',
                                fName: "age",
                                type: '文本',
                                isEditable: false,
                                isVisible:false,
                                required:false
                            },
                        ];
                    }
                    this.isShow['AddDataAuthModal'] = true;
                },
                openAddButton: (type, info) => {
                    this.selectNode(info);
                    if(this.nodeSetting['buttons'].length){
                        this.selectDataAddButton = this.nodeSetting['buttons'];
                    } else {
                        this.selectDataAddButton = [
                                {
                                    name: '同意',
                                    value: "agree",
                                    action: false
                                },
                                {
                                    name: '拒绝',
                                    value: "disagree",
                                    action: false
                                },
                                {
                                    name: '撤回',
                                    value: "recall",
                                    action: false
                                },
                                {
                                    name: '终止',
                                    value: "stop",
                                    action: false
                                },
                                {
                                    name: '转办',
                                    value: "transfer",
                                    action: false
                                },
                            ];
                    }
                    this.isShow['AddButtonModal'] = true;
                },
                openAddCondition: (type, info) => {
                    this.selectNode(info);
                    if(this.nodeSetting['rules'].length){
                        this.selectAddCondition = this.nodeSetting['rules'];
                    } else {
                        this.selectAddCondition = []
                    }
                    this.isShow['AddConditionModal'] = true;
                },
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
                    label: '修改描述',
                    hidden(node) {
                        return ['start','end'].indexOf(node.type)!=-1;
                    },
                    selected: (node, coordinate) => {
                        this.drawerConf.edit(drawerType.node, node)
                    }
                }],
                // [{
                //     label: '添加条件',
                //     hidden(node) {
                //         return ['start','end','task'].indexOf(node.type)!=-1;
                //     },
                //     selected: (node, coordinate) => {
                //         this.drawerConf.openAddCondition(drawerType.node, node)
                //     }
                // }],
                [{
                    label: '参与者决策',
                    hidden(node) {
                        return ['start','end','condition'].indexOf(node.type)!=-1;
                    },
                    selected: (node, coordinate) => {
                        this.drawerConf.openParticipantDecision(drawerType.node, node)
                    }
                }],
                [{
                    label: '添加参与者',
                    hidden(node) {
                        return ['start','end','condition'].indexOf(node.type)!=-1;
                    },
                    selected: (node, coordinate) => {
                        this.drawerConf.openAddParticipant(drawerType.node, node)
                    }
                }],
                [{
                    label: '添加数据权限',
                    hidden(node) {
                        return ['start','end','condition'].indexOf(node.type)!=-1;
                    },
                    selected: (node, coordinate) => {
                        this.drawerConf.openAddDataAuth(drawerType.node, node)
                    }
                }],
                [{
                    label: '添加操作按钮',
                    hidden(node) {
                        return ['start','end','condition'].indexOf(node.type)!=-1;
                    },
                    selected: (node, coordinate) => {
                        this.drawerConf.openAddButton(drawerType.node, node)
                    }
                }],
                // [{
                //     label: '编辑',
                //     hidden(node) {
                //         return ['start','end'].indexOf(node.type)!=-1;
                //     },
                //     selected: (node, coordinate) => {
                //         this.drawerConf.open(drawerType.node, node)
                //     }
                // }],
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
                    label: '修改描述',
                    disable: false,
                    selected: (link, coordinate) => {
                        this.drawerConf.edit(drawerType.link, link)
                    }
                }],
                [{
                    label: '添加条件',
                    selected: (node, coordinate) => {
                        this.drawerConf.openAddCondition(drawerType.node, node)
                    }
                }],
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
            visible:false,
            selectModel:'',
            zoom: 0.5,
            nameModalTitle:"",
            formSettings:[],
            isShow:{
                ShowPanel:false,
                NameModal:false,
                ParticipantDecisionModal:false,
                AddParticipantModal:false,
                AddDataAuthModal:false,
                AddButtonModal:false,
                AddConditionModal:false,
            },
            participantDecisionData:{},
            dataAuthData:{},
            selectDataAuthData:[],
            dataAddButton:{},
            selectDataAddButton:[],
            dataAddCondition:{},
            selectAddCondition:[],
            dataAddParticipant:{},
            selectAddParticipant:{},
            selectParticipantDecision:{}

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
            const formType = formNode.type
            switch (toNode.type) {
                case 'start':
                    return false
                case 'task':
                    return [
                        'start',
                        'task',
                        'condition',
                    ].includes(formType)
                case 'condition':
                    return [
                        'start',
                        'task',
                        'condition',
                    ].includes(formType)
                case 'end':
                    return [
                        'task',
                    ].includes(formType)
                default:
                    return true
            }
        },
        outputIntercept(node, graph) {
            return !(node.type === 'end')
        },
        //线的名称
        linkDesc(link) {
            return link.data ? link.data.name : ''
        },
        //保存节点数据
        settingSubmit(data) {
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
            var params= {};
            // params.id = "";
            params.clauseId = this.$route.query.id; //流程id
            params.chanrtJson = {};
            params.viewJson="";
            var a = this.$refs.superFlow.graph.toJSON();
            params.viewJson=(JSON.stringify(this.$refs.superFlow.graph.toJSON(), null, 2));
            params.chanrtJson = {
                origin: a.origin,
                nodes: a.nodeList,
                edges: a.linkList, 
            };
            var json = {};
            // let a = (JSON.stringify(this.$refs.superFlow.graph.toJSON(), null, 2));
            // console.log(a);
            
            return new Promise((resolve, reject) => {
                this.$FromLoading.show();
                CreateWorkflow(params).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.$Message.info('温馨提示：保存成功！');
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                        this.$FromLoading.hide();
                    }
                });
            });
            
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
                        buttons:[
                            {
                                name: '同意',
                                value: "agree",
                                action: false
                            },
                            {
                                name: '拒绝',
                                value: "disagree",
                                action: false
                            },
                            {
                                name: '撤回',
                                value: "recall",
                                action: false
                            },
                            {
                                name: '终止',
                                value: "stop",
                                action: false
                            },
                            {
                                name: '转办',
                                value: "transfer",
                                action: false
                            }
                        ]
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
            this.$el.appendChild(this.dragConf.ele)
        },
        //拖动节点放下后
        nodeMousedown(data){
            this.selectNode(data);
        },
        selectNode(data){
            // this.$nextTick(() => {
            //     this.nodeSetting = {
            //         ...data
            //     };
            // })
            this.nodeSetting = data;
        },
        lineMousedown(data){
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
        goReturn(){
            this.$router.go(-1);
        },
        saveFormSettings(data){
            this.$nextTick(() => {
                this.formSettings = data;
            });
        },
        showPanel(flag){
            this.isShowPanel = flag;
        },
        showNameModal(flag){
            this.isShowNameModal = flag;
        },
        showModal(name,flag){
            this.isShow[name] = flag;
        },
        saveParticipantDecision(data){
            this.$set(this.nodeSetting, 'parPolicies', data);
            // this.$set(this.participantDecisionData,id,data);
        },
        saveDataAuth(data){
            this.$set(this.nodeSetting, 'permissions', data);
            // this.$set(this.dataAuthData,id,data);
        },
        saveAddButton(data){
            this.$set(this.nodeSetting, 'buttons', data);
            // this.$set(this.dataAddButton,id,data);    
        },
        saveAddCondition(data){
            this.$set(this.nodeSetting, 'rules', data);
            // this.$set(this.dataAddCondition,id,data);
        },
        saveAddParticipant(data){
            // this.$set(this.dataAddParticipant,id,data);
            this.$set(this.nodeSetting, 'participants', data);
        },
        GetWorkflowTemplateById(){
            this.id = this.$route.query.tpId;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetWorkflowTemplateById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            var arr = JSON.parse(res.result.item.viewJson);
                            this.nodeList = arr.nodeList;
                            this.linkList = arr.linkList;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
    },
    created() {
        // var data = this.$route.query;
        // if (data.id) {
        //     for (var i = 0; i < this.list.length; i++) {
        //         if (this.list[i].id == data.id) {
        //             this.nodeList = this.list[i]['chanrtJson']['nodes'];
        //             this.linkList = this.list[i]['chanrtJson']['edges'];
        //         }
        //     }
        // }
        this.GetWorkflowTemplateById();
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
