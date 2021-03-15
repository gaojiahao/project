<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-02 15:05:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 11:40:59
-->
<template>
<div class="x-select" :class="[isCheck ? 'ivu-form-item-error':'']" v-if="!hidden">
    <div class="ivu-select ivu-select-multiple ivu-select-default">
        <div class="ivu-select-selection">
            <Tag v-for="item in selectedList" :key="item.id" :name="item.name" :closable="!disabled" @on-close="deleteSelect(item)">{{ item.name }}</Tag>
        </div>
    </div>
    <Icon type="md-add-circle" style="color: green; font-size:24px;vertical-align: middle; line-height:34px; margin-left: 10px;" @click.native="showModel()" v-if="!disabled"/>
    <Modal v-model="show" @on-ok="ok" @on-cancel="cancel" :fullscreen="fullscreen">
        <p slot="header" style="color:#999;">
            <span>{{titleText}}</span>
            <Icon type="ios-expand" @click.native="fullModel()" class="ivu-modal-full" />
        </p>
        <div style="">
            <Input v-model="searchValue" suffix="ios-search" search placeholder="" size="small" style="width: 200px" @on-search="initData" clearable @on-clear="onClear" />
        </div>
        <Table border ref="selection" :columns="columns" :data="data" stripe style="margin-top:20px" highlight-row @on-row-click="onSelect" @on-selection-change="onSelectChange" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel">
            <template slot-scope="{ row }" slot="number">
                <strong>{{ row.userName }}</strong>
            </template>
        </Table>
        <Tag v-for="item in selectedList" :key="item.id" :name="item.name" closable @on-close="deleteSelect(item)">{{ item.name }}</Tag>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer size="small" :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.maxResultCount" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
import $flyio from '@plugins/ajax';

