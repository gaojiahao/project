<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-02 12:30:49
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
                <Button type="info" size="small" style="margin-right: 5px" @click="showPop(true)">比价</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="showPop2()">调研</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goResult(row)">审核</Button>
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
    <ResearchModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ResearchModalForm>
</div>
</template>

<script>
import ResearchModalForm from "@components/sell/mainResearch/researchModalForm";
import config from "@views/sell/mainResearch/researchConfig";
import list from "@mixins/list";

export default {
    name: "MainResearchList",
    components: {
        ResearchModalForm,
    },
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: [
                {
                    type: 'index',
                    width: 70,
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
                                }
                            }),
                        ]);
                    },
                    width: 80,
                    resizable: true,
                },
                {
                    title: '名称',
                    key: 'type',
                    width: 260,
                    resizable: true,
                },
                {
                    title: '商品编号',
                    key: 'sku',
                    width: 129,
                    resizable: true,
                },
                {
                    title: '供应商',
                    key: 'color',
                    width: 120,
                    resizable: true,
                },
                {
                    title: '开发人员',
                    key: 'productName',
                    width: 120,
                    resizable: true,
                },
                {
                    title: '类目',
                    key: 'supplier',
                    width: 120,
                    resizable: true,
                },
                {
                    title: '特性标签',
                    key: 'supplierNum',
                    width: 120,
                    resizable: true,
                },
                {
                    title: '包装材料',
                    key: 'createTime',
                    width: 120,
                    resizable: true,
                },
                {
                    title: '平均成本',
                    key: 'recommendingOfficer',
                    width: 120,
                    resizable: true,
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 80,
                    resizable: true,
                },
                {
                    title: '创建时间',
                    key: 'createTime1',
                    width: 180,
                    resizable: true,
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 200,
                    resizable: true,
                }
            ],
            data: [{
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                }, {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                }, {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
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
        clearFormData() {

        },
        showPop(flag, row) {
            this.titleText = '参考比价';
            this.showModel = flag;
        },
        showPop2(id) {
            this.$router.push({
                name: 'Research',
                params: {
                    id: id || '123'
                }
            })
        },
        save() {

        },
        changePage() {

        },
        clearFormData2() {},
        goResult(row) {
            this.$router.push({name:'researchResult',query: {id:row.id}});    
        },
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>