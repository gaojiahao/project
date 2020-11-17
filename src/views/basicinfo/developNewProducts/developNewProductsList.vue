<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-17 19:52:34
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd">添加商品</Button>
            <Button size="small" icon="md-refresh" @click="refresh">刷新</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" v-show="selectedList.length>0&&selectedList.length<2">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="deleteData" v-show="selectedList.length>0">删除</Button>
        </div>
        <div class="filter-search">
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
        </div>
    </div>
    <div>
        <Table border :loading="loading" :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true)">开发</Button>
                <Button type="info" size="small" style="margin-right: 5px" @click="showPop2(true)">审核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="showPop(true)">调研</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
</div>
</template>

<script>
import {
    Table,
    Page,
    RadioGroup,
    Radio,
    Select,
    Option,
    DatePicker
} from "view-design";
import ModalForm from "@components/public/form/modalForm";
import SeniorFilter from "@components/public/filter/seniorFilter";
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import ImageModel from "@components/public/model/imageModel";
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";

export default {
    name: "DevelopNewProductsList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ModalForm,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
            showFilterModel: false,
            loading: true,
            visible:false,
            srcData:{},
            columns: [{
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
                                        this.visible = true;
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
                    title: '创建时间',
                    key: 'createTime',
                },
                {
                    title: '推荐人员',
                    key: 'recommendingOfficer',
                    width: 100
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 100
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 300
                }
            ],
            data: [
                {
                    id:0,
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
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
                    status: "接受",
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
                    status: "接受",
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
                    status: "接受",
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
                    status: "接受",
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
                    status: "接受",
                },
            ],
            filter: "large",
            selectedList:[],
        }
    },
    methods: {
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
        setFilter() {},
        showFilter(flag) {
            this.showFilterModel = flag;
        },
        onSelect(selection,row){
            this.selectedList.push(row);
        },
        onSelectCancel(selection,row){
            this.selectedList.splice(row.id, 1);
        },
        onSelectAllCancel(selection){
            this.selectedList = [];
        },
        onSelectAll(selection){
            this.selectedList = selection;
        },
        goAdd(){
            this.$router.push({name:'AddNewProduct'});
        },
        goEdit(){
            this.$router.push({name:'AddNewProduct',query: {id:this.selectedList[0].id}});
        },
        refresh() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        deleteData() {
            for(var i=0;i<this.selectedList.length;i++){
                for(var j=0;j<this.data.length;j++){
                    if(this.selectedList[i].id==this.data[j].id){
                        this.data.splice(j, 1);   
                    }
                }
            }
        },
        onClear(){
            console.log('清空了关键词');
        },
        setFilter(data){
            console.log(data);
        },
        goDetail(id){
            console.log(id)
            this.$router.push({name:'AddNewProduct',query: {id:id}});
        }
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
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
</style><style lang="less" scoped>
.storeManager-container {
    margin-top: 16px;

    .head {
        height: 30px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 30px;
        ;

        .filter-button {
            float: left;
        }

        .filter-search {
            float: right;
            display: flex;
        }
    }
}
</style>
