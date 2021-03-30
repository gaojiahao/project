<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 19:37:02
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <RadioGroup v-model="filter" type="button" size="small" style="height: 24px; line-height: 24px;" class="marginRight">
                            <Radio label="-1">全部</Radio>
                            <Radio label="0">待确认</Radio>
                            <Radio label="1">未完成</Radio>
                            <Radio label="2">已完成</Radio>
                            <Radio label="3">待返工</Radio>
                        </RadioGroup>
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
                <Button type="primary" size="small" style="margin-right: 5px" @click="showPop(true,row)" v-if="row.status==0">确认</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goUpload(row)" v-if="row.status==1">上传</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goUpload(row)" v-if="row.status==3">上传</Button>
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
    GetDistributionDetailPage,
    ConfirmFileDistribution
} from "@service/tortExamineService"

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
            data: [],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            filter:"1",
        }
    },
    watch:{
        filter:{
            handler(val){
                this.GetDistributionDetailPage();
            }
        }
    },
    methods: {
        GetDistributionDetailPage() {
            this.pageData['fileDistributionStatus']= this.filter;
            this.loading = true;
            return new Promise((resolve, reject) => {
                GetDistributionDetailPage(this.pageData).then(res => {
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
            this.formValidate = {...row};
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
            var parmas = [];
            parmas['formValidate']=this.formValidate['formValidate'];
            parmas['id']=this.formValidate['id'];
            return new Promise((resolve, reject) => {
                ConfirmFileDistribution({...parmas}).then(res => {
                    if(res.result.code==200){
                        this.$Message.info('温馨提示：保存成功！');
                        this.showModel = false;
                        this.GetDistributionDetailPage();
                    }
                });
            });    
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
                    return h('div', 
                    [
                        h('Poptip',{
                            props: {
                                trigger:'hover',
                                content:"content",
                                placement:"right",
                                transfer:true,
                            },
                        },[
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
                            h('img',{
                                slot:"content",
                                attrs: {
                                    src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                },
                                style: {
                                    width: '300px',
                                    height: '300px'
                                },
                                class:'api'
                            })
                        ])    
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
                width: 299,
                resizable: true,
            },
            {
                title: '店铺',
                key: 'storeName',
                width: 100,
                resizable: true,
            },
            {
                title: '委派完成日期',
                key: 'endTime',
                width: 160,
                resizable: true,
                render: (h, params) => {
                    return h("span", {
                        style: {
                            textAlign: "center",
                        },
                    },params.row.startTime+'-'+params.row.endTime);
                },
            },
            {
                title: '实际完成日期',
                key: 'finishTime',
                width: 160,
                resizable: true,
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                    },
                    },[2,3].indexOf(params.row.status)!=-1 ? params.row.finishTime:"/");
                },
            },
            {
                title: '是否逾期',
                key: 'overdue',
                render: (h, params) => {
                    return h("span", {
                        style: {
                            display: "inline-block",
                            color: params.row.overdue>0? "#ed4014": "#ed4014"
                        },
                    },params.row.overdue>0 ? "逾期":"/");
                },
                width: 100,
                resizable: true,
            },
            {
                title: '逾期天数',
                key: 'overdue',
                width: 100,
                resizable: true,
                render: (h, params) => {
                    return h("span", {
                        style: {
                            display: "inline-block",
                            color: params.row.overdue>0? "#ed4014": "#ed4014"
                        },
                    },params.row.overdue>0 ? params.row.overdue:"/");
                },
            },
            {
                title: '状态',
                key: 'assignmentStatus',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.status ==1 ? "#ff9900": params.row.status==2 ? "#19be6b" : params.row.status==3 ? "#ff9900" :"#ed4014"
                    },
                    },params.row.status ==1 ? "未完成":  params.row.status==2 ? "已完成" : params.row.status==3 ? "待返工":"待确认");
                },
                width: 80,
                resizable: true,
            },
            {
                title: '创建者',
                key: 'createdName',
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
                title: '修改者',
                key: 'modifyName',
                width: 80,
                resizable: true,
            },
            {
                title: '修改时间',
                key: 'modifyOn',
                width: 160,
                resizable: true,
            },
            {
                title: '操作',
                slot: 'action',
                align: 'center',
                width: 100,
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
            this.GetDistributionDetailPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetDistributionDetailPage();
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            data.forEach(col => {
                for(var i=0;i<columns.length;i++){
                    if(columns[i].key&&(col == columns[i].key)){
                        datas.push(columns[i]);
                    }
                     if(columns[i].slot&&(col == columns[i].slot)){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetDistributionDetailPage();
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        setFilter(value){
            this.pageData.keyword = value;
            this.pageData.skipCount = 1;
            this.GetDistributionDetailPage();
        },
        ConfirmFileDistribution(id){
            return new Promise((resolve, reject) => {
                ConfirmFileDistribution(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            debugger
                        });
                    }
                });
            });
        }
    },
    created(){
        this.GetDistributionDetailPage();    
    },
    activated() {
        if(this.data.length)
            this.GetDistributionDetailPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>

