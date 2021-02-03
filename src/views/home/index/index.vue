<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-03 09:45:32
-->
<template>
    <div :class="{drag:dragging}">
        <div class="layout-container">
            <div :class="key" v-for="(item, key) in mainData" :key="key">
                <draggable v-bind="dragOptions" class="list-group" :list="item" @end="onEnd" @start="onStart">
                    <transition-group name="list">
                        <div class="list-group-item" v-for="(element) in item" :key="element.id">
                            <div class="panel-actions">
                                <Dropdown :transfer="true">
                                    <a href="javascript:void(0)" style="color:#fff">
                                        <Icon type="md-more" />
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem @click.native="refresh(element.name)">刷新</DropdownItem>
                                        <DropdownItem @click.native="showPop(true)">编辑</DropdownItem>
                                        <DropdownItem @click.native="del(element)">隐藏</DropdownItem>
                                        <DropdownItem @click.native="showPop2(true)" divided>添加区块</DropdownItem>
                                        <DropdownItem @click.native="recovery()">恢复默认</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="drag-handle">{{ element.title }}</div>
                            <div class="component-box">
                                <component :is="element.name" v-if="element.name=='XMessage'" :messageList="messageList" :ref="element.name" />
                                <component :is="element.name" v-else-if="element.name=='XQuick'" :quickList="quickList" :ref="element.name" />
                                <component :is="element.name" v-else :ref="element.name" />
                            </div>
                        </div>
                    </transition-group>
                </draggable>
            </div>
        </div>
        <ModalForm :titleText="title" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
        <ModalForm :titleText="title2" :formValidate="formValidate2" :ruleValidate="ruleValidate" :showModel='showModel2' :formConfig="formConfig2" @save="save2" @show-pop="showPop2" @clear-form-data="clearFormData2" ref="form2"></ModalForm>
    </div>
</template>

<script>
import { Dropdown,DropdownMenu,DropdownItem } from "view-design";
const xTable = ()=>import("@views/home/table");
const calendar = ()=>import("@views/home/calendar");
const xMessage = ()=>import("@views/home/message");
const xQuick = ()=>import("@views/home/quick");
import ModalForm from "@components/public/form/modalForm"
import VueGridLayout from 'vue-grid-layout';
import LayoutJs from './layout';
import draggable from "vuedraggable";
import config from '@views/home/index/indexConfig'

