<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-16 11:10:07
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table row-key="id" :loading="loading" border :columns="columns" :data="data" highlight-row ref="selection" @on-select="onSelect" @on-current-change="onCurrentChange" stripe>
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="showPop(true)" class="marginRight">新建</Button>
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
            <template slot-scope="{ row }" slot="number">
                <strong>{{ row.number }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="showChildPop(true,row,index)">新建子菜单</Button>
            </template>
        </Table>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ModalForm :titleText="title" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="saveMenu" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm"
import config from '@views/settings/menuManager/menuManagerConfig'
import list from "@mixins/list";
import {
    AuthModulePage,
    CreateAuthModule,
    UpdateAuthModule,
    DeleteAuthModule
} from "@service/settingsService"

export default {
    name: 'MenuManager',
    components: {
        ModalForm,
    },
    computed: {

    },
    mixins: [config,list],
    data() {
        return {
            data: [],
            showModel: false,
            loading: true,
            columns: this.getTableColumn(),
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            actionSelect:''
        }
    },
    computed:{
        title(){
            return this.activatedRow.id ? '编辑':'新建'
        }
    },
    methods: {
        //获取菜单列表
        getMenuList() {
            let data = [];
            AuthModulePage(this.pageData).then(res => {
                if(res.result.code==200){
                    this.$nextTick(() => {
                        this.totalPage = res.result.item.totalCount;
                        this.data = res.result.item.items;
                        this.data = res.result.item.items.map((e,index)=>{
                            if(e.id==this.actionSelect){
                                e._showChildren = true;    
                            }
                            return e;
                        });
                        this.loading = false;
                    });
                }
            });
        },
        formatDate(date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        ok() {
            this.$Message.info('温馨提示：分配权限成功！');
        },
        cancel() {
            this.$Message.info('温馨提示：您取消了分配权限！');
        },
        showPop(flag, row) {
            this.showModel = flag;
        },
        showChildPop(flag, row, index) {
            this.clearFormData();
            if (row && row.id) {
                this.formValidate.parentId = row.id;
            }
            this.showModel = flag;
        },
        clearFormData() {
            this.$delete(this.formValidate,'id')
            this.formValidate = {
                name: '',
                linkUrl: '',
                icon:'',
                code:'',
                isMenu: true,
                enabled:true,
                parentId:0,
                children:[]
            }
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.getMenuList();
        },
        //保存菜单
        saveMenu() {
            var params = this.formValidate;
            params['icon'] = this.formValidate['icon']&&this.formValidate['icon'][0]&&this.formValidate['icon'][0]['filePath'];
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateAuthModule(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
                            this.showPop(false);
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                            this.loading = true;
                            this.getMenuList();
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            } else {
                this.actionSelect = this.activatedRow.parentId||this.activatedRow.id;
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    UpdateAuthModule({...params,id:this.activatedRow.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：更新成功！');
                            this.showPop(false);
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                            this.loading = true;
                            this.getMenuList();
                            this.activatedRow = {};
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        goEdit(){
            if(this.activatedRow.id){
                this.formValidate['id'] = this.activatedRow.id;
                this.formValidate['name'] = this.activatedRow.name;
                this.formValidate['linkUrl'] = this.activatedRow.linkUrl;
                this.formValidate['icon'] = [];
                this.formValidate['code'] = this.activatedRow.code;
                this.formValidate['orderSort'] = this.activatedRow.orderSort;
                this.formValidate['isMenu'] = this.activatedRow.isMenu;
                this.formValidate['enabled'] = this.activatedRow.enabled;
                this.formValidate['parentId'] = this.activatedRow.parentId;
                this.formValidate['icon'].push({filePath:this.activatedRow.icon});
                this.showModel = true;
            }
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            // datas.push(columns[0]);
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
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        getTableColumn(){
            var data = [{
                    title: '菜单名称',
                    key: 'name',
                    tree: true,
                    resizable: true,
                    width: 329,
                },
                {
                    title: '路由地址',
                    key: 'linkUrl',
                    resizable: true,
                    width: 400,
                },
                {
                    title: '菜单图标',
                    key: 'icon',
                    resizable: true,
                    width: 200,
                },
                {
                    title: '标签',
                    key: 'code',
                    resizable: true,
                    width: 120,
                },
                {
                    title: '是否菜单',
                    key: 'isMenu',
                    render: (h, params) => {
                        return h("span", {
                            style: {
                                display: "inline-block",
                                color: params.row.isMenu==true ? "#19be6b": "#ed4014"
                            },
                        },params.row.isMenu?'是':'否');
                    },
                    resizable: true,
                    width: 120,
                },
                {
                    title: '创建时间',
                    key: 'createdOn',
                    resizable: true,
                    width: 180,
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
                        },params.row.enabled?'是':'否');
                    },
                    resizable: true,
                    width: 120,
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    resizable: true,
                    width: 250,
                }]
            return data;
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.getMenuList();
        },
        deleteData(){
            if(this.activatedRow.id){
                this.actionSelect = this.activatedRow.parentId;
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DeleteAuthModule({id:this.activatedRow.id}).then(res => {
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
                            this.getMenuList();
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
            this.getMenuList(); 
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.getMenuList();
        },
    },
    created() {
        this.getMenuList();
    },
    activated() {
        if(this.data.length)
            this.getMenuList();    
    },
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
