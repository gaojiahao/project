<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 14:56:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-29 15:22:10
-->
<template>
<div class="head">
    <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="(key) => changeMenu(key, 'first')">
        <li class="item"><img :src="systemInfo.asetLogoUrl" /></li>
        <li class="item title">后台管理系统</li>
        <template v-for="(item,index) in menuList">
            <MenuItem name="item.value" v-if="item.value=='index'" @click.native="clickMenu(item)" :class="[item.value==activeIndex ? 'active' : '']">
            <Icon type="ios-paper" />
            {{ item.name }}
            </MenuItem>
            <Submenu :name="item.value" :key="index" v-if="item.value!='index'">
                <template slot="title">
                    <Icon type="ios-people" @click.native="clickMenu(item)" />
                    {{ item.name }}
                </template>
                <MenuGroup :title="data.name" v-for="(data,k) in item.children" :key="k" @click.native="clickMenu(item,data)">
                    <MenuItem :name="item.value+'-'+dItem.value" v-for="(dItem,y) in data.children" :key="y">
                    {{dItem.name}}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
        </template>
        <li class="right-item right-title">
            admin
        </li>
        <li class="right-item right-title">
            <img :src="systemInfo.asetUserUrl" />
        </li>
        <li class="right-item right-title" style="padding:0px;">
            |
        </li>
        <li class="right-item right-title">{{systemInfo.name}}</li>
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
    Radio
} from "view-design";
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
        Radio
    },
    data() {
        return {
            systemInfo: {
                name: '小竹熊ERP管理系统',
                asetLogoUrl: require("@assets/default/logo.png"),
                asetUserUrl: require("@assets/default/ava01.png"),
            },
            theme1: "dark",
            activeIndex: 'index',

        };
    },
    methods: {
        clickMenu(one, two, third) {
            var data = {};
            var storage = window.sessionStorage;
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
            storage.setItem("activeMenu", JSON.stringify(data));
            this.activeIndex = data;
            // this.$store.commit('setMenuRouter', data);
            // this.$emit('on-setmenu', {});
            this.$router.push(routerPath);
        },
        changeMenu(data, type) {
            console.log(data, type);
        }
    },
    created() {
        var storage = window.sessionStorage;
        var value = JSON.parse(storage.getItem("activeMenu"));
        this.activeIndex = value.oneLevel.value;
    },
    mounted() {
        let that = this;
        var x = document.querySelector(".ivu-menu-submenu-title");
        for (var i = 0; i < x.lenght; i++) {
            x[i].addEventListener("click", function (e) {
                that.changeMenu(e);
            })
        }
    }
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

.ivu-menu-item-group-title {
    font-size: 14px;
}
</style>
