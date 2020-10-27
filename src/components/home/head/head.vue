<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 14:56:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-26 19:47:09
-->
<template>
<div>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <li class="item"><img :src="asetLogoUrl" /></li>
        <li class="item title">后台管理系统</li>
        <template v-for="(item,index) in menuList">
            <router-link :to="'/'+item.value">
                <MenuItem name="item.value" v-if="item.value=='index'" @click.native="clickMenu(item)" :class="[item.value==activeIndex ? 'active' : '']" >
                <Icon type="ios-paper" />
                {{ item.name }}
                </MenuItem>
                <Submenu :name="item.value" :key="index" v-if="item.value!='index'">
                    <template slot="title">
                        <Icon type="ios-people" />
                        {{ item.name }}
                    </template>
                    <MenuGroup :title="data.name" v-for="(data,k) in item.children" :key="k">
                        <MenuItem :name="item.value+'-'+dItem.value" v-for="(dItem,y) in data.children" :key="y">
                        {{dItem.name}}
                        </MenuItem>
                    </MenuGroup>
                </Submenu>
            </router-link>
        </template>
        <li class="right-item right-title">
            admin
        </li>
        <li class="right-item right-title">
            <img :src="asetUserUrl" />
        </li>
        <li class="right-item right-title" style="padding:0px;">
            |
        </li>
        <li class="right-item right-title">小竹熊ERP管理系统</li>
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
            asetLogoUrl: require("@assets/default/logo.png"),
            asetUserUrl: require("@assets/default/ava01.png"),
            theme1: "dark",
            activeIndex: 'index',
        };
    },
    methods: {
        clickMenu(one, two, third) {
            var data = {};
            if (one) {
                data['oneLevel'] = one;
            }
            if (two) {
                data['twoLevel'] = two;
            }
            if (third) {
                data['thirdLevel'] = third;
            }
            var storage = window.sessionStorage;
            storage.setItem("activeIndex", one.value);
            this.activeIndex = one.value;
            this.$store.commit('setMenuRouter', data);
            this.$emit('on-setmenu', {});
        }
    },
    created() {
        var storage = window.sessionStorage;
        var value = storage.getItem("activeIndex");  
        this.activeIndex = value; 
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

.active{
    color: white;
}
.title {
    color: #fff;
    font-size: 24px;
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
</style>
