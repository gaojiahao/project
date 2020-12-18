<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 18:03:33
-->
<template>
<div class="flowManager-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新增</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
        </div>
    </div>
    <div>
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="md-create" size="small" style="margin-right: 5px" @click="goSaveBpm(row.id)">工作流编辑</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator show-sizer :page-size="25" :page-size-opts="[25,50,200]"></Page>
            </div>
        </div>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import config from "@views/settings/bpmManager/flowManager/listConfig";
import list from "@mixins/list";
import nodelist from './nodeList';

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
            loading: true
        }
    },
    methods: {
        changePage() {

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
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
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
                    key: 'moduleName',
                },
                {
                    title: '流程名称',
                    key: 'flowName',
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
                        },params.row.flowName);
                    }
                },
                {
                    title: '版本号',
                    key: 'edition',
                },
                {
                    title: '业务表',
                    key: 'businessTable',
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: params.row.status=='启用' ? "#19be6b": "#ed4014"
                        },
                        },params.row.status);
                    }
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '创建者',
                    key: 'creater'
                },
                {
                    title: '修改时间',
                    key: 'createTime'
                }, 
                {
                    title: '修改者',
                    key: 'creater'
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
                id:'fds',
                moduleName: '新品开发',
                flowName: '新品开发流程',
                edition: '1.0',
                businessTable: 'v_product',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            }, {
                id:'fds1',
                moduleName: '制图管理',
                flowName: '制图管理流程',
                edition: '1.0',
                businessTable: 'v_product',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            },{
                id:'fds2',
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
        setFilter(data){
            this.showFilterModel = false;
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 500);  
        },
        goSaveBpm(id){
            if(id)
                this.$router.push({name:'saveBpm',query: {id:id}});    
        }
    },
    created() {}
}
</script>
<style lang="less" scoped>
.flowManager-container {
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
