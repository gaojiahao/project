<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-12 16:25:02
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
                        <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
                        <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
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
            <template slot="footer">
                <div class="footer_page">
                    <div class="footer_page_right">
                        <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </template>
        </Table>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import config from "@views/basicinfo/supplierManager/supplierListConfig";
import list from "@mixins/list";
import {
    GetSupplierPage,
    DelSupplier
} from "@service/basicinfoService"
export default {
    name: "SupplierList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
            data: [],
            isAlibaba:false,
            loading: true,
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
        GetSupplierPage() {
            return new Promise((resolve, reject) => {
                GetSupplierPage(this.pageData).then(res => {
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
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetSupplierPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetSupplierPage();
        },
        goAdd(){
            this.$router.push({name:'AddSupplier'});
        },
        goEdit(){
            if(this.activatedRow.id)
            this.$router.push({name:'editSupplier',query: {id:this.activatedRow.id}});
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'ViewSupplier',query: {id:id}});
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
            this.GetSupplierPage();
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        getTableColumn(){
            var columns = [
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    type: 'index',
                    width: 70,
                    align: 'center',
                    title: '序号',
                    resizable: true,
                }, 
                {
                    title: '供应商编号',
                    key: 'code',
                    resizable: true,
                    width:200,
                },
                {
                    title: '供应商名称',
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
                    resizable: true,
                    width:209,
                },
                {
                    title: '联系电话',
                    key: 'telePhone',
                    resizable: true,
                    width:120,
                },
                {
                    title: '联系人',
                    key: 'changeUser',
                    resizable: true,
                    width:120,
                },
                {
                    title: '地址',
                    key: 'address',
                    resizable: true,
                    width:200,
                },
                {
                    title: '邮箱',
                    key: 'email',
                    resizable: true,
                    width:200,
                },
                // {
                //     title: '状态',
                //     key: 'status',
                //     render: (h, params) => {
                //         return h("span", {
                //         style: {
                //             display: "inline-block",
                //             color: params.row.status=='已审核' ? "#19be6b": "#ed4014"
                //         },
                //         },params.row.status);
                //     }
                // }, 
                {
                    title: '创建者',
                    key: 'createdName',
                    resizable: true,
                    width:120,
                },
                {
                    title: '创建时间',
                    key: 'createdOn',
                    resizable: true,
                    width:180,
                },
                {
                    title: '修改者',
                    key: 'modifyName',
                    resizable: true,
                    width:120,
                },
                {
                    title: '修改时间',
                    key: 'modifyOn',
                    resizable: true,
                    width:180,
                },
                // {
                //     title: '操作',
                //     slot: 'action',
                //     align: 'center'
                // }
            ];
            return columns;
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelSupplier({id:this.activatedRow.id}).then(res => {
                        if (res.result.code == 200) {
                            for(var i=0;i<this.selectedList.length;i++){
                                for(var j=0;j<this.data.length;j++){
                                    if(this.selectedList[i].id==this.data[j].id){
                                        this.data.splice(j, 1);   
                                    }
                                }
                            }
                            this.$Message.info('温馨提示：删除成功！');
                            if(this.data.length<1){
                                this.pageData.skipCount-1;
                            }
                            this.GetSupplierPage();
                            this.activatedRow = {};
                            this.loading = false;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.loading = false;
                        }
                    });
                });
            } 
        },
        setFilter(value){
            this.pageData.keyword = value;
            this.pageData.skipCount = 1;
            this.GetSupplierPage(); 
        }
    },
    created(){
        this.GetSupplierPage();
    },
    activated() {
        if(this.data.length)
            this.GetSupplierPage();    
    },
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>

