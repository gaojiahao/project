<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-25 16:34:31
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange" @on-drag-drop="onDragDrop">
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
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import config from "@views/settings/logisticsManager/logisticsManager/logisticsManagerConfig";
import list from "@mixins/list";
import {
    GetLogisticsPage,
    CreateLogistics,
    UpdateLogistics,
    GetLogisticsById,
    DelLogistics,
    GetLogisticsList
} from "@service/settingsService"

export default {
    name: "LogisticsList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
            data: [],
            activatedIndex: "yamashu",
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
        GetLogisticsPage() {
            return new Promise((resolve, reject) => {
                GetLogisticsPage(this.pageData).then(res => {
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
            this.GetLogisticsPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetLogisticsPage();
        },
        goAdd(){
            this.$router.push({name:'addLogistics'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editLogistics',query: {id:this.activatedRow.id}});
            }
        },
        goDetail(id){
            if(id)
                this.$router.push({name:'viewLogistics',query: {id:id}});
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
            this.GetLogisticsPage();
        },
        getTableColumn(){
            var data = [{
                    type: 'index',
                    width: 60,
                    align: 'center',
                    title: '序号',
                    resizable: true,
                },
                {
                    title: '物流名称',
                    key: 'name',
                    resizable: true,
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
                    width: 459,
                },
                {
                    title: '物流编码',
                    key: 'code',
                    resizable: true,
                    width: 400,
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
                    resizable: true,
                    width: 200,
                    sortable: true
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
                    sortable: true,
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
                    DelLogistics({id:this.activatedRow.id}).then(res => {
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
                            this.GetLogisticsPage();
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
            this.pageData.keyword=value;
            this.GetLogisticsPage(); 
        },
        onDragDrop(first, end) {
            this.data.splice(
            end,
            1,
            ...this.data.splice(first, 1, this.data[end])
            );
        },
    },
    created(){
        this.GetLogisticsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
