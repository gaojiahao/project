<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 16:22:10
-->
<template>
<div>
    <div style="display: flex;flex-direction:row;flex-wrap: wrap">
        <XCalendar></XCalendar>
        <XMessage :messageList="messageList"></XMessage>
    </div>
    <div class="">
        <Card style="margin: 0px 10px 10px 0px;width:100%;background-color: #ffffff; flex:1;height:150px">
            快捷入口
        </Card>
    </div>
    <Card class="">
        <XTable></XTable>
    </Card>
</div>
</template>

<script>
import {
    Tree,
    Card,
} from "view-design";
import TestForm from "@components/basicinfo/testForm";
import TestTree from "@components/basicinfo/testTree";
import Test from "@components/basicinfo/test";
import XTable from "@views/home/table";
import XCalendar from "@views/home/calendar";
import XMessage from "@views/home/message";

export default {
    name: "Index",
    components: {
        Card,
        TestForm,
        TestTree,
        XTable,
        XCalendar,
        XMessage,
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

            }, ]
        };
    },
}
</script>
