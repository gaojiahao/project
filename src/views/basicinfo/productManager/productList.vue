<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-16 10:55:00
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe>
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
                <Button type="success" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)">审核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="goResearch(row)">查看调研</Button>
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
import ModalForm from "@components/public/form/modalForm";
import SeniorFilter from "@components/public/filter/seniorFilter";
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import ImageModel from "@components/public/model/imageModel";
import config from "@views/basicinfo/productManager/productListConfig";
import {
    GetPrepGoodsPage,
    DelPrepGoods
} from "@service/basicinfoService"

export default {
    name: "ProductList",
    components: {
        ModalForm,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
            defaultImg: require("@assets/default/logo.png"),
            loading : true,
            showFilterModel:false,
            srcData:{},
            visible:false,
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
        showPop(flag, row) {
            if (row && row.id) {
                this.formValidate['id'] = row.id;
                this.titleText = '编辑';
            } else {
                this.titleText = '审核';
            }
            this.showModel = flag;
        },
        save() {

        },
        goResearch(row){
            this.$router.push({name:'viewProductListResearch',query: {id:row.id||123}})
        },
        refresh() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        showFilter(flag) {
            this.showFilterModel = flag;
        },
        setFilter() {},
        goDetail(id){
            if(id)
            this.$router.push({name:'viewProductList',query: {id:id}});
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
                width: 80,
                resizable: true,
            },
            {
                title: '产品编码',
                key: 'code',
                resizable: true,
                width: 220,
            },
            {
                title: '产品名称',
                key: 'name',
                render: (h, params) => {
                    return h("span", {// 创建的标签名
                    // 执行的一些列样式或者事件等操作
                    style: {
                        display: "inline-block",
                        color: "#2d8cf0"
                    },
                    on:{
                        click:()=>{// 这里给了他一个打印事件，下面有展示图
                            this.goDetail(params.row.id)    
                        }
                    }
                    },params.row.name);//  展示的内容
                },
                width: 220,
                resizable: true,
            },
            {
                title: '分类',
                key: 'categoryName',
                resizable: true,
                width: 120,
            },
            {
                title:'商户',
                key: 'merchantName',
                resizable: true,
                width: 110,
            },
            // {
            //     title:'平台名称',
            //     key: 'platformName',
            //     resizable: true,
            // },
            // {
            //     title:'店铺',
            //     key: 'storeName',
            //     resizable: true,
            // },
            {
                title:'品牌名称',
                key: 'brandName',
                resizable: true,
                width: 138,
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
                    },params.row.status?"已审核":"未审核");
                },
                resizable: true,
                width: 80,
            },
            {
                title: '创建时间',
                key: 'createdOn',
                resizable: true,
                width: 170,
            },
            {
                title: '创建者',
                key: 'createdBy',
                resizable: true,
                width: 80,
            },
            {
                title: '修改时间',
                key: 'modifyOn',
                resizable: true,
                width: 170,
            },
            {
                title: '修改者',
                key: 'modifyBy',
                resizable: true,
                width: 80,
            },
            {
                title: '操作',
                slot: 'action',
                align: 'center',
                width: 190,
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
        setFilter(value){
            this.pageData = {
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:value,
                pageSizeOpts:[15,50,200],
            },
            this.GetPrepGoodsPage(); 
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
        this.GetPrepGoodsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
