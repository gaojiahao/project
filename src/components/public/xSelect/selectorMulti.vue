<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-02 15:05:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 18:05:51
-->
<template>
<div class="x-select" :class="[isCheck ? 'ivu-form-item-error':'']" style="width:250px" v-if="!hidden">
    <div class="ivu-input-wrapper" style="width:200px; float: left;">
        <input type="text" :placeholder="[isCheck ? '':placeholder]" class="ivu-input " disabled :value="name">
    </div>
    <Icon type="md-add-circle" style="color: green; font-size:24px;vertical-align: middle;" @click.native="showModel()" v-if="!disabled"/>
    <div class="ivu-form-item-error-tip" v-show="isCheck">请输入{{checkText}}</div>
    <Modal v-model="show" @on-ok="ok" @on-cancel="cancel" :fullscreen="fullscreen">
        <p slot="header" style="color:#999;">
            <span>{{titleText}}</span>
            <Icon type="ios-expand" @click.native="fullModel()" class="ivu-modal-full" />
        </p>
        <div style="">
            <Input search enter-button placeholder="" size="small" style="width: 200px"/>
        </div>
        <Table border ref="selection" :columns="columns" :data="data" stripe style="margin-top:20px" highlight-row @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel">
            <template slot-scope="{ row }" slot="number">
                <strong>{{ row.userName }}</strong>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
import $flyio from '@plugins/ajax';

export default {
    name: 'XSelect',
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
    },
    watch:{
        config:{
            handler(val){
                this.data = this.config.dataSource.data;
                this.columns = [];
                this.columns.push({
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },);
                this.config.proertyContext['dataSourceCols'].forEach(col => {
                    if(!col.hidden){
                        this.columns.push(col);
                    }
                });
            },
            deep:true,
            immediate:true
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
            disabled:false,
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
        }
    },
    methods: {
        showModel() {
            this.show = true;
        },
        getData() {
            let data = [];
            for (let i = 0; i < 15; i++) {
                data.push({
                    userName: '用户' + Math.floor(Math.random() * 100 + 1),
                    userId: Math.floor(Math.random() * 3 + 1),
                })
            }
            return data;
        },
        setvalue(){
            this.name = '';
            var v = '';
            this.selectedList.forEach(col => {
                this.name = this.name ? this.name + ',' + col[this.config.displayField] : col[this.config.displayField];
                v = v + col[this.config.valueField]+',';
            });
            this.$emit('change', this.selectedList);
        },
        ok() {
            this.setvalue();    
        },
        clear(){
            this.selectedList = [];
            this.name ='';
            this.$refs.selection.selectAll(false);
        },
        cancel() {
            this.clear();
        },
        changePage() {
            this.data = this.getData();
        },
        fullModel() {
            this.fullscreen = this.fullscreen ? false : true;
        },
        onSelect(selection,row){
            this.selectedList.push(row);
        },
        onSelectCancel(selection,row){
            this.selectedList.splice(row.id, 1);
        },
        onSelectAllCancel(selection){
            this.selectedList = [];
        },
        onSelectAll(selection){
            this.selectedList = selection;
        },
        async init(){
            if((['selectorMulti'].indexOf(this.config.type)!=-1)&&this.config.dataSource.type=='dynamic'){
                var parmas = this.config.dataSource.parmas ? this.config.dataSource.parmas:{};
                await $flyio.post({
                    url: this.config.dataSource.url,
                    data:{ ...this.pageData}
                }).then((res) => {
                    if(res.result.code==200){
                        if(this.config.dataSource.col){
                            var data = res.result.item.map((e,index)=>{
                                for(var i=0;i<this.config.dataSource.col.length;i++){
                                    e[this.config.dataSource.col[i]['k']] = e[this.config.dataSource.col[i]['v']];
                                }
                                return e;
                            });    
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
    },
    created(){
        this.hidden = this.config.hidden;
        this.disabled = this.config.disabled;
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
}
.ivu-modal-full {
    z-index: 1;
    font-size: 14px;
    float: right;
    margin-right: 20px;
    margin-top: 4px;
}
</style><style scoped>
>>>.ivu-table th,
>>>.ivu-table td {
    height: 28px;
}
</style>
