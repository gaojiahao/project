<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-23 15:44:46
-->
<template>
    <div class="layout">
        <Layout>
            <Header class="header">
                <Head></Head>
            </Header>
            <Layout  class='container'>
                <Sider breakpoint="md" class="container-sider" v-model="isCollapsed" collapsible :collapsed-width="78">
                    <Menu active-name="1-2" :theme="theme1" width="auto" :open-names="['1']" :class="menuitemClasses">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                分类管理
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                属性管理
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                品牌管理
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <div :class="[isCollapsed ? 'marginRight':'marginLeft']"  class="content">
                    <div class="content-panel">
                        <div class="break-container">
                            <Breadcrumb :style="{margin: '16px 0',float:'left'}">
                                <BreadcrumbItem>Home</BreadcrumbItem>
                                <BreadcrumbItem>Components</BreadcrumbItem>
                                <BreadcrumbItem>Layout</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div style="display: flex;flex-direction:row;flex-wrap: nowrap;justify-content: flex-start; width: 100%;">
                                <Card style="margin: 10px 10px;width:300px;background-color: #c1cbd7; height: 750px;">
                                    <TestTree></TestTree>
                                </Card>
                                <div>
                                    <Card style="margin: 10px 10px;width:600px;background-color: #c1cbd7;">
                                        <TestForm></TestForm>
                                    </Card>
                                    <Card style="margin: 10px 10px;width:600px;background-color: #c1cbd7;">
                                        <Test></Test>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import {
    Layout,
    Header,
    Content,
    Menu,
    MenuItem,
    Icon,
    Submenu,
    MenuGroup,
    RadioGroup,
    Sider,
    Breadcrumb,
    BreadcrumbItem,
    Card
} from 'view-design';
import Head from "@/components/home/head/head";
import LeftMenu from "@/components/home/menu/leftMenu";
import TestForm from '@components/basicinfo/testForm';
import TestTree from '@components/basicinfo/testTree';
import Test from '@components/basicinfo/test';

export default {
    name: "Home",
    components: {
        Head,
        LeftMenu,
        Layout,
        Header,
        Menu,
        MenuItem,
        Icon,
        Submenu,
        MenuGroup,
        RadioGroup,
        Sider,
        Breadcrumb,
        BreadcrumbItem,
        Card,
        TestForm,
        TestTree,
        Test
    },
    data() {
        return {
            isCollapsed: false,
            theme1:'dark'
        }
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        
    },
    created() {
        
    },
};
</script>
<style lang="scss" scoped>
@import '@scss/home/home';
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: white;
}
</style>
