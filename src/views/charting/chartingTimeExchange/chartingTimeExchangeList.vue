<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-02 14:33:59
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange" :draggable="true">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
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
            <template slot-scope="{ row, index }" slot="action">
                <Button type="warning" size="small" style="margin-right: 5px" @click="goChangeTime(row.id)">调换</Button>
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
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
</div>
</template>

<script>
import config from "@views/charting/chartingManager/chartingDelegationCongfig";
import list from "@mixins/list";
import {
    GetPrepGoodsPage
} from "@service/basicinfoService";

export default {
    name: "ChartingTimeExchangeList",
    mixins: [config,list],
    data() {
        return {
            showModel: false,
            columns: this.getTableColumn(),
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
        GetPrepGoodsPage() {
            return new Promise((resolve, reject) => {
                GetPrepGoodsPage(this.pageData).then(res => {
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
        save() {

        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewChartingDelegation',query: {id:id}});
        },
        getTableColumn(){
            var columns2 = [
            {
                type: 'index',
                width: 60,
                align: 'center',
                title: '序号',
                resizable: true,
            }, 
            {
                title: '图片',
                key: 'imgOne',
                width: 80,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                            },
                            style: {
                                width: '30px',
                                height: '30px'
                            },
                            on: {
                                click:()=>{
                                    this.srcData = {
                                        imgName: '图片预览',
                                        src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                    }
                                    this.showImageModel(true);
                                }
                            }
                        }),
                    ]);
                },
                resizable: true,
            },
            {
                title: '产品名称',
                key: 'name',
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
                },
                width: 429,
                resizable: true,
            },
            {
                title: '产品编码',
                key: 'code',
                width: 200,
                resizable: true,
            },
            {
                title: '委派完成日期',
                key: 'color',
                width: 160,
                resizable: true,
            },
            {
                title: '状态',
                key: 'status',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.status==1 ? "#19be6b": "#ed4014"
                    },
                    },params.row.status?"已委派":"未委派");
                },
                resizable: true,
                width:80
            },
            {
                title: '创建时间',
                key: 'createdOn',
                width: 180,
                resizable: true,
            },
            {
                title: '修改时间',
                key: 'modifyOn',
                width: 180,
                resizable: true,
            },
            {
                title: '创建者',
                key: 'createdName',
                width: 100,
                resizable: true,
            },
            {
                title: '修改者',
                key: 'modifyName',
                width: 100,
                resizable: true,
            },
            {
                title: '操作',
                slot: 'action',
                align: 'center',
                width: 150,
                resizable: true,
            }
        ];
            return columns2;
        },
        goChangeTime(id){
            this.$router.push({name:'changeTime',query: {id:id}});
        },
        clearFormData(){
            this.selectData = {};
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetPrepGoodsPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetPrepGoodsPage();
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
            this.GetPrepGoodsPage();
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        setFilter(value){
            this.pageData.keyword = value
            this.GetPrepGoodsPage();
        },
    },
    created(){
        this.GetPrepGoodsPage();    
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
