<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 15:34:35
-->
<template>
<div class="layout">
    <Layout>
        <!-- 顶部菜单 -->
        <Header class="header">
            <Head :menuList="menuList" :userRole="userRole"></Head>
        </Header>
        <Layout class="container">
            <!-- 左侧菜单 -->
            <Sider ref="side1" hide-trigger breakpoint="md" class="container-sider" v-model="isCollapsed" collapsible :collapsed-width="78" v-if="leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.children&&leftMenu.oneLevel.children.length" :width="150">
                <Menu active-name="typeManager" :theme="theme1" width="auto" :open-names="['1']" :class="menuitemClasses">
                    <div class="title-menu" @click="collapsedSider">
                        <Icon :type="isCollapsed ? 'md-arrow-dropleft':'md-arrow-dropright'" :style="{verticalAlign: '-0.05em'}" />
                        <span v-show="!isCollapsed">{{leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.name}}</span>
                    </div>
                    <template v-for="(item,index) in leftMenu&&leftMenu.oneLevel.children">
                        <XSubmenu :item="item" :parentItem="leftMenu" :isCollapsed="isCollapsed">
                        </XSubmenu>
                    </template>
                </Menu>
            </Sider>
            <!-- 右侧内容模块 -->
            <div :class="[ leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.name!='index'&&leftMenu.oneLevel.children&&leftMenu.oneLevel.children.length ? (isCollapsed ? 'marginRight' : 'marginLeft') : 'nomargin']" class="content">
                <div :class="leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.code=='index' ? 'index_panel':'content-panel'">
                    <!-- 面包屑导航条 -->
                    <BreadcrumbNav v-show="leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.children&&leftMenu.oneLevel.children.length" ref="breadcrumbNav"></BreadcrumbNav>
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
} from "view-design";
import Head from "@components/home/head/head";
import BreadcrumbNav from "@components/home/menu/breadCrumbNav";
import XSubmenu from "@components/home/menu/xSubMenu/xSubmenu";
import Index from "@mixins/index";
import tokenService from "@service/tokenService";
import { GetUserRoleMenu } from "@service/basicService";
const ERP_MENU = 'ERP_MENU';
const ERP_ROLE = 'ERP_ROLE';

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
            sessionApps:{},
            userRole:''
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
            if(this.menuList['index']){
                var activeMenu = this.$store.state.menuRouter;
                if (activeMenu && activeMenu.oneLevel) {
                    return  activeMenu;
                } else {
                    var data = {};
                    var active = this.$route.name;
                    data['oneLevel'] = this.menuList[active];
                    this.$store.commit('setMenuRouter', data);
                    return JSON.parse(window.sessionStorage.getItem('activeMenu'));
                }
            } else {
                return this.menuList2['index'];
            }
        }
    },
    methods: {
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
        async initMenu() {
            return GetUserRoleMenu().then(res => {
                if(res.result.code==200){
                    this.userRole = res.result.item.roleName;
                    this.dealMenu(res.result.item.modulesList);
                    window.sessionStorage.setItem('ERP_ROLE', JSON.stringify(res.result.item.roleName));
                    console.log('菜单接已加载')
                }
            });
        },
        dealMenu(data){
            for(var i=0;i<data.length;i++){
                if(data[i]['code']){
                    var text = data[i]['code'];
                    this.$set(this.menuList,text,data[i]);
                }
            }
        },
        //递归函数
        calleArr: function(data){
            for(var i=0;i<data.length;i++){
                data[i]['value'] = data[i].code;
                data[i]['status'] = data[i].enabled;
                if(data[i]['children']&&data[i]['children'].length){
                    this.calleArr(data[i]['children']);
                }
            }
        },
        async init(){
            var me = this;
            me.sessionApps = JSON.parse(sessionStorage.getItem(ERP_MENU));
            if(me.sessionApps) {
                me.menuList  = me.sessionApps;
                this.userRole = JSON.parse(window.sessionStorage.getItem('ERP_ROLE'));
            } else {
                await me.initMenu();
                sessionStorage.setItem(ERP_MENU,JSON.stringify(me.menuList));
            }
            me.$loading.hide();
        }
    },
    created() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
@import "~@less/home/home.less";
.layout /deep/
    .ivu-layout-header {
        height: 54px;
        line-height: 54px;
        padding: 0 10px;
    }
.layout /deep/
    .ivu-menu-vertical /deep/ 
    .ivu-menu-submenu-title-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
</style>
