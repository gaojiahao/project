<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-15 11:58:09
-->
<template>
<div>
    <div style="margin-top: 10px;width: 100%;height: 20px;" v-show="showSave">
        <Button type="primary" :style="{float:'right'}" @click="saveLayoutConfig" size="small">保存布局</Button>
    </div>
    <grid-layout :layout.sync="layoutConfig" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
        <grid-item v-for="item in layoutConfig" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" @moved="movedEvent" @resized="resizedEvent">
            <XCalendar v-if="item.component=='XCalendar'"></XCalendar>
            <XMessage :messageList="messageList" v-else-if="item.component=='XMessage'"></XMessage>
            <XQuick :quickList="quickList" v-else-if="item.component=='XQuick'"></XQuick>
            <XTable v-else-if="item.component=='XTable'"></XTable>
            <template v-else>
                <div style="background: #2d8cf0; width:100%;height: 100%;">自定义模块</div>
            </template>
        </grid-item>
    </grid-layout>
</div>
</template>

<script>
const xTable = ()=>import("@views/home/table");
const calendar = ()=>import("@views/home/calendar");
const xMessage = ()=>import("@views/home/message");
const xQuick = ()=>import("@views/home/quick");
import VueGridLayout from 'vue-grid-layout';
import LayoutJs from './layout'

export default {
    name: "Index",
    components: {
        XTable:xTable,
        XCalendar:calendar,
        XMessage:xMessage,
        XQuick:xQuick,
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
    },
    mixins: [LayoutJs],
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

            }, ],
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
            }, ]
        };
    },
    methods: {
        movedEvent() {
            this.showSave = true;
            console.log('拖动结束！')
        },
        saveLayoutConfig() {
            this.showSave = false;
            console.log('保存页面布局成功！');
        },
        resizedEvent() {
            this.showSave = true;
            console.log('调整大小结束！')
        },
    },
    created() {}
}
</script>
