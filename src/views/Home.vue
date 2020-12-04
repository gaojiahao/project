<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 15:30:56
-->
<template>
<div class="layout">
    <Layout>
        <!-- 顶部菜单 -->
        <Header class="header">
            <Head :menuList="menuList"></Head>
        </Header>
        <Layout class="container">
            <!-- 左侧菜单 -->
            <Sider ref="side1" hide-trigger breakpoint="md" class="container-sider" v-model="isCollapsed" collapsible :collapsed-width="78" v-if="leftMenu&&leftMenu.oneLevel.children&&leftMenu.oneLevel.children.length" :width="150">
                <Menu active-name="typeManager" :theme="theme1" width="auto" :open-names="['1']" :class="menuitemClasses">
                    <div class="title-menu">
                        <Icon type="ios-apps" :style="{verticalAlign: '-0.05em'}" @click.native="collapsedSider" />
                        <span v-show="!isCollapsed">{{leftMenu&&leftMenu.oneLevel.name}}</span>
                    </div>
                    <template v-for="(item,index) in leftMenu&&leftMenu.oneLevel.children">
                        <XSubmenu :item="item" :parentItem="leftMenu" :isCollapsed="isCollapsed">
                        </XSubmenu>
                    </template>
                </Menu>
            </Sider>
            <!-- 右侧内容模块 -->
            <div :class="[ leftMenu&&leftMenu.oneLevel.name!='index'&&leftMenu.oneLevel.children&&leftMenu.oneLevel.children.length ? (isCollapsed ? 'marginRight' : 'marginLeft') : 'nomargin']" class="content">
                <div class="content-panel">
                    <!-- 面包屑导航条 -->
                    <BreadcrumbNav v-if="leftMenu&&leftMenu.oneLevel.children&&leftMenu.oneLevel.children.length" ref="breadcrumbNav"></BreadcrumbNav>
                    <!-- 内容模块 -->
                    <transition>
                        <keep-alive>
                            <router-view v-if="routerAlive"></router-view>
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
    Submenu,
    MenuGroup,
    Sider,
    Breadcrumb,
    BreadcrumbItem,
    Card
} from "view-design";
import Head from "@/components/home/head/head";
import BreadcrumbNav from "@/components/home/menu/breadCrumbNav";
import Index from "@mixins/index";
import tokenService from "@service/tokenService";
import XSubmenu from "@/components/home/menu/xSubMenu/xSubmenu";

export default {
    name: "Home",
    components: {
        Head,
        Layout,
        Header,
        Menu,
        MenuItem,
        Submenu,
        MenuGroup,
        Sider,
        Breadcrumb,
        BreadcrumbItem,
        Card,
        BreadcrumbNav,
        XSubmenu
    },
    mixins: [
        Index,
    ],
    watch:{
        $route(to,from){
            var flag = false;
            if(to.meta.group!=from.meta.group){
                flag = true;
            }
            this.$refs.breadcrumbNav&&this.$refs.breadcrumbNav.setMenu(to,from,flag);
        }
    },
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
        leftMenu() {
            //初始化菜单数据
            if (this.$store.state.menuRouter.oneLevel) {
                return this.$store.state.menuRouter;
            } else {
                this.$store.commit('setMenuRouter', JSON.parse(window.sessionStorage.getItem('activeMenu')));
                return JSON.parse(window.sessionStorage.getItem('activeMenu'));
            }
        }
    },
    methods: {
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
    },
    created() {
        var activeMenu = this.$store.state.menuRouter;
        if (activeMenu && activeMenu.oneLevel) {
            console.log('已经有菜单了', activeMenu);
        } else {
            var data = {};
            var active = this.$route.name;
            data['oneLevel'] = this.menuList[active];
            this.$store.commit('setMenuRouter', data);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@scss/home/home";
</style>
<style scoped>
.ivu-menu-vertical /deep/ .ivu-menu-submenu-title-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
}
>>>.ivu-layout-header {
    height: 54px;
    line-height: 54px;
}
</style>
