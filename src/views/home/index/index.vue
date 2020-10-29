<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 17:54:08
-->
<template>
<div>
    <div style="display: flex;flex-direction:row;flex-wrap: wrap">
        <XCalendar></XCalendar>
        <XMessage :messageList="messageList"></XMessage>
    </div>
    <XQuick :quickList="quickList"></XQuick>
    <Card class="">
        <XTable></XTable>
    </Card>
</div>
</template>

<script>
import {
    Card,
} from "view-design";
import XTable from "@views/home/table";
import XCalendar from "@views/home/calendar";
import XMessage from "@views/home/message";
import XQuick from "@views/home/quick";

export default {
    name: "Index",
    components: {
        Card,
        XTable,
        XCalendar,
        XMessage,
        XQuick
    },
    data() {
        return {
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
            }, ]
        };
    },
}
</script>
