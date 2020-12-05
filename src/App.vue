<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-05 11:03:25
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
    // mounted() {
    //     //第一个输入框获取焦点
    //     function initEl() {
    //         var controls = document.getElementsByTagName('input');
    //         for (var i = 0; i < controls.length; i++) {
    //             if (i == 0 && controls[i].type == 'text') {
    //                 controls[i].focus();
    //             }
    //         }
    //     }
    //     window.onload = function () {
    //         initEl();
    //     }
    //     var inputGroup = document.getElementsByTagName("input");
    //     var inputGroupArr = Array.from(document.getElementsByTagName("input"));
    //     var iGlength = inputGroupArr.length;
    //     document.onkeypress = function (e) {
    //         var e = event || e;
    //         console.log(inputGroupArr.indexOf(e.srcElement));
    //         var idx = inputGroupArr.indexOf(e.srcElement);
    //         console.log(e, e.keyCode, e.srcElement, e.which);
    //         if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
    //             console.log(idx)
    //             if (idx == iGlength - 1) { //表明已经是最后一个输入框
    //                 document.getElementsByTagName("button")[0].focus();
    //             } else {
    //                 inputGroup[idx + 1].focus();
    //             }
    //             e.preventDefault();
    //         }
    //         console.log(e, e.keyCode, e.srcElement, e.which);
    //     }
    // }
}
</script>
<style lang="less">
.ivu-message-notice-content {
    font-size: 20px;
}
</style>
<style scoped>
>>>.ivu-message .ivu-icon {
    font-size: 24px;
}
</style>
<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
