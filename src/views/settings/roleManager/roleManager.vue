<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 20:58:45
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
                        <Button type="success" size="small" style="margin-right: 5px" @click="show(true)">分配权限</Button>
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
    <XTreeAdd @save-menu="saveMenu" :showModel="modal1" @show-modal="show" :roleAuthData="roleAuthData"></XTreeAdd>
</div>
</template>

<script>
import XTreeAdd from "@components/public/tree/xTreeAdd";
import list from "@mixins/list";
import config from '@views/settings/roleManager/roleManagerConfig.js';
import {
    AuthRoleList,
    AuthRolePage,
    DeleteAuthRole,
    AuthModuleList,
    UpdateUserRoleMenu,
    GetUserRoleMenuById,
    DeleteUserRoleMenu
} from "@service/settingsService"

export default {
    name: 'RoleManager',
    components: {
        XTreeAdd,
    },
    mixins: [config,list],
    data() {
        return {
            data: [],
            titleText: '',
            columns: this.getTableColumn(),
            modal1: false,
            showModel: false,
            titleText: '',
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                roleName:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            roleAuthData:[],
        }
    },
    methods: {
        AuthRolePage() {
            return new Promise((resolve, reject) => {
                AuthRolePage(this.pageData).then(res => {
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
            this.AuthRolePage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.AuthRolePage();
        },
        goAdd(){
            this.$router.push({name:'addRole'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editRole',query: {id:this.activatedRow.id}});
            }
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        getTableColumn(){
            var data = [{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'roleName'
                },
                {
                    title: '角色编码',
                    key: 'roleCode'
                },
                {
                    title: '是否启用',
                    key: 'enabled',
                    width: 120,
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                                color: params.row.enabled==true ? "#19be6b": "#ed4014"
                            },
                        },params.row.enabled?'是':'否');//  展示的内容
                    }
                },
                {
                    title: '是否管理员',
                    key: 'isAdmin',
                    width: 120,
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                                color: params.row.isAdmin==true ? "#19be6b": "#ed4014"
                            },
                        },params.row.isAdmin?'是':'否');//  展示的内容
                    }
                },
                {
                    title: '创建时间',
                    key: 'createdOn',
                    // render: (h, params) => {
                    //     return h('div', this.formatDate(this.list[params.index].createTime));
                    // }
                },
                {
                    title: '创建者',
                    key: 'createdBy',
                },]
            return data;
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
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetStorePage();
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DeleteUserRoleMenu({id:this.activatedRow.id}).then(res => {
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
                            this.AuthRolePage();
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
                roleName:value,
                pageSizeOpts:[15,50,200],
            },
            this.AuthRolePage(); 
        },
        saveMenu(data){
            var params ={
                ...this.activatedRow,
                moduleIdList: data 
            }
            return new Promise((resolve, reject) => {
                this.loading = true;
                UpdateUserRoleMenu(params).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.$Message.info('温馨提示：分配权限成功！');
                        });
                        this.AuthRolePage();
                    }
                });
            });    
        },
        show(flag){
            if(this.activatedRow.id){
                this.modal1 = flag;
                if(flag){
                    return new Promise((resolve, reject) => {
                        GetUserRoleMenuById({id:this.activatedRow.id}).then(res => {
                            if(res.result.code==200){
                                this.roleAuthData = res.result.item.moduleIdList ? res.result.item.moduleIdList:[];
                            }
                        });
                    });    
                }
            }
        },
    },
    created() {
        this.AuthRolePage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
