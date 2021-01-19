<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 17:34:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-19 09:47:42
-->
<template>
<div class="size-content">
    <div class="box">
        <Button size="small" type="success" @click="add">新增</Button>
    </div>
    <div class="box" v-for="(item,index) in data" :key="index">
        <div class="list">
            <span style="float:left; line-height:34px">制作类型：</span>
            <Select v-model="item.fileType" :style="{width:'200px',float: 'left'}" clearable filterable>
                <Option v-for="item in typeList" :value="item.value" :key="item.value" >{{ item.name }}</Option>
            </Select>
        </div>
        <div class="list">
            <span style="float:left; line-height:34px">人员：</span>
            <Select v-model="item.userId" :style="{width:'200px',float: 'left'}" clearable filterable>
                <Option v-for="item in peopleList" :value="item.value" :key="item.value" >{{ item.name }}</Option>
            </Select>
        </div>
        <div class="list">
            <span style="line-height:34px">时间：</span>
            <DatePicker v-model="item.date" @on-change="item.date=$event" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="" style="width: 400px"></DatePicker>
        </div>
        <div class="list">
            <Icon type="md-close" style="line-height:34px" @click.native="del(index)"/>
        </div>
    </div>
</div>
</template>

<script>
import SelectorSingle from "@components/public/xSelect/selectorSingle";
import {
    GetFileRelationList,
    GetUserInfoList
} from "@service/settingsService";

export default {
    name: "DistributionPeople",
    components: {
        SelectorSingle
    },
    model: {
        prop: 'value', // prop说:我要将value1作为该组件被使用(被父组件调用)时,v-model能取到的值
        event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    },
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        parmas: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            typeList:[],
            peopleList:[],
            data:[
                {
                    fileType:'',
                    userId:'',
                    date:''
                }
            ]
        }
    },
    watch:{
        data:{
            handler(val){
                this.handleInput(val);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        add() {
            this.data.push({
                fileType:'',
                userId:'',
                date:''
            });
        },
        handleInput(data) {
            //var jsonData = JSON.stringify(data);
            this.$emit('change', data)
        },
        del(index){
            this.$delete(this.data,index);
        },
        GetFileRelationList(){
            var me = this;
            var params={
                categoryId:this.parmas[0],
                platformId:this.parmas[1],
            }
            return GetFileRelationList({categoryId:this.categoryId,platformId:this.platform}).then(res => {
                if (res.result.code == 200) {
                    var data = res.result.item;
                    for(var i=0;i<data.length;i++){
                        data[i]['name'] = data[i]['fileTypeName'];
                        data[i]['value'] = data[i]['id'];
                    }
                    this.typeList = data;
                }
            }).catch(e =>{console.log(e)}); 
        },
        GetUserInfoList(a){
            return GetUserInfoList().then(res => {
                if (res.result.code == 200) {
                    var data = res.result.item;
                    for(var i=0;i<data.length;i++){
                        data[i]['name'] = data[i]['userName'];
                        data[i]['value'] = data[i]['id'];
                    }
                    this.peopleList = data;
                }
            }).catch(e =>{console.log(e)}); 
        },
    },
    created() {
        this.handleInput(this.data);
        this.GetFileRelationList();
        this.GetUserInfoList();
    }

}
</script>

<style lang="less" scoped>
.size-content{
    margin-top: 6px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    .box{
        display: flex;
        .list {
            margin-right: 4px;
        }
    }
}
.size-content /deep/ .list /deep/ .x-select /deep/ .box{ width: 150px; float: left;line-height:32px}
</style>
