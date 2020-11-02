<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-02 14:52:50
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <List></List>
        </div>
        <div class="right">
            <div class="right-top">
                <Add></Add>
            </div>
            <div class="right-title">
                类目绑定
            </div>
            <div class="right-bottom">
                <CategoryBind></CategoryBind>
                <CategoryBind></CategoryBind>
                <CategoryBind></CategoryBind>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Tree,
    Card
} from "view-design";
import List from "@components/basicinfo/platformManager/list";
import Add from "@components/basicinfo/platformManager/add";
import CategoryBind from "@components/basicinfo/platformManager/categoryBind";

export default {
    name: "platformManager",
    components: {
        Card,
        List,
        Add,
        CategoryBind
    },
}
</script>

<style lang="less" scoped>
.platformManager-container {
    .platformManager-container-panel {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;

        .left {
            margin: 10px 10px;
            width: 350px;
            background-color: #f5fffa;
            height: 750px;
            border: 1px solid #dcdee2;
            border-color: #e8eaec;
            transition: all 0.2s ease-in-out;
        }

        .right {
            flex: 1;

            .right-top {
                margin: 10px 10px;
                background-color: #f5fffa;
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
            }

            .right-title {
                margin: 10px 10px;
                background: linear-gradient(to top, #d2effd, #ffffff);
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                text-align: left;
                padding: 10px 20px;
            }

            .right-bottom {
                margin: 10px 10px;
                background-color: #f5fffa;
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                display: flex;
                flex-direction: row;
            }
        }
    }
}
</style>
