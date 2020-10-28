<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-28 10:36:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 10:39:21
-->
<template>
<div style="background:#eee;padding: 20px">
    <Card :bordered="false">
        <p slot="title">页面加载出错</p>
        <p>页面不存在或者没有权限访问，请联系管理员！</p>
    </Card>
</div>
</template>

<script>
import {
    Card
} from "view-design";
export default {
    name: 'errorHandler',
    components: {
        Card
    }
}
</script>
