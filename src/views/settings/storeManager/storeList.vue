<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-29 16:41:57
-->
<template>
<div class="storeManager-container">
    <!-- <div class="head">
        <div class="select-type">
            渠道：
            <Button type="primary" size="small" :ghost="activatedIndex=='yamashu'?false:true" @click="change('yamashu')">亚马逊</Button>
            <Button type="primary" size="small" :ghost="activatedIndex=='sumaitong'?false:true" @click="change('sumaitong')">速卖通</Button>
            <Button type="primary" size="small" :ghost="activatedIndex=='eBay'?false:true" @click="change('eBay')">eBay</Button>
        </div>
    </div> -->
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
            <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
        </div>
    </div>
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import config from "@views/settings/storeManager/storeManagerConfig";
import list from "@mixins/list";
import {
    GetStorePage,
    CreateStore,
    UpdateStore,
    GetStoreById,
    DelStore
} from "@service/settingsService"

export default {
    name: "StoreList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
            data: [],
            activatedIndex: "yamashu",
            loading: true,
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
        GetStorePage() {
            return new Promise((resolve, reject) => {
                GetStorePage(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.totalPage = res.result.item.totalCount;
                            this.data = res.result.item.items;
                            this.loading = false;
                        });
                    }
                });
            });
        },
        clearFormData() {

        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetStorePage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetStorePage();
        },
        goAdd(){
            this.$router.push({name:'AddStore'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editStore',query: {id:this.activatedRow.id}});
            }
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            data.forEach(col => {
                for(var i=0;i<columns.length;i++){
                    if(col == columns[i].key){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetStorePage();
        },
        getTableColumn(){
            var data = [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '店铺名称',
                    key: 'name'
                },
                {
                    title: '店铺编码',
                    key: 'code'
                },
                {
                    title: '平台名称',
                    key: 'platformName'
                },
                {
                    title: '账号',
                    key: 'account'
                },
                {
                    title: 'LoginID',
                    key: 'login_Id'
                },
                {
                    title: 'appKey',
                    key: 'app_Key'
                },
                {
                    title: 'appSecret',
                    key: 'app_Secret'
                },
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '创建者',
                    key: 'createdBy'
                },
                {
                    title: '创建时间',
                    key: 'createdOn'
                },
                {
                    title: '修改者',
                    key: 'modifyBy'
                },
                {
                    title: '修改时间',
                    key: 'modifyOn'
                }]
                // }, {
                //     title: '操作',
                //     slot: 'action',
                //     align: 'center'
                // }];
            return data;
        },
        change(value){
            this.activatedIndex = value;
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelStore({id:this.activatedRow.id}).then(res => {
                        if (res.result.code == 200) {
                            for(var i=0;i<this.selectedList.length;i++){
                                for(var j=0;j<this.data.length;j++){
                                    if(this.selectedList[i].id==this.data[j].id){
                                        this.data.splice(j, 1);   
                                    }
                                }
                            }
                            this.$Message.info('温馨提示：删除成功！');
                            if(this.data.length<1){
                                this.pageData.skipCount-1;
                            }
                            this.GetStorePage();
                            this.loading = false;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
                            });
                            this.loading = false;
                        }
                    });
                });
            } 
        },
        setFilter(value){
            this.pageData = {
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:value,
                pageSizeOpts:[15,50,200],
            },
            this.GetStorePage(); 
        }
    },
    created(){
        this.GetStorePage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
