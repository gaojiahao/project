<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-17 20:51:21
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd">添加供应商</Button>
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
        <Table border :loading="loading" :columns="columns" :data="data" stripe @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="ios-search-outline" size="small" style="margin-right: 5px" @click="showPop(true)">查看</Button>
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
import config from "@views/basicinfo/supplierManager/supplierListConfig";

export default {
    name: "CustomerList",
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
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
            showFilterModel: false,
            loading: true,
            visible:false,
            selectedList:[],
            columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '客户编号',
                    key: 'storeName'
                },
                {
                    title: '客户名称',
                    key: 'name'
                },
                {
                    title: '联系电话',
                    key: 'storeCode'
                },
                {
                    title: '联系人',
                    key: 'account'
                },
                {
                    title: '地址',
                    key: 'LoginID'
                },
                {
                    title: 'email',
                    key: 'appKey'
                },
                {
                    title: '状态',
                    key: 'status'
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            dataConfig: {
                'filterList': [{
                    name: '待上架',
                    value: 'all',
                }, {
                    name: '预期',
                    value: 'all',
                }, {
                    name: '已上架',
                    value: 'all',
                }]
            },
            data: [{
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, ],
            filter: "large"
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
                this.titleText = '新建';
            }
            this.showModel = flag;
        },
        save() {

        },
        changePage() {

        },
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
            this.$router.push({name:'AddSupplier'});
        },
        goEdit(){
            this.$router.push({name:'AddSupplier',query: {id:this.selectedList[0].id}});
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
            this.$router.push({name:'AddSupplier',query: {id:id}});
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
    // margin-top: 16px;

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
        }

        .filter-search {
            float: right;
            display: flex;
        }
    }
}
</style>