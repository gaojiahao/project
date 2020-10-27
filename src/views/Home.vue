<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-27 15:27:10
-->
<template>
<div class="layout">
    <Layout>
        <!-- 顶部菜单 -->
        <Header class="header">

            <Head :menuList="menuList" @on-setmenu="setMenu"></Head>
        </Header>
        <Layout class="container">
            <!-- 左侧菜单 -->
            <Sider ref="side1" hide-trigger breakpoint="md" class="container-sider" v-model="isCollapsed" collapsible :collapsed-width="78">
                <Menu active-name="typeManager" :theme="theme1" width="auto" :open-names="['1']" :class="menuitemClasses">
                    <div class="title-menu">
                        <Icon type="ios-apps" :style="{verticalAlign: '-0.05em'}" v-show="!isCollapsed" />
                        <span v-show="!isCollapsed">基础信息</span>
                        <Icon type="ios-menu" @click.native="collapsedSider" :class="rotateIcon" />
                    </div>
                    <template v-for="(item,index) in leftMenu.children">
                        <!--<MenuItem name="item.value" v-if="!item.children">
                        <Icon type="ios-navigate" />
                        <span v-show="!isCollapsed">{{ item.name }}</span>
                        </MenuItem>-->
                        <Submenu :name="item.value" :key="index">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                <span v-show="!isCollapsed">{{ item.name }}</span>
                            </template>
                            <template v-for="(data,k) in item.children">
                                <MenuItem :name="item.value+'-'+k">
                                {{data.name}}
                                </MenuItem>
                            </template>
                        </Submenu>
                    </template>
                </Menu>
            </Sider>
            <!-- 右侧内容模块 -->
            <div :class="[isCollapsed ? 'marginRight' : 'marginLeft']" class="content">
                <div class="content-panel">
                    <!-- 面包屑导航条 -->
                    <BreadcrumbNav></BreadcrumbNav>
                    <!-- 内容模块 -->
                    <transition>
                        <keep-alive>
                            <router-view v-if="routerAlive" @click.native="routerRefresh"></router-view>
                        </keep-alive>
                    </transition>
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
} from "view-design";
import Head from "@/components/home/head/head";
import LeftMenu from "@/components/home/menu/leftMenu";
import BreadcrumbNav from "@/components/home/menu/breadCrumbNav";
import TestForm from "@components/basicinfo/testForm";
import TestTree from "@components/basicinfo/testTree";
import Test from "@components/basicinfo/test";
import Index from "@mixins/index";
import TypeManager from "@views/basicinfo/typeManager";
import tokenService from "@service/tokenService";

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
        Test,
        BreadcrumbNav,
        TypeManager,
    },
    mixins: [
        Index,
    ],
    data() {
        return {
            isCollapsed: false,
            theme1: "light",
            routerAlive: true,
        };
    },
    computed: {
        menuitemClasses: function () {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        },
        rotateIcon() {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon main-button' : ''
            ];
        },
    },
    methods: {
        routerRefresh() {
            // this.routerAlive = false;
            // this.$nextTick(() => {
            //     this.routerAlive = true;
            // });
        },
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
        setMenu() {
            this.leftMenu = this.menuList[this.$store.state.menuRouter.oneLevel.value] || [];
            console.log('leftMenu', this.leftMenu);
        }
    },
    created() {
        console.log('菜单列表', this.leftMenu)
    },
};
</script>

<style lang="scss" scoped>
@import "@scss/home/home";
</style>
