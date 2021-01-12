<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 20:55:25
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" height="695" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange" :draggable="true" @on-drag-drop="onDragDrop">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
                        <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
                        <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
                        <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
                        <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
                        <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
                        <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
                    </div>
                    <div class="filter-search">
                        <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
                    </div>
                </div>    
            </template>
            <template slot="footer">
                <div class="footer_page">
                    <div class="footer_page_right">
                        <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </template>
        </Table>
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
    DelStore,
    GetPlatformsList
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
        goDetail(id){
            if(id)
                this.$router.push({name:'viewStore',query: {id:id}});
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
                    width: 60,
                    align: 'center',
                    title: '序号',
                    resizable: true,
                },
                {
                    title: '店铺名称',
                    key: 'name',
                    resizable: true,
                    width: 240,
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                                color: "#2d8cf0"
                            },
                            on:{
                                click:()=>{
                                    this.goDetail(params.row.id)    
                                }
                            }
                        },params.row.name);
                    }
                },
                {
                    title: '店铺编码',
                    key: 'code',
                    resizable: true,
                    width: 178
                },
                {
                    title: '平台名称',
                    key: 'platformName',
                    resizable: true,
                    width: 170,
                    filters: this.filters,
                    filterMethod (value, row) {
                        if(value == row.platformId){
                            return row.platformId===value;    
                        } 
                    },
                },
                {
                    title: '账号',
                    key: 'account',
                    resizable: true,
                    width: 140
                },
                {
                    title: 'LoginID',
                    key: 'login_Id',
                    resizable: true,
                    width: 110
                },
                {
                    title: 'appKey',
                    key: 'app_Key',
                    resizable: true,
                    width: 110
                },
                {
                    title: 'appSecret',
                    key: 'app_Secret',
                    resizable: true,
                    width: 110
                },
                {
                    title: '状态',
                    key: 'status',
                    resizable: true,
                    width: 80,
                    filters: [
                        {
                            label: '已启用',
                            value: 1
                        },
                        {
                            label: '未启用',
                            value: 0
                        },
                    ],
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.status===1;
                        } else if (value === 0) {
                            return row.status===0;
                        }
                    },
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                                color: params.row.status===1 ? "#19be6b": "#ed4014"
                            },
                        },params.row.status===1?'已启用':'未启用');
                    }
                },
                {
                    title: '创建者',
                    key: 'createdBy',
                    resizable: true,
                    width: 80
                },
                {
                    title: '创建时间',
                    key: 'createdOn',
                    resizable: true,
                    width: 180,
                    sortable: true
                },
                {
                    title: '修改者',
                    key: 'modifyBy',
                    resizable: true,
                    width: 80
                },
                {
                    title: '修改时间',
                    key: 'modifyOn',
                    width: 180,
                    resizable: true,
                    sortable: true
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
                    DelStore({id:this.activatedRow.id,storeBinds:[]}).then(res => {
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
                            this.activatedRow = {};
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
        },
        onDragDrop(first, end) {
            this.data.splice(
            end,
            1,
            ...this.data.splice(first, 1, this.data[end])
            );
        },
    },
    created(){
        this.GetStorePage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
