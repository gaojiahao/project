<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-28 15:54:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 17:51:06
-->
<template>
<div style="">
    <Card style="margin: 0px 10px 10px 0px;width:100%;background-color: #ffffff; flex:1;height:150px">
        <div style="width: 200px;text-align: left;">快捷入口</div>
        <Divider />
        <div style="width:100%;" v-for="(item,index) in quickList" :key='index'>
            <div style=" width:100px;float:left; height:64px;">
                <img :src="item.src" style="width:30px; height:30px">
                <div style="margin-top:10px; font-size:12px;">{{item.name}}</div>
            </div>
        </div>
    </Card>
</div>
</template>

<script>
import {
    Card,
    Divider
} from "view-design";
export default {
    name: 'Quick',
    props: {
        quickList: {
            type: Array,
            default () {
                return []
            }
        },
    },
    computed: {

    },
    components: {
        Card,
        Divider
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.ivu-divider-horizontal {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
