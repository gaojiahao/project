<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 14:28:07
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe>
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <RadioGroup v-model="filter" type="button" size="small" style="height: 24px; line-height: 24px;" class="marginRight">
                            <Radio label="-1">全部</Radio>
                            <Radio label="0">未上架</Radio>
                            <Radio label="1">待审核</Radio>
                            <Radio label="2">通过</Radio>
                            <Radio label="3">未通过</Radio>
                            <Radio label="4">下架</Radio>
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
                <Button type="warning" size="small" style="margin-right: 5px" @click="goUp(row,2)">上架</Button>
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
import ModalForm from "@components/public/form/modalForm";
import list from "@mixins/list";
import config from "@views/basicinfo/productManager/productListConfig";
import {
    GetShelvesGoodsPage,
    UpdatePrepGoods
} from "@service/sellService"

export default {
    name: "UpProductList",
    components: {
        ModalForm,
    },
    mixins: [config,list],
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
            filter:"0",
        }
    },
    watch:{
        filter:{
            handler(val){
                this.GetShelvesGoodsPage();
            }
        }
    },
    methods: {
        GetShelvesGoodsPage() {
            this.pageData['shelvesStatus']= this.filter;
            return new Promise((resolve, reject) => {
                GetShelvesGoodsPage(this.pageData).then(res => {
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
        goUp(row,flag){
            this.$Modal.confirm({
                title: '温馨提示',
                content: '确认上架吗？',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    this.upProduct(row,flag);
                },
            });    
        },
        upProduct(row,flag){
            return new Promise((resolve, reject) => {
                UpdatePrepGoods({id:row.id,shelvesStatus :flag}).then(res => {
                    if(res.result.code==200){
                        debugger
                        this.GetShelvesGoodsPage();
                    }
                });
            });    
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
            this.GetShelvesGoodsPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetShelvesGoodsPage();
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
            this.GetShelvesGoodsPage();
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
                width: 80,
                resizable: true,
            },
            {
                title: '产品编码',
                key: 'code',
                resizable: true,
                width: 270,
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
                width: 280,
                resizable: true,
            },
            {
                title: '类目',
                key: 'categoryName',
                resizable: true,
                width: 120,
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
                width: 139,
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
                title: '创建者',
                key: 'createdName',
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
                title: '修改者',
                key: 'modifyName',
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
            this.pageData.keyword = value;
            this.pageData.skipCount = 1;
            this.GetShelvesGoodsPage(); 
        },
    },
    created(){
        this.GetShelvesGoodsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
