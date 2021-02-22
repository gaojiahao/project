<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-22 16:48:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 17:23:32
-->
<template>
    <div class="product_view">
        <div class="item">
            <i-circle
                :size="100"
                :trail-width="4"
                :stroke-width="5"
                :percent="75"
                stroke-linecap="square"
                stroke-color="#43a3fb">
                <div class="demo-Circle-custom">
                    <div>我的开发</div>
                    <div>12</div>
                </div>
            </i-circle>
            <div style="height:100px;">
                <div>
                    <div style="text-align: center;">已上架<span>10</span></div>
                    <div style="text-align: center;">未上架<span>2</span></div>
                </div>
            </div>
        </div>
        <div class="item">
            <i-circle
                :size="100"
                :trail-width="4"
                :stroke-width="5"
                :percent="75"
                stroke-linecap="square"
                stroke-color="#43a3fb">
                <div class="demo-Circle-custom">
                    <div>所有产品</div>
                    <div>12</div>
                </div>
            </i-circle>
            <div style="height:100px;">
                <div>
                    <div style="text-align: center;">已上架<span>10</span></div>
                    <div style="text-align: center;">未上架<span>2</span></div>
                </div>
            </div>
        </div>
        <div class="item">
            <i-circle
                :size="100"
                :trail-width="4"
                :stroke-width="5"
                :percent="75"
                stroke-linecap="square"
                stroke-color="#43a3fb">
                <div class="demo-Circle-custom">
                    <div>我的审核</div>
                    <div>12</div>
                </div>
            </i-circle>
            <div style="height:100px;">
                <div>
                    <div style="text-align: center;">已上架<span>10</span></div>
                    <div style="text-align: center;">未上架<span>2</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.product_view{
   display: flex; 
   .item{
       margin: 10px;
   }
}
</style>