export default {
    name: "Index",
    components: {
        XTable:xTable,
        XCalendar:calendar,
        XMessage:xMessage,
        XQuick:xQuick,
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        draggable,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        ModalForm
    },
    computed: {
        dragOptions() {
            return {
                animation: 30,
                handle: ".drag-handle",
                group: "description",
                ghostClass: "ghost",
                chosenClass: "sortable",
                forceFallback: true,
            };
        }
    },
    mixins: [LayoutJs,config],
    data() {
        return {
            showSave: false,
            messageList: [{
                type: 'wait',
                text: '今日待办1',

            }, {
                type: 'wait',
                text: '今日待办2',

            }, {
                type: 'warn',
                text: '今日待办3',

            }, {
                type: 'expect',
                text: '今日待办4',

            }, {
                type: 'wait',
                text: '今日待办1',

            }, {
                type: 'wait',
                text: '今日待办2',

            }, {
                type: 'warn',
                text: '今日待办3',

            }, {
                type: 'expect',
                text: '今日待办4',

            }, {
                type: 'expect',
                text: '今日待办4',

            }, {
                type: 'expect',
                text: '今日待办4',

            }, {
                type: 'expect',
                text: '今日待办4',

            },  {
                type: 'expect',
                text: '今日待办4',

            }, {
                type: 'expect',
                text: '今日待办4',

            },],
            quickList: [{
                name: '开发新品',
                src: require('@assets/quick/createProduct.png'),
                path: '/createProduct',
            }, {
                name: '新店入驻',
                src: require('@assets/quick/addStore.png'),
                path: '/addStore',
            }, {
                name: '预期查询',
                src: require('@assets/quick/selectExpect.png'),
                path: '/selectExpect',
            }, {
                name: '新增供应商',
                src: require('@assets/quick/addGuest.png'),
                path: '/addGuest',
            }, {
                name: '自定义',
                src: require('@assets/quick/custom.png'),
                path: '/custom',
            }, {
                name: '开发新品',
                src: require('@assets/quick/createProduct.png'),
                path: '/createProduct',
            }, {
                name: '新店入驻',
                src: require('@assets/quick/addStore.png'),
                path: '/addStore',
            }, {
                name: '预期查询',
                src: require('@assets/quick/selectExpect.png'),
                path: '/selectExpect',
            }, {
                name: '新增供应商',
                src: require('@assets/quick/addGuest.png'),
                path: '/addGuest',
            }, {
                name: '自定义',
                src: require('@assets/quick/custom.png'),
                path: '/custom',
            },{
                name: '开发新品',
                src: require('@assets/quick/createProduct.png'),
                path: '/createProduct',
            }, {
                name: '新店入驻',
                src: require('@assets/quick/addStore.png'),
                path: '/addStore',
            }, {
                name: '预期查询',
                src: require('@assets/quick/selectExpect.png'),
                path: '/selectExpect',
            }, {
                name: '新增供应商',
                src: require('@assets/quick/addGuest.png'),
                path: '/addGuest',
            }, {
                name: '自定义',
                src: require('@assets/quick/custom.png'),
                path: '/custom',
            },{
                name: '开发新品',
                src: require('@assets/quick/createProduct.png'),
                path: '/createProduct',
            }, {
                name: '新店入驻',
                src: require('@assets/quick/addStore.png'),
                path: '/addStore',
            }, {
                name: '预期查询',
                src: require('@assets/quick/selectExpect.png'),
                path: '/selectExpect',
            }, {
                name: '新增供应商',
                src: require('@assets/quick/addGuest.png'),
                path: '/addGuest',
            }, {
                name: '自定义',
                src: require('@assets/quick/custom.png'),
                path: '/custom',
            },{
                name: '开发新品',
                src: require('@assets/quick/createProduct.png'),
                path: '/createProduct',
            }, {
                name: '新店入驻',
                src: require('@assets/quick/addStore.png'),
                path: '/addStore',
            }, {
                name: '预期查询',
                src: require('@assets/quick/selectExpect.png'),
                path: '/selectExpect',
            }, {
                name: '新增供应商',
                src: require('@assets/quick/addGuest.png'),
                path: '/addGuest',
            }, {
                name: '自定义',
                src: require('@assets/quick/custom.png'),
                path: '/custom',
            }, ],
            dragging: false,
            componentList: [
                { name: "XCalendar", title: "日历", id: "5" },
                { name: "XMessage", title: "消息", id: "4" },
                { name: "XQuick", title: "快捷入口", id: "2" },
                { name: "XQuick", title: "走马灯组件", id: "1" },
                { name: "XTable", title: "上架统计", id: "3" }
            ],
            layout: {
                left: ["4", "2", "3"],
                right: ["5", "2"]
            },
            mainData: {},
            showModel: false,
            title:'编辑',
            showModel2: false,
            title2:'添加'
        };
    },
    mounted() {
        this.getLayout();
    },
    methods: {
        onStart() {
            this.dragging = true;
        },
        onEnd() {
            this.dragging = false;
            this.setLayout();
        },
        getLayout() {
            let myLayout = JSON.parse(window.localStorage.getItem("kon"));
            if (!myLayout || Object.keys(myLayout).length === 0)
                myLayout = this.layout;
            const newLayout = {};
            for (const side in myLayout) {
                newLayout[side] = myLayout[side].map(i => {
                return this.componentList.find(c => c.id === i);
                });
            }
            this.mainData = newLayout;
        },
        setLayout() {
            const res = {};
            for (const side in this.mainData) {
                const item = this.mainData[side].map(i => i.id);
                res[side]=item;
            }
            window.localStorage.setItem("kon", JSON.stringify(res));
        },
        refresh(name){
            console.log(this.$refs[name]);
        },
        save(){

        },
        showPop(flag, row) {
            this.showModel = flag;
        },
        clearFormData(){
           
        },
        save2(){

        },
        showPop2(flag, row) {
            this.showModel2 = flag;
        },
        clearFormData2(){
           
        },
        del(element){
            for (const side in this.mainData) {
                if(this.mainData[side].length){
                    for(var j=0;j<this.mainData[side].length;j++){
                        if(this.mainData[side][j]['id']==element.id){
                            this.mainData[side].splice(j, 1);
                            this.setLayout(); 
                        }
                    }
                }
            }
        },
        recovery(){
            let myLayout = this.layout;
            const newLayout = {};
            for (const side in myLayout) {
                newLayout[side] = myLayout[side].map(i => {
                return this.componentList.find(c => c.id === i);
                });
            }
            this.mainData = newLayout;
            this.setLayout();      
        }
    },
    created() {}
}
</script>
<style lang="less" scoped>

.layout-container {
  height: 100%;
  display: flex;
  margin: 20px;
  .left {
    flex: 1;
    margin-right: 20px;
  }
  .right {
    width: 550px;
  }
  .list-group-item {
    margin-bottom: 20px;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    position: relative;
    .panel-actions {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 22px;
        line-height: 40px;
        padding: 0 8px;
        color:#fff;
    }
  }
  .component-box {
    padding: 20px;
  }
  .drag-handle {
    cursor: move;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    padding: 0 20px;
    background: #6cf;
  }
}
.drag {
  .component-box {
    display: none;
  }
}
 
.list-enter-active {
  transition: all .3s linear;
 
}
.list-enter,
.list-leave-to {
  opacity: .5;
}
 
.sortable {
  .component-box {
    display: none;
    height: 0;
  }
}
.list-group {
  > span {
    display: block;
    min-height: 20px;
  }
}
 
.ghost {
  .drag-handle {
    background: rgb(129, 168, 187);
  }
}
</style>
