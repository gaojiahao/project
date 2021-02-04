<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-04 16:40:32
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
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
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="goNewProduct(row.id)" v-if="row.status==1">开发</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goApproval(row.id)" v-if="row.status==0">审核</Button>
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
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <ImageModel :srcData="srcData" :visible="visible" @show-image-model="showImageModel"></ImageModel>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm";
import config from "@views/sell/sellManager/sellConfig";
import list from "@mixins/list";
import {
    GetRecommendGoodsPage,
    DelRecommendGoods
} from "@service/sellService"

export default {
    name: "SellList",
    components: {
        ModalForm,
    },
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
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
        GetRecommendGoodsPage() {
            return new Promise((resolve, reject) => {
                GetRecommendGoodsPage(this.pageData).then(res => {
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
            if (row && row.id) {
                this.formValidate['id'] = row.id;
                this.titleText = '编辑';
            } else {
                this.titleText = '开发';
            }
            this.showModel = flag;
        },
        save() {
            this.showPop(false);
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetRecommendGoodsPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetRecommendGoodsPage();
        },
        clearFormData2() {},
        goAdd(){
            this.$router.push({name:'addFinishProduct'});
        },
        goEdit(){
            if(this.activatedRow.id&&this.activatedRow.status==0){
                this.$router.push({name:'editFinishProduct',query: {id:this.activatedRow.id}});
            }
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewFinishProduct',query: {id:id}});
        },
        goApproval(id){
            if(id)
            this.$router.push({name:'approvalFinishProduct',query: {id:id}});
        },
        goNewProduct(id){
            if(id)
            this.$router.push({name:'sellNewProduct',query: {id:id}});    
        },
        showResearchModel(flag){
            this.$router.push({name:'ResearchDevelopNewProducts'}); 
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
            this.GetRecommendGoodsPage();
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
                key: 'img',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: params.img || require("@assets/default/logo.png")
                            },
                            style: {
                                width: '30px',
                                height: '30px'
                            },
                            on: {
                                click:()=>{
                                    this.srcData = {
                                        imgName: '图片预览',
                                        src: params.img || require("@assets/default/logo.png")
                                    }
                                    this.showImageModel(true);
                                }
                            }
                        }),
                    ]);
                },
                width: 80,
                resizable: true,
            },
            {
                title: '商品编码',
                key: 'code',
                resizable: true,
                width: 200,
            },
            {
                title: '商品名称',
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
                width: 200,
                resizable: true,
            },
            {
                title: '类目',
                key: 'categoryName',
                resizable: true,
                width: 100
            },
            {
                title: '参考链接',
                key: 'urlOne',
                resizable: true,
                width: 150
            },
            {
                title:'商户',
                key: 'merchantName',
                resizable: true,
                width: 148
            },
            {
                title: '审核状态',
                key: 'status',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.status==1 ? "#19be6b": "#ed4014"
                    },
                    },params.row.status == 1 ?"通过":params.row.status == 0 ? '未审核':"未通过");
                },
                width: 110,
                resizable: true,
            },
            {
                title: '创建时间',
                key: 'createdOn',
                resizable: true,
                width: 180,
            },
            {
                title: '创建者',
                key: 'createdName',
                resizable: true,
                width: 80,
            },
            {
                title: '修改时间',
                key: 'modifyOn',
                resizable: true,
                width: 180,
            },
            {
                title: '修改者',
                key: 'modifyName',
                resizable: true,
                width: 80,
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
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelRecommendGoods({id:this.activatedRow.id}).then(res => {
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
                            this.GetRecommendGoodsPage();
                            this.activatedRow = {};
                            this.loading = false;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.loading = false;
                        }
                    });
                });
            } 
        },
        setFilter(value){
            this.pageData.keyword=value;
            this.GetRecommendGoodsPage(); 
        },
        exportData(){
             this.$refs.selection.exportCsv({
                filename: 'Custom data',
                columns: this.columns,
                data: this.data,
            });    
        }
    },
    created(){
        this.GetRecommendGoodsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
