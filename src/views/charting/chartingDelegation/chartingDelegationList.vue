<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 19:11:19
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
                            <Radio label="0">未委派</Radio>
                            <Radio label="1">待制作</Radio>
                            <Radio label="3">已完成</Radio>
                            <Radio label="4">待返工</Radio>
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
                <Button type="warning" size="small" style="margin-right: 5px" @click="goCharting(row.id,row.assignmentStatus)" v-if="[0].indexOf(row.assignmentStatus)!=-1">委派制图</Button>
                <Button size="small" style="margin-right: 5px" @click="showModalDetail(true,row.id)" v-if="row.assignmentStatus">明细</Button>
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
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
    <ModalDetail :total="totalPageDetail" :columns="columnsDetail" :pageData="pageDataDetail" :data="dataDetail" :loading="loadingDetail" :showModelDetail='showModelDetail' @show-modal-detail="showModalDetail" ref="showModalDetail"></ModalDetail>
</div>
</template>

<script>
import config from "@views/charting/chartingDelegation/chartingDelegationCongfig";
import list from "@mixins/list";
import {
    GetDistributionPage,
    GetDistributionDetailPage
} from "@service/tortExamineService"

export default {
    name: "ChartingDelegationList",
    mixins: [config,list],
    data() {
        return {
            titleText: '委派制图',
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
            filter:"0",
        }
    },
    watch:{
        filter:{
            handler(val){
                this.GetDistributionPage();
            }
        }
    },
    methods: {
        GetDistributionPage() {
            this.pageData['assignmentStatus']= this.filter;
            return new Promise((resolve, reject) => {
                GetDistributionPage(this.pageData).then(res => {
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
        showPop(flag, row) {
            if (row && row.id) {
                this.selectData = row;
                this.titleText = '派店';
            }
            this.showModel = flag;
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
                title: '产品编码',
                key: 'code',
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
                resizable: true,
            },
            // {
            //     title: '委派完成日期',
            //     key: 'endTime',
            //     width: 140,
            //     resizable: true,
            //     render: (h, params) => {
            //         return h("span", {
            //             style: {
            //                 textAlign: "center",
            //                 color: params.row.assignmentStatus==1 ? "#19be6b": "#ed4014"
            //             },
            //         },params.row.assignmentStatus ? params.row.startTime+'-'+params.row.endTime:'/');
            //     },
            // },
            // {
            //     title: '实际完成日期',
            //     key: 'expectedTime',
            //     width: 140,
            //     resizable: true,
            //     render: (h, params) => {
            //         return h("span", {
            //         },params.row.assignmentStatus&&params.row.expectedTime?params.row.expectedTime:"");
            //     },
            // },
            // {
            //     title: '是否逾期',
            //     key: 'overdue',
            //     width: 100,
            //     resizable: true,
            //     render: (h, params) => {
            //         return h("span", {
            //             style: {
            //             display: "inline-block",
            //             color: params.row.overdue>0 ? "#ed4014": "#ed4014"
            //         },
            //         },params.row.assignmentStatus&&params.row.overdue>0?"逾期":"");
            //     },
            // },
            // {
            //     title: '逾期天数',
            //     key: 'overdue',
            //     width: 100,
            //     resizable: true,
            //     render: (h, params) => {
            //         return h("span", {
            //         },params.row.assignmentStatus&&params.row.overdue>0?params.row.overdue:"");
            //     },
            // },
            {
                title: '委派状态',
                key: 'assignmentStatus',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.assignmentStatus ==1 ? "#ff9900": params.row.assignmentStatus==3 ? "#19be6b" : params.row.assignmentStatus==4 ? "#ff9900" :"#ed4014"
                    },
                    },params.row.assignmentStatus ==1 ? "待制作": params.row.assignmentStatus==3 ? "已完成" : params.row.assignmentStatus==4 ? "待返工" :"未委派");
                },
                width:100,
                resizable: true,
            },
            // {
            //     title: '制图状态',
            //     key: 'fileDistributionStatus',
            //     render: (h, params) => {
            //         return h("span", {
            //         style: {
            //             display: "inline-block",
            //             color: params.row.fileDistributionStatus==1 ? "#19be6b": "#ed4014"
            //         },
            //         },params.row.fileDistributionStatus?"已完成":"未完成");
            //     },
            //     width:100,
            //     resizable: true,
            // },
            {
                title: '委派人',
                key: 'createdName',
                width: 80,
                resizable: true,
            },
            {
                title: '委派时间',
                key: 'createdOn',
                width: 160,
                resizable: true,
            },
            // {
            //     title: '修改者',
            //     key: 'modifyName',
            //     width: 80,
            //     resizable: true,
            // },
            // {
            //     title: '修改时间',
            //     key: 'modifyOn',
            //     width: 160,
            //     resizable: true,
            // },
            {
                title: '操作',
                slot: 'action',
                align: 'center',
                width: 250,
                resizable: true,
            }
        ];
            return columns2;
        },
        getTableColumnDetail(){
            var columns2 = [
            {
                type: 'index',
                width: 60,
                align: 'center',
                title: '序号',
                resizable: true,
            },
            {
                title: '制作人',
                key: 'userName',
                width: 120,
                resizable: true,
            },
            {
                title: '委派时间',
                key: 'createdOn',
                width: 140,
                resizable: true,
            },
            {
                title: '委派完成日期',
                key: 'endTime',
                width: 406,
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
                width: 140,
                resizable: true,
                render: (h, params) => {
                    return h("span", {
                    },params.row.finishTime);
                },
            },
            {
                title: '是否逾期',
                key: 'overdue',
                width: 100,
                resizable: true,
                render: (h, params) => {
                    return h("span", {
                        style: {
                        display: "inline-block",
                        color: params.row.overdue>0 ? "#ed4014": "#ed4014"
                    },
                    },params.row.overdue>0?"逾期":"");
                },
            },
            {
                title: '逾期天数',
                key: 'overdue',
                width: 100,
                resizable: true,
                render: (h, params) => {
                    return h("span", {
                    },params.row.overdue>0?params.row.overdue:"");
                },
            },
            {
                title: '制图状态',
                key: 'status',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.status ==1 ? "#ff9900": params.row.status==2 ? "#19be6b" : params.row.status==3 ? "#ff9900" :"#ed4014"
                    },
                    },params.row.status ==1 ? "未完成":  params.row.status==2 ? "已完成" : params.row.status==3 ? "待返工":"待确认");
                },
                width:100,
                resizable: true,
            },
        ];
            return columns2;
        },
        goCharting(id,status){
            if(status!='待返工'){
                this.$router.push({name:'appoint',query: {id:id}});
            } else {
                this.$router.push({name:'appointHistory',query: {id:id}});    
            }
        },
        getColor(value){
            switch(value) {
                case '已委派':
                    return "#19be6b";
                    break;
                case '未委派':
                    return "#ed4014";
                    break;
                default:
                    return "#ff9900";
            } 
        },
        save(data) {
            var params = {};
            params = {
                goodsName:this.selectData.goodsName,
                goodsId:this.selectData.goodsId,
                goodsCode:this.selectData.goodsCode,
                status:this.selectData.status,
                isSelect:data.isSelect,
                remark:data.remark,
                isMain:data.isMain,
            }
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        this.$FromLoading.show();
                        CreatePieShop(params).then(res => {
                            if (res.result.code == 200) {
                                this.$FromLoading.hide();
                                this.$Message.info('温馨提示：保存成功！');
                                this.GetDistributionPage();
                            } else if (res.result.code == 400) {
                                this.$Message.error({
                                    background: true,
                                    content: res.result.msg
                                });
                                this.$FromLoading.hide();
                            }
                        });
                    });   
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        clearFormData(){
            this.selectData = {};
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetDistributionPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetDistributionPage();
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewChartingDelegation',query: {id:id}});
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
            this.GetDistributionPage();
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        setFilter(value){
            this.pageData.keyword = value;
            this.pageData.skipCount = 1;
            this.GetDistributionPage(); 
        },
        getDetail(id){
            this.loadingDetail = true;
            return new Promise((resolve, reject) => {
                GetDistributionDetailPage({...this.pageDataDetail,goodsId:id,fileDistributionStatus:-1}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.totalPageDetail = res.result.item.totalCount;
                            this.dataDetail = res.result.item.items;
                            this.loadingDetail = false;
                        });
                    }
                });
            });    
        }
    },
    created(){
        this.GetDistributionPage();    
    },
    activated() {
        if(this.data.length)
            this.GetDistributionPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>