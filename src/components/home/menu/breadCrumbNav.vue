<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 16:56:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-10 09:57:47
-->
<template>
<div class="break-container">
    <Breadcrumb :style="{ margin: '16px 0', float: 'left' }">
        <BreadcrumbItem v-if="leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.name" @click.native="goMenu(leftMenu.oneLevel.value)">{{leftMenu.oneLevel.name}}</BreadcrumbItem>
        <BreadcrumbItem v-if="(leftMenu&&leftMenu.twoLevel&&leftMenu.twoLevel.name)||
        (leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.children[0]&&leftMenu.oneLevel.children[0]['name'])" @click.native="goMenu(leftMenu.twoLevel.value)">
            {{(leftMenu.twoLevel&&leftMenu.twoLevel.name)||(leftMenu&&leftMenu.oneLevel&&leftMenu.oneLevel.children[0]&&leftMenu.oneLevel.children[0]['name'])}}
        </BreadcrumbItem>
        <BreadcrumbItem v-if="leftMenu&&leftMenu.thirdLevel&&leftMenu.thirdLevel.name" @click.native="goMenu(leftMenu.thirdLevel.value)">{{leftMenu.thirdLevel.name}}</BreadcrumbItem>
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
        goMenu(value) {
            this.$router.push('/' + value);
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
