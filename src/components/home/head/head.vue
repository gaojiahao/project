<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 14:56:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 14:13:50
-->
<template>
<div class="head">
    <Menu mode="horizontal" :theme="theme1" active-name="index">
        <li class="item"><img :src="systemInfo.asetLogoUrl" /></li>
        <li class="item title">跨境电商ERP</li>
        <template v-for="(item,index) in menuList">
            <YSubmenu :item="item" :parentItem="menuList">
            </YSubmenu>
        </template>
        <li class="right-item right-title" style="padding:0px 10px;">
            <Dropdown>
                <div href="javascript:void(0)">
                    {{userInfo.userName}}
                    <Icon type="md-arrow-dropdown"></Icon>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native="loginOut">退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </li>
        <li class="right-item right-title" style="padding:0px 10px;">
            <img :src="systemInfo.asetUserUrl" />
        </li>
        <li class="right-item right-title" style="padding:0px;">
            |
        </li>
        <li class="right-item right-title" style="padding:0px 10px;">
            {{userInfo.name}}
        </li>
    </Menu>
</div>
</template>

<script>
import {
    Menu,
    MenuItem,
    Icon,
    Submenu,
    MenuGroup,
    RadioGroup,
    Radio,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from "view-design";
import YSubmenu from "@/components/home/menu/xSubMenu/ySubmenu";
const XZX_TOKEN_KEY = "XZX_LOGIN_TOKEN";
const localStorage = window["localStorage"];
export default {
    name: "Head",
    props: {
        menuList: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        Menu,
        MenuItem,
        Icon,
        Submenu,
        MenuGroup,
        RadioGroup,
        Radio,
        YSubmenu,
        Dropdown,
        DropdownMenu,
        DropdownItem
    },
    data() {
        return {
            systemInfo: {
                name: '超级管理员',
                asetLogoUrl: require("@assets/default/logo.png"),
                asetUserUrl: require("@assets/default/ava01.png"),
            },
            theme1: "dark",
            activeIndex: 'index',
            userInfo: {}
        };
    },
    methods: {
        clickMenu(one, two, third) {
            var data = {};
            var routerPath = "/";
            if (one) {
                data['oneLevel'] = one;
                routerPath = routerPath + one.value;
            }
            if (two) {
                data['twoLevel'] = two;
                routerPath = routerPath + '/' + two.value;
            }
            if (third) {
                data['thirdLevel'] = third;
                routerPath = routerPath + '/' + third.value;
            }
            this.activeIndex = data;
            this.$store.commit('setMenuRouter', data);
            this.$router.push(routerPath);
        },
        changeMenu(data, type) {
            console.log(data, type);
        },
        loginOut() {
            localStorage.removeItem(XZX_TOKEN_KEY);
            localStorage.clear();
            localStorage.clear();
            this.$router.push('/login');
        }
    },
    created() {
        var storage = window.sessionStorage;
        var value = JSON.parse(storage.getItem("activeMenu"));
        this.userInfo = JSON.parse(localStorage.getItem(XZX_TOKEN_KEY));
        this.activeIndex = value.oneLevel && value.oneLevel.value;
    },
};
</script>

<style lang="scss" scoped>
.item {
    float: left;
    padding: 0 20px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all 0.2s ease-in-out;
    color: #fff;

    img {
        width: 30px;
    }
}

.active {
    color: white;
}

.title {
    color: #fff;
    font-size: 24px;
    padding: 0;
}

.right-item {
    float: right;
    padding: 0 20px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all 0.2s ease-in-out;
    color: #fff;

    img {
        width: 30px;
    }
}

.right-title {
    font-size: 12px;
}

.head {

    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu .active {
        color: white;
    }

    .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
        font-size: 12px !important;
    }

}
</style><style scoped>
>>>.ivu-menu-item-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 8px;
    font-size: 14px;
    color: #515a6e;
}

>>>.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
    padding: 7px 16px 8px;
    font-size: 12px !important;
}
</style>
