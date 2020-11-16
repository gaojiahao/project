<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-16 10:54:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 14:36:13
-->
<template>
<div>
    <div class="top-title">
        商品信息
    </div>
    <div class="top">
        <div class="top-box">
            <div class="item">
                <label>商品编号：</label>
                <Input v-model="formData['productCode']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>商品分类：</label>
                <Input v-model="formData['productType']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>品牌：</label>
                <Input v-model="formData['brand']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>是否带包装：</label>
                <RadioGroup v-model="formData['isPacking']">
                    <Radio label="true" disabled>
                        是
                    </Radio>
                    <Radio label="false" disabled>
                        否
                    </Radio>
                </RadioGroup>
            </div>
            <div class="item">
                <label>商品名称：</label>
                <Input v-model="formData['productName']" :style="{width:'400px'}" disabled></Input>
            </div>
        </div>
    </div>
    <div class="bottom">
        <Tabs type="card" :animated="false">
            <TabPane label="操作日志">
                <ResearchResultLog></ResearchResultLog>
            </TabPane>
            <TabPane label="历史记录">
                <HistroyPriceComparison></HistroyPriceComparison>
            </TabPane>
        </Tabs>
    </div>
</div>
</template>

<script>
import {
    Input,
    Select,
    Option,
    RadioGroup,
    Radio,
    Table,
    Page,
    Tabs,
    TabPane
} from "view-design";
import ResearchResultLog from "@components/sell/researchResult/researchResultLog";
import HistroyPriceComparison from "@components/sell/researchResult/histroyPriceComparison";
export default {
    name: 'ReferenceComparison',
    components: {
        Input,
        Select,
        Option,
        RadioGroup,
        Radio,
        Table,
        Page,
        Tabs,
        TabPane,
        ResearchResultLog,
        HistroyPriceComparison
    },
    data() {
        return {
            formData: {
                productCode: 'TX23423',
                productType: '积木',
                brand: '森宝',
                isPacking: 'true',
                productName: '地方撒快乐'
            },
        }
    },

}
</script>

<style scoped>
>>>.ivu-tabs-bar {
    /*border-bottom: 0;
    margin-bottom: 0px;*/
}
</style><style lang="less" scoped>
.top-title {
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 10px 20px;
}

.top {
    // flex: 1;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    padding: 10px 10px 10px 20px;

    .top-box {
        width: 100%;
        height: auto;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;

        .item {
            margin-right: 100px;
            line-height: 38px;
            margin-top: 10px;
            // width: 33.3333%;
            height: 38px;
        }
    }
}

.bottom {
    margin-top: 10px;
}
</style>
