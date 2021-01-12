<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 20:28:18
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <!--<Button type="error" size="small" icon="ios-close" @click="deletesData">批量删除</Button>-->
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns"></CustomColumns>
        </div>
    </div>
    <div  class="myTable">
        <Table :row-class-name="rowClassName" border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="warning" size="small" style="margin-right: 5px" @click="goView(row.id)" v-if="row.status=='已完成'">查看</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="showPop(true)" v-else-if="row.status=='待确认'">确认</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goUpload(row.id)" v-else-if="row.status=='待制作'">上传</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible" @show-image-model="showImageModel"></ImageModel>
</div>
</template>

<script>
import config from "@views/charting/chartingManager/chartingDelegationCongfig";
import list from "@mixins/list";

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
            data: [
                {
                    id:'fds',
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "2010-11-23",
                    productName: "积木",
                    supplier: "2010-11-24",
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "待确认",
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
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "待制作",
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
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已完成",
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
                    supplierNum: "否",
                    createTime: "2020-11-06",
                    recommendingOfficer: '1',
                    status: "已完成",
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
                    status: "已完成",
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
                    status: "已完成",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
            ],
        }
    },
    methods: {
        clearFormData() {

        },
        showPop(flag, row) {
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

        },
        changePage() {

        },
        clearFormData2() {},
        goAdd(){
            this.$router.push({name:'AddNewProduct'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'AddNewProduct',query: {id:this.activatedRow.id}});
            }
        },
         goDetail(id){
            if(id)
            this.$router.push({name:'viewChartingDelegation',query: {id:id}});
        },
        showResearchModel(flag){
            this.$router.push({name:'ResearchDevelopNewProducts'}); 
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
                        color: params.row.status=='已完成' ? "#19be6b": "#ed4014"
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
        goUpload(id){
            this.$router.push({name:'uploadProgress'});
        },
        goView(id){
            this.$router.push({name:'viewUploadProgress'});
        }
    },
    created(){

    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>

