<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-01 16:32:20
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
                <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true,row)">选品</Button>
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
    <SelectionModel :titleText="titleText" :formValidate="formValidate" :showModel='showModel' @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="form" :data="selectData"></SelectionModel>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
</div>
</template>

<script>
import SelectionModel from "@components/sell/selectionManager/selectionModel";
import SeniorFilter from "@components/public/filter/seniorFilter";
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import ImageModel from "@components/public/model/imageModel";
import list from "@mixins/list";
import {
    GetGoodsSelectionPage,
    CreateGoodsSelection
} from "@service/sellService"
const XZX_TOKEN_KEY = "XZX_LOGIN_TOKEN";
const localStorage = window["localStorage"];
export default {
    name: "SelectionManagerList",
    components: {
        SelectionModel,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel
    },
    mixins: [list],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
            loading : false,
            showFilterModel:false,
            columns: this.getTableColumn(),
            data: [],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            formValidate:{},
            totalPage:0,
            selectData:{},
            filtersConfig:{
                goodsCode:{
                    name:'商品编号',
                    value:'goodsCode',
                    type:'text',
                },
                goodsName:{
                    name:'产品名称',
                    value:'goodsName',
                    type:'text',
                },  
                status:{
                    name:'状态',
                    value:'status',
                    type:'radio',
                    dataSource:{
                        type:'static',
                        data:[
                        {name:'是',value:'true'},
                        {name:'否',value:'false'}
                        ],
                    },
                },
            }
        }
    },
    methods: {
        GetGoodsSelectionPage() {
            return new Promise((resolve, reject) => {
                GetGoodsSelectionPage(this.pageData).then(res => {
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
                this.titleText = '是否选品';
            }
            this.showModel = flag;
        },
        save(data) {
            debugger
            var params = {};
            var userInfo = JSON.parse(localStorage.getItem(XZX_TOKEN_KEY))['userInfo'];
            params = {
                goodsName:this.selectData.name,
                goodsId:this.selectData.id,
                goodsCode:this.selectData.code,
                status:this.selectData.status,
                isSelect:data.isSelect,
                remark:data.remark,
                isMain:data.isMain,
            }
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        this.$FromLoading.show();
                        CreateGoodsSelection(params).then(res => {
                            if (res.result.code == 200) {
                                this.$FromLoading.hide();
                                this.$Message.info('温馨提示：保存成功！');
                                this.GetGoodsSelectionPage();
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
            this.GetGoodsSelectionPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetGoodsSelectionPage();
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewFinishProduct',query: {id:id}});
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
            this.GetGoodsSelectionPage();
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
                width: 318,
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
                width: 350,
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
                    },params.row.status == 1 ?"通过":params.row.status == 0 ? '未审核':"未通过");
                },
                width: 200,
                resizable: true,
            },
            {
                title: '创建时间',
                key: 'createdOn',
                resizable: true,
                width: 200,
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
                width: 200,
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
        setFilter(value){
            this.pageData.keyword=value;
            this.GetGoodsSelectionPage(); 
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
        this.GetGoodsSelectionPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>