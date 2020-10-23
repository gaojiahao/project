<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 16:56:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-23 09:59:09
-->
<template>
<div class="nav">
    <div class="top-nav">
        <Breadcrumb :style="{float: 'left'}">
            <BreadcrumbItem>主页</BreadcrumbItem>
            <BreadcrumbItem>分类管理</BreadcrumbItem>
            <BreadcrumbItem>新建</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <!-- <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <TestForm></TestForm>
    </Content> -->
    <Card>
        <div style="height: 800px">Content</div>
    </Card>
</div>
</template>

<script>
import {
    Breadcrumb,
    BreadcrumbItem,
    Content,
    Layout,
    Card
} from 'view-design';
import TestForm from '@components/basicinfo/testForm'
import TestTree from '@components/basicinfo/testTree'

export default {
    name: "BreadcrumbNav",
    props: {

    },
    components: {
        Breadcrumb,
        BreadcrumbItem,
        Content,
        Layout,
        TestForm,
        TestTree,
        Card
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
.nav {
    background: #f5f7f9;
    width: 100%;
    padding: 24px;
    position: fixed;
    height: 100vh;
    right: 0;
    top: 64px;
    left: 200px;
    overflow-x:scroll;
    flex:auto; 
}

.top-nav {
    height: 40px;
    line-height: 40px;
}
</style>
