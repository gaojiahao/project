<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-17 19:35:19
-->
<template>
<div class="content">
    <div style="margin:0 10px; padding:10px 0" v-if="type!='view'">
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
                <span style="margin-left:10px">暂无数据</span>
            </template>
        </template>
    </div>
</div>
</template>

<script>
import {
    GetCategoryRelatedList
} from "@service/settingsService"
export default {
    name: 'SystemCategoryBind',
    props:{
        formData:{
            type:Object,
            default () {
                return {}
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
            loading:false,
            datas:[],
            keyword:'',
            flagSelect:0,
        }
    },
    watch:{
        'formData.platformId':{
            handler(val){
                this.GetCategoryRelatedList(val);
                this.flagSelect++;
                this.clear();
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
            var checkData = this.$refs&&this.$refs.tree&&this.$refs.tree.getCheckedNodes()||[];
            if(checkData.length){
                for(var i=0;i<checkData.length;i++){
                    checkData[i].checked = false;
                }
            }
        },
        onSearch(value){
            this.flagSelect++;
            this.GetCategoryRelatedList(value);
        },
        onCler(){
            this.flagSelect++;
            this.GetCategoryRelatedList('');
        },
        GetCategoryRelatedList(value) {
            this.loading = true;
            if(this.formData.platformId){
                return new Promise((resolve, reject) => {
                    GetCategoryRelatedList({platformId:this.formData.platformId,keyWord:value}).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.systemCategoryData = res.result.item;
                                this.calleArr(this.systemCategoryData);
                                this.loading = false;
                            });
                        }
                    });
                });
            }
        },
        calleArr: function(data){
            for(var i in data){
                data[i] = {
                    ...data[i],
                    title:data[i].categoryName
                }
                if(this.type=='view'){
                    data[i]['disabled'] = true;    
                }
                var flag=false;
                if(this.flagSelect<=1){
                    for(var j=0;j<this.formData.storeBinds.length;j++){
                        if(this.formData.storeBinds[j]['categoryId']==data[i]['categoryId']){
                            data[i]['checked'] = true;
                            flag = true;
                        } 
                    }
                    if(flag){
                        data[i]['expand'] = true; 
                    }
                } else {
                    data[i]['checked'] = false;    
                }
                if(data[i].children&&data[i].children.length){
                    data[i]['checked'] = false;
                    this.calleArr(data[i].children);
                }
            }
        },
    },
    created(){
        //this.GetCategoryRelatedList();
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
