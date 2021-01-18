<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 10:45:21
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
                <Button type="warning" size="small" style="margin-right: 5px" @click="goCharting(row.id,row.status)">委派制图</Button>
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
import config from "@views/charting/chartingDelegation/chartingDelegationCongfig";
import list from "@mixins/list";
import {
    GetPrepGoodsPage,
} from "@service/basicinfoService"

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
        goDetail(id){
            if(id)
            this.$router.push({name:'viewChartingDelegation',query: {id:id}});
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
                title: '序号'
            }, 
            {
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
                }
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
                width:220
            },
            {
                title: '委派完成日期',
                key: 'color'
            },
            {
                title: '实际完成日期',
                key: 'supplier'
            },
            {
                title: '是否逾期',
                key: 'supplierNum'
            },
            {
                title: '逾期天数',
                key: 'recommendingOfficer',
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
            },
            {
                title: '修改时间',
                key: 'modifyOn',
            },
            {
                title: '创建者',
                key: 'createdName',
                width:80
            },
            {
                title: '修改者',
                key: 'modifyName',
                width:80
            },
            {
                title: '操作',
                slot: 'action',
                align: 'center',
                width: 150
            }
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
            this.GetPrepGoodsPage();
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
    },
    created(){
        this.GetPrepGoodsPage();    
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>