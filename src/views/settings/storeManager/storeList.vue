<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-27 20:15:32
-->
<template>
<div class="storeManager-container">
    <div class="head">
        <div class="select-type">
            渠道：
            <Button type="primary" size="small" :ghost="activatedIndex=='yamashu'?false:true" @click="change('yamashu')">亚马逊</Button>
            <Button type="primary" size="small" :ghost="activatedIndex=='sumaitong'?false:true" @click="change('sumaitong')">速卖通</Button>
            <Button type="primary" size="small" :ghost="activatedIndex=='eBay'?false:true" @click="change('eBay')">eBay</Button>
        </div>
    </div>
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">添加商品</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
            <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
        </div>
    </div>
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
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
import config from "@views/settings/storeManager/storeManagerConfig";
import list from "@mixins/list";

export default {
    name: "StoreList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ModalForm,
    },
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
            data: [{
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                id:"q22222",
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, ],
            activatedIndex: "yamashu"
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
        goAdd(){
            this.$router.push({name:'AddStore'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'AddStore',query: {id:this.activatedRow.id}});
            }
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
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
            var data = [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '店铺名称',
                    key: 'storeName'
                },
                {
                    title: '负责人',
                    key: 'name'
                },
                {
                    title: '店铺代码',
                    key: 'storeCode'
                },
                {
                    title: '账号名称',
                    key: 'account'
                },
                {
                    title: 'LoginID',
                    key: 'LoginID'
                },
                {
                    title: 'appKey',
                    key: 'appKey'
                },
                {
                    title: 'appSecret',
                    key: 'appSecret'
                },
                {
                    title: '状态',
                    key: 'status'
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }]
                // }, {
                //     title: '操作',
                //     slot: 'action',
                //     align: 'center'
                // }];
            return data;
        },
        change(value){
            this.activatedIndex = value;
        }
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
</style>
<style lang="less" scoped>
@import "~@less/list/index";
</style>
