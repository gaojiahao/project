<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-23 12:10:05
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
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="md-create" size="small" style="margin-right: 5px" @click="goSaveBpm(row)">工作流编辑</Button>
            </template>
        </Table>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import config from "@views/settings/bpmManager/flowManager/listConfig";
import list from "@mixins/list";
import nodelist from './nodeList';
import {
    DelWorkflowClause,
    GetWorkflowClausePage,
} from "@service/settingsService"

export default {
    name: 'FlowManagerList',
    computed: {

    },
    mixins: [nodelist,list,config],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
            data: this.getData(),
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
        GetWorkflowClausePage() {
            return new Promise((resolve, reject) => {
                GetWorkflowClausePage(this.pageData).then(res => {
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
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetWorkflowClausePage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetWorkflowClausePage();
        },
        goAdd(){
            this.$router.push({name:'addFlow'});
        },
        goEdit(){
            if(this.activatedRow.id)
            this.$router.push({name:'editFlow',query: {id:this.activatedRow.id}});
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewFlow',query: {id:id}});
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            data.forEach(col => {
                for(var i=0;i<columns.length;i++){
                    if(col == columns[i].key){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetWorkflowClausePage();
        },
        getTableColumn(){
            var columns = [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                },
                {
                    title: '模型名称',
                    key: 'packageName',
                },
                {
                    title: '流程名称',
                    key: 'workflowName',
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
                        },params.row.workflowName);
                    }
                },
                {
                    title: '版本号',
                    key: 'version',
                },
                // {
                //     title: '业务表',
                //     key: 'businessTable',
                // },
                // {
                //     title: '状态',
                //     key: 'status',
                //     render: (h, params) => {
                //         return h("span", {
                //         style: {
                //             display: "inline-block",
                //             color: params.row.status=='启用' ? "#19be6b": "#ed4014"
                //         },
                //         },params.row.status);
                //     }
                // }, 
                {
                    title: '创建时间',
                    key: 'createdOn'
                }, {
                    title: '创建者',
                    key: 'createdBy'
                },
                {
                    title: '修改时间',
                    key: 'modifyOn'
                }, 
                {
                    title: '修改者',
                    key: 'modifyBy'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ];
            return columns;
        },
        getData(){
            var data = [
            {
                id:1,
                moduleName: '新品开发',
                flowName: '新品开发流程',
                edition: '1.0',
                businessTable: 'v_product',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            }, {
                id:2,
                moduleName: '制图管理',
                flowName: '制图管理流程',
                edition: '1.0',
                businessTable: 'v_product',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            },{
                id:3,
                moduleName: '销售推品',
                flowName: '新销售推品流程',
                edition: '1.0',
                businessTable: 'v_product',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            },]
            return data;
        },
        goConfig(row){
            this.$router.push({name:'addFomConfig',params: {id:row.id||'1',name:row.name}});
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelWorkflowClause({id:this.activatedRow.id}).then(res => {
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
                            this.GetWorkflowClausePage();
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
            this.pageData = {
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:value,
                pageSizeOpts:[15,50,200],
            },
            this.GetWorkflowClausePage(); 
        },
        goSaveBpm(row){
            if(row.id)
                this.$router.push({name:'saveBpm',query: {id:row.id,tpId:row.tpId}});    
        }
    },
    created(){
        this.GetWorkflowClausePage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
