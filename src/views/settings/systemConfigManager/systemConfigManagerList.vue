<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 19:56:42
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
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
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setSeniorFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import config from "@views/settings/systemConfigManager/systemConfigManagerConfig";
import list from "@mixins/list";
import {
    GetSystemConfigPage,
    DelSystemConfig
} from "@service/settingsService"

export default {
    name: "systemConfigManagerList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
            data: [],
            loading: true,
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                name:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
        }
    },
    methods: {
        GetSystemConfigPage() {
            return new Promise((resolve, reject) => {
                GetSystemConfigPage(this.pageData).then(res => {
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
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetSystemConfigPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetSystemConfigPage();
        },
        goAdd(){
            this.$router.push({name:'addSystem'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editSystem',query: {id:this.activatedRow.id}});
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
            this.GetSystemConfigPage();
        },
        getTableColumn(){
            var data = [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号',
                    resizable: true,
                },
                {
                    title: '系统配置类型',
                    key: 'congfigType',
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                            },
                        },params.row.congfigType);//  展示的内容
                    },
                    resizable: true,
                    width: 200,
                }, 
                {
                    title: '名称',
                    key: 'name',
                    resizable: true,
                    width: 239,
                },
                {
                    title: '编码',
                    key: 'code',
                    resizable: true,
                    width: 200,
                },
                {
                    title: '是否启用',
                    key: 'enabled',
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                                color: params.row.enabled==true ? "#19be6b": "#ed4014"
                            },
                        },params.row.enabled?'是':'否');//  展示的内容
                    },
                    resizable: true,
                    width: 200,
                },
                {
                    title: '创建者',
                    key: 'createdName',
                    resizable: true,
                    width: 200,
                },
                {
                    title: '创建时间',
                    key: 'createdOn',
                    width: 160,
                    resizable: true,
                    width: 200,
                },
                {
                    title: '修改者',
                    key: 'modifyName',
                    resizable: true,
                    width: 200,
                },
                {
                    title: '修改时间',
                    key: 'modifyOn',
                    resizable: true,
                    width: 200,
                }]
            return data;
        },
        change(value){
            this.activatedIndex = value;
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelSystemConfig({id:this.activatedRow.id}).then(res => {
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
                            this.GetSystemConfigPage();
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
            this.pageData.name=value;
            this.pageData.skipCount = 1;
            this.GetSystemConfigPage(); 
        },
        getName(value){
            var name = '';
            if(value=='productLabel'){
                name='特性标签';
            } else if(value=='packageMaterial'){
                name="包装材质";
            } else if(value=='filetype'){
                name="制图选项"
            }
            return name;
        },
        setSeniorFilter(data){
            this.pageData = {
                ...this.pageData,
                congfigType:data.congfigType,
            },
            this.$delete(this.pageData,'name');
            this.GetSystemConfigPage(); 
        }
    },
    created(){
        this.GetSystemConfigPage();
    },
    activated() {
        if(this.data.length)
            this.GetSystemConfigPage();    
    },
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