export default {
    name: 'SelectorMulti',
    model: {
        prop: 'value', // prop说:我要将value1作为该组件被使用(被父组件调用)时,v-model能取到的值
        event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    },
    props:{
        value: {
            type: Array,
            default () {
                return []
            }
        },
        config: {
            type: Object,
            default () {
                return {}
            }
        },
        isShow:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false    
        }
    },
    watch:{
        config:{
            handler(val){
                this.data = this.config.dataSource.data;
                this.columns = [];
                this.columns.push(
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
                    {
                        title: '序号',
                        slot: 'number',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                );
                this.config.proertyContext['dataSourceCols'].forEach(col => {
                    if(!col.hidden){
                        this.columns.push(col);
                    }
                });
            },
            deep:true,
            immediate:true
        },
        isShow:{
            handler(val){
                this.show = val;
            }
        },
        value:{
            handler(val){
                this.selectedList = val.map((e,index)=>{
                    e.name = e.name;
                    e.value = e.id;
                    e.id = e.id;
                    return e;
                });
            },
            deep:true,
        }
    },
    data() {
        return {
            isCheck: false,
            placeholder: '',
            checkText: '平台名称',
            columns: [],
            show: false,
            titleText: '选择',
            fullscreen: false,
            hidden: false,
            // disabled:false,
            name:'',
            selectedList:[],
            data: [],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            searchValue:'',
            timpList:[]
        }
    },
    computed:{
        calc() {
            if(this.pageData.skipCount>1){
                return this.timpList.concat(this.selectedList);
            } else {
                this.timpList = this.selectedList;
                return this.timpList;
            }
        },    
    },
    methods: {
        showModel() {
            this.show = true;
        },
        setvalue(){
            this.name = '';
            var v = '';
            this.selectedList.forEach(col => {
                this.name = this.name ? this.name + ',' + col[this.config.displayField] : col[this.config.displayField];
                v = v + col[this.config.valueField]+',';
            });
            this.$emit('change', this.selectedList);
            this.$emit('add',this.selectedList);
            this.$emit('show-model',false);
            // this.handleSelectAll(false);
            this.searchValue="";
            this.fullscreen = false;
        },
        ok() {
            this.setvalue();
        },
        clear(){
            // this.selectedList = [];
            // this.name ='';
            // this.$refs.selection.selectAll(false);
            this.$emit('show-model',false);
            // this.handleSelectAll(false);
            this.searchValue="";
            this.fullscreen = false;
        },
        cancel() {
            this.clear();
        },
        changePage(page) {
            this.pageData.skipCount = page; 
            this.init();
        },
        initData(){
            this.pageData.keyword = this.searchValue; 
            this.init();
        },
        fullModel() {
            this.fullscreen = this.fullscreen ? false : true;
        },
        onSelect(selection,row){
            if(!this.checkSelectList(selection)){
                this.selectedList.push(selection);
            }
        },
        onSelectChange(selection,row){
            if(selection.length){
                for(var i=0;i<selection.length;i++){
                    if(!this.checkSelectList(selection[i])){
                        this.selectedList.push(selection[i]);
                    }
                }
            }
            //this.selectedList = selection;
        },
        checkSelectList(data){
            for(var i=0;i<this.selectedList.length;i++){
                if(this.selectedList[i].id==data.id){
                    return true;
                }
            }
            return false;
        },
        onSelectCancel(selection,row){
            this.selectedList.splice(row.id, 1);
        },
        onSelectAllCancel(selection){
            this.selectedList = [];
        },
        onSelectAll(selection){
            //this.selectedList = selection;
            if(selection.length){
                for(var i=0;i<selection.length;i++){
                    if(!this.checkSelectList(selection[i])){
                        this.selectedList.push(selection[i]);
                    }
                }
            }
        },
        async init(){
            var me = this;
            if((['selectorMulti'].indexOf(this.config.type)!=-1)&&this.config.dataSource.type=='dynamic'){
                var parmas = this.config.dataSource.parmas ? this.config.dataSource.parmas:{};
                await $flyio.post({
                    url: this.config.dataSource.url,
                    data:{ ...this.pageData}
                }).then((res) => {
                    if(res.result.code==200){
                        if(this.config.dataSource.col){
                            var data = res.result.item.items.map((e,index)=>{
                                for(var i=0;i<this.config.dataSource.col.length;i++){
                                    e[this.config.dataSource.col[i]['k']] = e[this.config.dataSource.col[i]['v']];
                                }
                                for(var j=0;j<me.selectedList.length;j++){
                                    if(e.id == me.selectedList[j]['id']){
                                        e._checked = true;
                                    }
                                }
                                return e;
                            });
                            //this.timpList = this.timpList;
                        } else {
                            var data = res.result.item.map((e,index)=>{
                                e.value = e.id;
                                return e;
                            });
                        }
                        this.totalPage = res.result.item.totalCount;
                        this.data = data;
                    }
                })        
            }
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.init();
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        deleteSelect(data){
            for(var i=0;i<this.selectedList.length;i++){
                if(data.id == this.selectedList[i].id){
                    this.selectedList.splice(i, 1);
                    for(var j=0;j<this.data.length;j++){
                        if(data.id==this.data[j]['id']){
                            this.$refs.selection.toggleSelect(j)
                        }
                    }
                    // break;
                }
            }
        },
        initPage(){
            this.pageData.skipCount = 1;
            this.pageData.skipTotal = 15;
            this.pageData.maxResultCount = 15;
            this.onClear();
        },
        onClear(){
            this.pageData.keyword ='';
            this.init(); 
        }
    },
    created(){
        this.hidden = this.config.hidden;
        // this.disabled = this.config.disabled;
        this.init();
        this.titleText = this.titleText+'-'+this.config.name;
    },
}
</script>

<style lang="less" scoped>
.x-select {
    .ivu-form-item-error {
        .ivu-input-wrapper {
            .ivu-input-error {
                border: 1px solid #ed4014;
            }
        }
    }
    width:400px;
    display: flex;
}
.ivu-modal-full {
    z-index: 1;
    font-size: 14px;
    float: right;
    margin-right: 20px;
    margin-top: 4px;
}
.ivu-select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    color: #515a6e;
    font-size: 14px;
    line-height: normal;
}
.ivu-select-default.ivu-select-multiple .ivu-select-selection {
    min-height: 32px;
    max-height: 64px;
    overflow-y: scroll;
}
.ivu-select-multiple .ivu-select-selection {
    padding: 0 24px 0 4px;
}
</style><style scoped>
>>>.ivu-table th,
>>>.ivu-table td {
    height: 28px;
}
</style>
