<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-02 14:38:10
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
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
                <Button type="primary" size="small" style="margin-right: 5px" @click="showPop(true)" v-if="row.status==0">确认</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goUpload(row)" v-if="row.status==0">上传</Button>
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
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
</div>
</template>

<script>
import config from "@views/charting/chartingManager/chartingDelegationCongfig";
import list from "@mixins/list";
import {
    GetFileDistributionPage,
} from "@service/tortExamineService";

export default {
    name: "ChartingManagerList",
    mixins: [config,list],
    data() {
        return {
            titleText: '确认',
            titleText2: '',
            showModel: false,
            showModel2: false,
            showResearh: false,
            columns: this.getTableColumn(),
            data: [
                {
                    id:'fds',
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "待确认",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:1,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "待制作",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:2,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已完成",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:2,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已完成",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:2,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已完成",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:2,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已完成",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
            ],
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
        GetFileDistributionPage() {
            return new Promise((resolve, reject) => {
                GetFileDistributionPage(this.pageData).then(res => {
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
        showPop(flag, row) {
            this.showModel = flag;
        },
        showPop2(flag, row) {
            if (row && row.id) {
                this.formValidate2['id'] = row.id;
                this.titleText2 = '编辑';
            } else {
                this.titleText2 = '审核';
            }
            this.showModel2 = flag;
        },
        save() {

        },
        goAdd(){
            this.$router.push({name:'AddNewProduct'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'AddNewProduct',query: {id:this.activatedRow.id}});
            }
        },
        showResearchModel(flag){
            this.$router.push({name:'ResearchDevelopNewProducts'}); 
        },
        getTableColumn(){
            var columns2 = [
            {
                type: 'index',
                width: 60,
                align: 'center',
                title: '序号',
                resizable: true,
            }, {
                title: '图片',
                key: 'imgOne',
                align: 'center',
                width: 80,
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
                key: 'goodsName',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: "#2d8cf0"
                    },
                    on:{
                        click:()=>{
                            this.goDetail(params.row)    
                        }
                    }
                    },params.row.goodsName);
                },
                width: 349,
                resizable: true,
            },
            {
                title: '委派完成日期',
                key: 'endTime',
                width: 160,
                resizable: true,
            },
            {
                title: '实际完成日期',
                key: 'expectedTime',
                width: 160,
                resizable: true,
            },
            {
                title: '是否逾期',
                key: 'status',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.status==1 ? "#ed4014": "#19be6b"
                    },
                    },params.row.status?"逾期":"未逾期");
                },
                width: 100,
                resizable: true,
            },
            {
                title: '逾期天数',
                key: 'recommendingOfficer',
                width: 100,
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
                    },params.row.status?"已完成":"未完成");
                },
                width: 80,
                resizable: true,
            },
            {
                title: '创建时间',
                key: 'createdOn',
                width: 160,
                resizable: true,
            },
            {
                title: '修改时间',
                key: 'modifyOn',
                width: 160,
                resizable: true,
            },
            {
                title: '创建者',
                key: 'createdBy',
                width: 80,
                resizable: true,
            },
            {
                title: '修改者',
                key: 'modifyBy',
                width: 80,
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
        goCharting(id){
            this.$router.push({name:'appoint',query: {id:id}});        
        },
        rowClassName (row, index) {
            if (row.supplierNum == "是") {
                return 'demo-table-info-row';
            }
            return '';
        },
        confirm(row){
            
        },
        goUpload(row){
            this.$router.push({name:'uploadProgress',query: {id:row.id,goodsId:row.goodsId}});
        },
        goDetail(row){
            this.$router.push({name:'viewUploadProgress',query: {id:row.id,goodsId:row.goodsId}});
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetFileDistributionPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetFileDistributionPage();
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
            this.GetFileDistributionPage();
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        setFilter(value){
            this.pageData.keyword = value
            this.GetFileDistributionPage();
        },
    },
    created(){
        this.GetFileDistributionPage();    
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>

