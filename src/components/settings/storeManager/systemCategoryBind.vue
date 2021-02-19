<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-19 17:04:38
-->
<template>
<div class="content">
    <div style="margin:0 10px; padding:10px 0">
        <Input search clearable placeholder="" size="small" @on-search="onSearch" @on-clear="onCler" />
    </div>
    <div :class="[type=='add'? 'list':'list_view']">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <template v-else>
            <template v-if="systemCategoryData.length">
                <Tree ref="tree" :data="systemCategoryData" show-checkbox  multiple @on-check-change="checkChange" ></Tree>
            </template>
            <template v-else>
                暂无数据
            </template>
        </template>
    </div>
</div>
</template>

<script>
import {
    GetCategoryList
} from "@service/settingsService"
export default {
    name: 'SystemCategoryBind',
    props:{
        formData:{
            type:Array,
            default () {
                return []
            } 
        },
        type:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            loop: 0,
            selectData:[],
            systemCategoryData:[],
            loading:true,
            datas:[],
            keyword:''
        }
    },
    watch:{
        formData:{
            handler(val){
                // this.datas = this.systemCategoryData;
                // this.calleArr(this.datas);
            }
        }
    },
    methods: {
        selectChangeAll() {

        },
        renderContent (h, { root, node, data }) {
            var t = this,
            e = t.$createElement;
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.name)
                ]),
            ]);
        },
        checkChange(items, item) {
            // this.selectData= [];
            // for(var i=0;i<items.length;i++){
            //     var arr = {
            //         categoryId:items[i]['id'],
            //         categoryName:items[i]['name'],
            //     };
            //     this.selectData.push(arr);
            // }
            // this.$emit('select-system-bind',this.selectData);
        },
        clear(){
            var checkData = this.$refs.tree.getCheckedNodes();
            if(checkData.length){
                for(var i=0;i<checkData.length;i++){
                    checkData[i].checked = false;
                }
            }
        },
        onSearch(value){
            this.GetCategoryList(value);
        },
        onCler(){
            this.GetCategoryList(value);
        },
        GetCategoryList(value) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                GetCategoryList({keyword:value,maxResultCount:200}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.systemCategoryData = res.result.item;
                            this.calleArr(this.systemCategoryData);
                            this.loading = false;
                        });
                    }
                });
            });
        },
        calleArr: function(data){
            for(var i in data){
                data[i] = {
                    ...data[i],
                    title:data[i].name
                }
                if(this.type=='view'){
                    data[i]['disabled'] = true;    
                }
                var flag=false;
                for(var j=0;j<this.formData.length;j++){
                    if(this.formData[j]['categoryId']==data[i]['id']){
                        data[i]['checked'] = true;
                        flag = true;
                    } 
                }
                if(flag){
                    data[i]['expand'] = true; 
                }
                if(data[i].children&&data[i].children.length){
                    data[i]['checked'] = false;
                    this.calleArr(data[i].children);
                }
            }
        },
    },
    created(){
        this.GetCategoryList();
    }
}
</script>
<style lang="less" scoped>
.content {
    background-color: #ffffff;


    .head {
        width: 100%;
        height: 30px;
        background:#d2effd;
        line-height: 30px;
    }
    .list{
        overflow-y: scroll;
        height: 451px;
        position: relative;
        .ivu-tree /deep/ ul li {
            list-style: none;
            margin: 3px 0 3px 10px;
            padding: 0;
            white-space: nowrap;
            outline: none;
        }
    }
    .list_view{
        overflow-y: scroll;
        height: 495px;
        position: relative;    
    }
}
</style>
