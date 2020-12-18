<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 17:34:54
-->
<template>
<div class="storeManager-container">
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
import config from "@views/settings/bpmManager/moduleManager/supplierListConfig";
import list from "@mixins/list";

export default {
    name: "ModuleManagerList",
    mixins: [config,list],
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
            this.$router.push({name:'addModule'});
        },
        goEdit(){
            if(this.activatedRow.id)
            this.$router.push({name:'editModule',query: {id:this.activatedRow.id}});
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'viewModule',query: {id:id}});
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
                    }
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
            ];
            return columns;
        },
        getData(){
            var data = [{
                id:'fds',
                storeName: 'createNewProduct',
                name: '新品开发',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            }, {
                id:'fds',
                storeName: 'createNewProduct',
                name: '请假管理',
                status: "未启用",
                createTime: "2020-11-06",
                creater:"李四"
            },
            {
                id:'fds',
                storeName: 'createNewProduct',
                name: '销售推荐',
                status: "启用",
                createTime: "2020-11-06",
                creater:"李四"
            }, ]
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
        }
    },
    created(){
        
    }
}
</script>
<style lang="less" scoped>
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

