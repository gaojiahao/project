<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 16:56:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-10 11:16:10
-->
<template>
<div class="break-container">
    <Breadcrumb :style="{ margin: '16px 0', float: 'left' }">
        <BreadcrumbItem v-if="leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.name" @click.native="goMenu(leftMenu.oneLevel)">{{leftMenu.oneLevel.name}}</BreadcrumbItem>
        <BreadcrumbItem v-if="leftMenu&&leftMenu.twoLevel&&leftMenu.twoLevel.name" @click.native="goMenu(leftMenu.oneLevel,leftMenu.twoLevel)">
            {{leftMenu.twoLevel&&leftMenu.twoLevel.name}}
        </BreadcrumbItem>
        <BreadcrumbItem v-if="leftMenu&&leftMenu.thirdLevel&&leftMenu.thirdLevel.name" @click.native="goMenu(leftMenu.oneLevel,leftMenu.twoLevel,leftMenu.thirdLevel)">{{leftMenu.thirdLevel&&leftMenu.thirdLevel.name}}</BreadcrumbItem>
    </Breadcrumb>
</div>
</template>

<script>
import {
    Breadcrumb,
    BreadcrumbItem,
} from "view-design";

export default {
    name: "breadCrumbNav",
    props: {},
    components: {
        Breadcrumb,
        BreadcrumbItem,
    },
    computed: {
        leftMenu() {
            if (this.$store.state.menuRouter) {
                return this.$store.state.menuRouter;
            } else {
                return JSON.parse(window.sessionStorage.getItem('activeMenu'));
            }
        }
    },
    data() {
        return {};
    },
    methods: {
        goMenu(one, two, third) {
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
        }
    }
};
</script>

<style lang="scss" scoped>
.break-container {
    width: 100%;
    display: inline-block;
}
</style>
