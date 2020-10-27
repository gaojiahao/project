<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-27 12:31:45
-->
<template>
<div>
    <div style="display: flex;flex-direction:row;flex-wrap: wrap">
        <XCalendar></XCalendar>
        <Card style="margin: 10px 10px;width:400px;background-color: #f5fffa; flex:1">
            代办
        </Card>

    </div>
    <div class="">
        <Card style="margin: 0px 10px 10px 0px;width:100%;background-color: #f5fffa; flex:1;height:150px">
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
    Card
} from "view-design";
import TestForm from "@components/basicinfo/testForm";
import TestTree from "@components/basicinfo/testTree";
import Test from "@components/basicinfo/test";
import XTable from "@views/home/table";
import XCalendar from "@views/home/calendar";

export default {
    name: "Index",
    components: {
        Card,
        TestForm,
        TestTree,
        XTable,
        XCalendar
    },
}
</script>
