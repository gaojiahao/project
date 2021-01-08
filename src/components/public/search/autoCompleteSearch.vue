<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-17 11:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-07 19:19:36
-->
<template>
    <div class="auto_search_container">
        <span style="margin-left:5px" v-show="filterName">{{filterName}}:</span>
        <AutoComplete
            v-model="value"
            icon="ios-search"
            placeholder="关键词"
            style="width:300px;" @on-select="onSelect" clearable @on-clear="onClear" :transfer="true">
            <div class="demo-auto-complete-item">
                <Option v-for="(item,index) in filterList" :value="value" :key="index">
                    <span class="demo-auto-complete-title" @click="clickOption(item)" style="float:left; padding: 7px 16px; width:100%;">{{ item.name }}:{{value}}</span>
                </Option>
            </div>
        </AutoComplete>
    </div>
</template>
<script>
import {
    AutoComplete,
} from "view-design";
export default {
    components:{
        AutoComplete,
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
            this.$emit('set-filter',value);
        },
        onClear(){
            this.filterName = '';
            this.$emit('set-filter','');  
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
    .auto_search_container{
        height: 24px;
        display: inline-block;
        margin-right: 10px;
    }
    >>>.ivu-input-icon {
        width: 24px;
        height: 24px;
        line-height: 24px;
    }
    .demo-auto-complete-item{
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
        padding: 0;
    }
    >>>.ivu-input {
        height: 24px;
    }
</style>