<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-29 18:55:40
-->
<template>
<div id="app" v-title data-title="跨境电商ERP">
    <!--<login v-if="!RouterState"></login>
    <Home v-else></Home>-->
    <router-view />
</div>
</template>

<script>
import tokenService from "@service/tokenService";

export default {
    name: 'app',
    components: {},
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            RouterState: true,
        };
    },
    methods: {
        goBack() {
            console.log('进行了页面操作')
        },
        reload() {
            this.RouterState = false;
            this.$nextTick(() => {
                this.RouterState = true;
            })
        }
    },
    created() {
        var token = tokenService.getToken(true);
        console.log(token);
        if (token) {
            this.logginStatus = true;
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
