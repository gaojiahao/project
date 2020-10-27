<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 16:56:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-26 18:22:37
-->
<template>
<div class="break-container">
    <Breadcrumb :style="{ margin: '16px 0', float: 'left' }">
        <BreadcrumbItem>基础信息</BreadcrumbItem>
        <BreadcrumbItem>店铺管理</BreadcrumbItem>
        <BreadcrumbItem>添加店铺</BreadcrumbItem>
    </Breadcrumb>
</div>
</template>

<script>
import {
    Breadcrumb,
    BreadcrumbItem,
} from "view-design";

export default {
    name: "breadCrumbNav",
    props: {},
    components: {
        Breadcrumb,
        BreadcrumbItem,
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.break-container {
    width: 100%;
    height: 60px;
    line-height: 46px;
    display: inline-block;
}
</style>
