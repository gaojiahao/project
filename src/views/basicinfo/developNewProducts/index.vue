<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-28 09:54:03
-->
<template>
<router-view></router-view>
</template>
<script>
export default {
    watch: {
        //路由监听,解决返回后的tab不在详情页
        $route: {
            handler: function(val, oldVal){
                // debugger
            },
            // 深度观察监听
            deep: true
        }
    },
}
</script>
