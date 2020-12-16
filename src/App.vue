<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-16 10:36:27
-->
<template>
<div id="app" v-title data-title="跨境电商ERP">
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
        reload() {
            this.RouterState = false;
            this.$nextTick(() => {
                this.RouterState = true;
            })
        }
    },
    created() {
        var token = tokenService.getToken(true);
        if (token) {
            this.logginStatus = true;
        }
    },
    mounted(){
        this.$Message.config({
            top: 300,
            duration: 2
        });
    }
}
</script>
<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.ivu-message-notice-content {
    font-size: 20px;
}
>.ivu-message .ivu-icon {
    font-size: 24px;
}
</style>
