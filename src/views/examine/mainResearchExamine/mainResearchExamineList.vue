<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 16:14:20
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
        </div>
    </div>
    <div  class="myTable">
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="goTortExamine(row)" v-if="row.status=='未审核'">主推审核</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="goViewTortExamine(row)" v-if="row.status=='已审核'">查看</Button>
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
import config from "@views/examine/selectionExamine/productConfig";
import list from "@mixins/list";

export default {
    name: "MainResearchExamineList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
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
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "未审核",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:1,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "未审核",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:2,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "已审核",
                    result:"不通过",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:3,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "已审核",
                    result:"通过",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                },
                {
                    id:4,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "已审核",
                    result:"不通过",
                    modifyTime:"2020-11-06",
                    modifyer:"李四",
                    creater:"王五"
                }, 
                {
                    id:5,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "已审核",
                    result:"强制委派",
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
        goTortExamine(row) {
            this.$router.push({name:'addSelectionExamine',query: {id:row.id}});    
        },
        goViewTortExamine(row){
            this.$router.push({name:'viewSelectionExamine',query: {id:row.id}});        
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
            this.$router.push({name:'ViewNewProduct',query: {id:id}});
        },
        showResearchModel(flag){
            this.$router.push({name:'ResearchDevelopNewProducts'}); 
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            datas.push(columns[1]);
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
                    },params.row.productName);//  展示的内容
                }
            },
            {
                title: '分类',
                key: 'type'
            },
            {
                title: 'SKU',
                key: 'sku'
            },
            {
                title: '颜色',
                key: 'color'
            },
            {
                title: '厂商',
                key: 'supplier'
            },
            {
                title: '厂商货号',
                key: 'supplierNum'
            },
            {
                title: '推荐人员',
                key: 'recommendingOfficer',
            },
            {
                title: '审核状态',
                key: 'status',
                render: (h, params) => {
                    return h("span", {// 创建的标签名
                    // 执行的一些列样式或者事件等操作
                    style: {
                        display: "inline-block",
                        color: params.row.status=='已审核' ? "#19be6b": "#ed4014"
                    },
                    },params.row.status);//  展示的内容
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
                title: '审核结果',
                key: 'result',
                render: (h, params) => {
                    return h("span", {// 创建的标签名
                    // 执行的一些列样式或者事件等操作
                    style: {
                        display: "inline-block",
                        color: params.row.result=='通过' ? "#19be6b": "#ed4014"
                    },
                    },params.row.result);//  展示的内容
                }
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
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        }
        
    },
    created(){

    }
}
</script>
<style scoped>
>>>.ivu-input {
    height: 26px;
}
>>>.ivu-btn-small span {
    font-size: 12px;
}
>>>.ivu-table-row-highlight td {
    background-color: #B8D9FD;
}
>>>.ivu-table-stripe .ivu-table-body tr.ivu-table-row-hover td{
    background-color: #B8D9FD;
}
>>>.ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td{
    background-color: #B8D9FD;
}
</style><style lang="less" scoped>
.storeManager-container {
    .head {
        height: 30px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 30px;

        .filter-button {
            float: left;
            .marginRight{
                margin-right: 10px;
            }
        }

        .filter-search {
            float: right;
            display: flex;
            .marginRight{
                margin-right: 10px;
            }
        }
    }
}
</style>
