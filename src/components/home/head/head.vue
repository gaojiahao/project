<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 14:56:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-25 10:20:09
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
                    <DropdownItem @click.native="goUserInfo">个人档案</DropdownItem>
                    <DropdownItem @click.native="">用户设置</DropdownItem>
                    <Dropdown placement="right-start">
                        <DropdownItem>
                            主题设置
                            <Icon type="ios-arrow-forward"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="changeTheme(0)" :selected="theme==0 ? true:false">默认</DropdownItem>
                            <DropdownItem @click.native="changeTheme(1)" :selected="theme==1 ? true:false">叶兰绿</DropdownItem>
                            <DropdownItem @click.native="changeTheme(2)" :selected="theme==2 ? true:false">赤城红</DropdownItem>
                            <DropdownItem @click.native="changeTheme(3)" :selected="theme==3 ? true:false">深夜黑</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
            {{userRole}}
        </li>
    </Menu>
</div>
</template>

<script>
import {
    Menu,
    MenuItem,
    Submenu,
    MenuGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem
} from "view-design";
import YSubmenu from "@/components/home/menu/xSubMenu/ySubmenu";
const XZX_TOKEN_KEY = "XZX_LOGIN_TOKEN";
const ERP_ROLE = "ERP_ROLE";
const localStorage = window["localStorage"];
const sessionStorage = window["sessionStorage"];
export default {
    name: "Head",
    props: {
        menuList: {
            type: Object,
            default () {
                return {}
            }
        },
        userRole:{
            type:String,
            default:''
        }

    },
    components: {
        Menu,
        MenuItem,
        Submenu,
        MenuGroup,
        YSubmenu,
        Dropdown,
        DropdownMenu,
        DropdownItem
    },
    watch:{
        menuList: {
            handler(val){
                
            },
            deep:true,
        },
        userRole:{
            handler(val){

            },
            deep:true
        }
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
            userInfo: {},
            theme:0
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
        goUserInfo(){  
            this.$router.push({name:'userInfo'});
        },
        loginOut() {
            localStorage.removeItem(XZX_TOKEN_KEY);
            localStorage.clear();
            sessionStorage.clear();
            this.$store.commit('clearMenuRouter');
            this.$store.commit('clearAuth');
            this.$router.push('/login');
        },
        changeTheme(colortype){
            localStorage.setItem('themeColor',colortype);    //保存使用主题色
            document.body.classList.remove(window.cssStyle); //去除已有主题色
            window.cssStyle=this.colorList[Number(colortype)];    //获取新的主题色
            document.body.classList.add(window.cssStyle);    //body添加主题色的class
        
            let themeColor = localStorage.getItem('themeColor'); // 判断是否已存在使用的皮肤
            if (themeColor) {
                window.cssStyle=this.colorList[Number(themeColor)];
            }else {
            localStorage.setItem('themeColor','0');  // 不存在则储存一个默认的主题色
            }
            document.body.classList.add(window.cssStyle);  //body 添加less中主题色的
            this.theme = colortype;
        }
    },
    created() {
        var storage = window.sessionStorage;
        var value = JSON.parse(storage.getItem("activeMenu"));
        this.userInfo = JSON.parse(localStorage.getItem(XZX_TOKEN_KEY))['userInfo'];
        this.activeIndex = value && value.oneLevel && value.oneLevel.value;
        
        this.colorList = ['default','green','red','black']; //全局变量
        var index = localStorage.getItem('themeColor'); // 判断是否已存在使用的皮肤
        this.theme = index;
        Window.themeColor=this.colorList[index];    
    },
};
</script>

<style lang="less" scoped>
.item {
    float: left;
    padding: 0 10px 0 10px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all 0.2s ease-in-out;
    color: #fff;
    height: 54px;

    img {
        width: 30px;
        vertical-align: middle;
    }
}
.active {
    color: white;
}
.title {
    color: #fff;
    font-size: 24px;
    padding: 0 10px 0 10px;
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
        vertical-align: middle;
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
.ivu-menu-horizontal /deep/ .ivu-menu-submenu /deep/ {
    padding: 0 10px 0 10px;
}
</style><style scoped>
>>>.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
    padding: 7px 16px 8px;
    font-size: 12px !important;
}
>>>.ivu-menu-horizontal {
    height: 54px;
    line-height: 54px;
}
</style>
