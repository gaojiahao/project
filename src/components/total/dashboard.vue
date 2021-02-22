<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-22 11:25:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 11:43:32
-->
<style lang="less">
    .demo-Circle-custom{
        & h1{
            color: #3f414d;
            font-size: 28px;
            font-weight: normal;
        }
        & p{
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }
        & span{
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;
            &:before{
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -15px;
            };
        }
        & span i{
            font-style: normal;
            color: #3f414d;
        }
    }
</style>
<template>
    <div class="siggle-chart">
        <i-circle
            :size="250"
            :trail-width="4"
            :stroke-width="5"
            :percent="75"
            stroke-linecap="square"
            stroke-color="#43a3fb">
            <div class="demo-Circle-custom">
                <h1>100</h1>
                <p>开发总数量</p>
                <span>
                    我的占比
                    <i>75%</i>
                </span>
            </div>
        </i-circle>
    </div>
</template>
<script>
import {
    Circle
} from "view-design";

export default {
    name:"Dashboard",
    components: {
        
    },
}
</script>