<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-14 16:54:08
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns"></CustomColumns>
        </div>
    </div>
    <div  class="myTable">
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="warning" size="small" style="margin-right: 5px" @click="goCharting(row.id,row.status)">委派制图</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible" @show-image-model="showImageModel"></ImageModel>
</div>
</template>

<script>
import config from "@views/charting/chartingDelegation/chartingDelegationCongfig";
import list from "@mixins/list";

export default {
    name: "ChartingDelegationList",
    mixins: [config,list],
    data() {
        return {
            titleText: '委派制图',
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
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "未委派",
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
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已委派",
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
                    status: "未委派",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:3,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "待返工",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:4,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "未委派",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                }, 
                {
                    id:5,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "是",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "未委派",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
            ],
        }
    },
    methods: {
        changePage() {

        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewChartingDelegation',query: {id:id}});
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            data.forEach(col => {
                for(var i=0;i<columns.length;i++){
                    if(col == columns[i].key){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        getTableColumn(){
            var columns2 = [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                type: 'index',
                width: 80,
                align: 'center',
                title: '序号'
            }, {
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
                                width: '40px',
                                height: '40px'
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
                }
            },
            {
                title: '产品名称',
                key: 'productName',
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
                    },params.row.productName);
                }
            },
            {
                title: 'SKU',
                key: 'sku'
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
                        color: this.getColor(params.row.status),
                    },
                    },params.row.status);
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
            },
            {
                title: '修改时间',
                key: 'modifyTime',
            },
            {
                title: '创建者',
                key: 'creater',
            },
            {
                title: '修改者',
                key: 'modifyer',
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
    },
    created(){

    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index";
</style>
