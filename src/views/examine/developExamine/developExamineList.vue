<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-16 12:20:07
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
                            <Radio label="0">未审核</Radio>
                            <Radio label="1">通过</Radio>
                            <Radio label="2">未通过</Radio>
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
                <Button type="info" size="small" style="margin-right: 5px" @click="goTortExamine(row)" v-if="row.saleStatus==0">审核</Button>
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
</div>
</template>

<script>
import config from "@views/examine/mainResearchExamine/productConfig";
import list from "@mixins/list";
import {
    GetPrepGoodsPage
} from "@service/basicinfoService";

export default {
    name: "developExamineList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
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
                this.GetPrepGoodsPage();
            }
        }
    },
    methods: {
        GetPrepGoodsPage () {
            this.pageData['saleStatus'] = this.filter;
            return new Promise((resolve, reject) => {
                GetPrepGoodsPage (this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.totalPage = res.result.item.totalCount;
                            this.data = res.result.item.items;
                            this.loading = false;
                            var listID= [];
                            for(var j = 0; j < this.data.length; j++) {
                                listID.push(this.data[j]['id']);
                            };
                            window.localStorage.setItem("listID", JSON.stringify(listID));
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
        goTortExamine(row) {
            this.$router.push({name:'addDevelopExamine',query: {id:row.id}});    
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
                                this.GetPrepGoodsPage();
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
            this.GetPrepGoodsPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetPrepGoodsPage();
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewDevelopExamine',query: {id:id}});
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
                title: '类目',
                key: 'categoryName',
                resizable: true,
                width: 165,
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
                width: 193,
            },
            {
                title: '状态',
                key: 'saleStatus',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.saleStatus==1 ? "#19be6b": params.row.saleStatus == 0 ? "#ff9900":"#ed4014"
                    },
                    },params.row.saleStatus==1 ?"通过": params.row.saleStatus==0 ? "未审核" : "未通过");
                },
                resizable: true,
                width: 100,
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
                width: 180,
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
                width: 180,
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
            this.pageData.skipCount = 1;
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