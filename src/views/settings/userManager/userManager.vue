<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-04 17:47:21
-->
<template>
<div class="userManager_container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
            <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
        </div>
    </div>
    <div class="myTable">
        <Table row-key="id" border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm";
import list from "@mixins/list";
import config from '@views/settings/userManager/userManagerConfig.js';
import {
    GetUserInfoPage,
    DelUserInfo
} from "@service/settingsService";

export default {
    name: 'UserManager',
    components: {
        ModalForm
    },
    computed: {

    },
    mixins: [config,list],
    data() {
        return {
            data: [],
            titleText: '',
            showModel: false,
            columns: [{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '用户名称',
                    key: 'userName',
                },
                {
                    title: '昵称',
                    key: 'nickName',
                },
                {
                    title: '性别',
                    key: 'sex',
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                            },
                        },params.row.sex ==1 ?'男':'女');//  展示的内容
                    }
                },
                {
                    title: '手机',
                    key: 'phoneNumber',
                },
                {
                    title: '邮箱',
                    key: 'email',
                },
                {
                    title: '所属角色',
                    key: 'roleName'
                },
                {
                    title: '生日',
                    key: 'birthday',
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
                    title: '创建时间',
                    key: 'createdOn',
                },
                {
                    title: '创建者',
                    key: 'createdBy',
                },
            ],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyWord:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
        }
    },
    methods: {
        GetUserInfoPage() {
            return new Promise((resolve, reject) => {
                GetUserInfoPage(this.pageData).then(res => {
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
            this.GetUserInfoPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetUserInfoPage();
        },
        goAdd(){
            this.$router.push({name:'addUser'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editUser',query: {id:this.activatedRow.id}});
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
                    if(col == columns[i].key){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetUserInfoPage();
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelUserInfo({id:this.activatedRow.id,moduleIdList:this.activatedRow.moduleIdList||[]}).then(res => {
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
                            this.GetUserInfoPage();
                            this.loading = false;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
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
                keyWord:value,
                pageSizeOpts:[15,50,200],
            },
            this.GetUserInfoPage(); 
        },
    },
    created() {
        this.GetUserInfoPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>