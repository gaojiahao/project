<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-28 15:05:39
-->
<template>
<div>
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="showPop(true)" class="marginRight">新建</Button>
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
        <Table row-key="id" :loading="loading" border :columns="columns" :data="list" stripe>
            <template slot-scope="{ row }" slot="number">
                <strong>{{ row.number }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="showChildPop(true,row,index)">新建子菜单</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="showPop(true,row)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal"></Page>
            </div>
        </div>
    </div>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ModalForm :titleText="addMenuTitle" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="saveMenu" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <AddChildMenu :titleText="addChildMenuTitle" :formValidate="formValidate" :ruleValidate="ruleValidate" :showChildModel='showChildModel' :formConfig="formConfig" @save="saveChildMenu" @show-child-pop="showChildPop" @clear-form-data="clearFormData"></AddChildMenu>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm"
import AddChildMenu from "@components/settings/menuManager/addChildMenu"
import config from '@views/settings/menuManager/menuManagerConfig'
import list from "@mixins/list";
import {
    addMenu,
    getMenuList
} from '@service/authority'

export default {
    name: 'MenuManager',
    components: {
        ModalForm,
        AddChildMenu
    },
    computed: {

    },
    mixins: [config,list],
    data() {
        return {
            list: [],
            titleText: '',
            showModel: false,
            showChildModel: false,
            loading: true,
            childIndex: '',
            addMenuTitle: '新建菜单',
            addChildMenuTitle: '新建子菜单',
            columns: [
                // {
                //     title: '序号',
                //     slot: 'number',
                //     type: 'index',
                //     width: 80,
                //     align: 'center'
                // },
                {
                    title: 'ID',
                    key: 'id'
                },
                {
                    title: '菜单名称',
                    key: 'displayName',
                    tree: true
                },
                {
                    title: '路由地址',
                    key: 'name',
                },
                {
                    title: '父级菜单',
                    key: 'parentId'
                },
                // {
                //     title: '是否菜单',
                //     key: 'isMenu'
                // },
                // {
                //     title: '子菜单',
                //     key: 'children'
                // },
                // {
                //     title: '创建时间',
                //     key: 'createTime',
                //     render: (h, params) => {
                //         return h('div', this.formatDate(this.list[params.index].createTime));
                //     }
                // },
                {
                    title: '是否启用',
                    key: 'isEnabled',
                    width: 120,
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.isEnabled === true ? 'success' : 'error';
                        const text = row.isEnabled === true ? '启用' : '禁用';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
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
        setUserAuthority(userId) {
            this.titleText = '正在编辑' + this.userId + "的权限";
            this.userId = this.list[userId].roleName;
            this.modal1 = true;
        },
        remove(index) {
            this.list.splice(index, 1);
            this.getMenuList();
        },
        //获取菜单列表
        getMenuList() {
            let data = [];

            getMenuList(data).then(res => {
                if (res.status == 200) {
                    console.log(res.data.data.items);
                    this.loading = false;
                    this.list = res.data.data.items;
                    //需要遍历处理子节点，默认树形展开 this.list[this.childIndex]['_showChildren'] = true;
                } else {
                    this.$Message.error({
                        background: true,
                        content: res.message
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
            //有id更新操作
            if (row && row.id) {
                this.formValidate = {
                    id: row.id,
                    name: row.name,
                    displayName: row.displayName,
                    url: row.name,
                    isMenu: row.isMenu ? 'true' : 'false',
                    isEnabled: row.isEnabled ? 'true' : 'false',
                    parentId: row.parentId,
                    children: row.children,
                }
                this.addMenuTitle = '编辑菜单';
            } else {
                this.addMenuTitle = '新建菜单';
            }
            this.showModel = flag;
        },
        showChildPop(flag, row, index) {
            if (row && row.id) {
                this.childIndex = index;
                this.formValidate.parentId = row.id;
            }
            this.showChildModel = flag;
        },
        clearFormData() {
            this.formValidate = {
                name: '',
                displayName: '',
                url: '',
                isMenu: '',
                isEnabled: '',
                parentId: '',
                children: []
            };
            this.childIndex = '';
        },
        //保存菜单
        saveMenu() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    addMenu(params).then(res => {
                        if (res.status == 200) {
                            this.$Message.info(res.data.message);
                            params = {
                                ...params,
                                ...res.data.data,
                            }
                            //this.list.push(params);
                            this.getMenuList();
                        } else if (res.status == 403) {
                            this.$Message.error({
                                background: true,
                                content: res.message
                            });
                        }
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$Message.info('更新成功');
                });
            }
        },
        //保存子菜单
        saveChildMenu() {
            var params = this.formValidate;
            return new Promise((resolve, reject) => {
                this.list[this.childIndex].children.push(params);
                this.list[this.childIndex]['_showChildren'] = true;
            });
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editStore',query: {id:this.activatedRow.id}});
            }
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
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetStorePage();
        },
    },
    created() {
        this.getMenuList();
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
