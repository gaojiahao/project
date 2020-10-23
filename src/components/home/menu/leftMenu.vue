<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 14:58:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-22 17:59:31
-->
<template>
<div class="ivu-layout-my-left-menu">
    <Sider breakpoint="md" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',background: '#fff',top:'64px'}" v-model="isCollapsed" collapsible :collapsed-width="78">
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" :class="menuitemClasses">
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
    <BreadcrumbNav>
    </BreadcrumbNav>
</div>
</template>

<script>
import {
    Row,
    Col,
    Menu,
    MenuItem,
    Icon,
    Submenu,
    MenuGroup,
    RadioGroup,
    Radio,
    Sider,
    Layout
} from 'view-design';
import BreadcrumbNav from "@/components/home/menu/breadCrumbNav";

export default {
    name: "LeftMenu",
    components: {
        Row,
        Col,
        Menu,
        MenuItem,
        Icon,
        Submenu,
        MenuGroup,
        RadioGroup,
        Radio,
        Sider,
        BreadcrumbNav,
        Layout
    },
    data() {
        return {
            theme2: 'dark',
            isCollapsed: false
        }
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.ivu-layout-my-left-menu {
    flex-direction: row;
    display: flex;
    /* flex-direction: column; */
    flex: auto;
    background: #f5f7f9;
}

.layout-con {
    height: 100%;
    width: 100%;
}

.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}

.menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}

.collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
}

.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>
