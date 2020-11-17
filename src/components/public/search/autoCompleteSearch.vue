<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-17 11:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-17 15:31:37
-->
<template>
    <div>
        <span style="margin-left:5px" v-show="filterName">{{filterName}}:</span>
        <AutoComplete
            v-model="value"
            icon="ios-search"
            placeholder="关键词"
            style="width:300px;margin-top: -1px;margin-left: 5px;" @on-select="onSelect" clearable @on-clear="onClear">
            <div class="demo-auto-complete-item">
                <!--<div class="demo-auto-complete-group">
                    <span style="float:left;">{{ item.name }}:</span><span style="float:left;">{{ value }}</span>
                </div>-->
                <Option v-for="(item,index) in filterList" :value="value" :key="index">
                    <span class="demo-auto-complete-title" @click="clickOption(item)" style="float:left;">{{ item.name }}:{{value}}</span>
                </Option>
            </div>
        </AutoComplete>
    </div>
</template>
<script>
import {
    AutoComplete,
    Option
} from "view-design";
export default {
    components:{
        AutoComplete,
        Option 
    },
    props: {
        filtersConfig: {
            type: Object,
            default () {
                return {}
            }
        },
    },
    data () {
        return {
            value: '',
            filterName:'',
            data: [
                {
                    title: '话题',
                },
                {
                    title: '问题',
                },
                {
                    title: '文章',
                }
            ],
            filterList:[]
        }
    },
    methods:{
        onSelect(value){
            console.log('选中了搜索',value)
        },
        onClear(){
            this.filterName = '';
            console.log('清空了搜索')   
        },
        clickOption(item){
            this.filterName = item.name;
        }
    },
    created(){
        for(var item in this.filtersConfig){
            if(this.filtersConfig[item]['type']=='text'){
                var data = {
                    ...this.filtersConfig[item],
                    value: item
                }
                this.filterList.push(data);
            }
        }
    }
}
</script>
<style scoped>
    .demo-auto-complete-item{
        padding: 8px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
    >>>.ivu-select-item {
        display: flex;
    }
</style>