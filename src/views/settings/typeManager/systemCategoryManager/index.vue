<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-05 16:30:52
-->
<template>
<div class="manager-container">
    <div class="manager-container-panel">
        <div class="left">
            <TypeManagerList :list="list" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @show-add-child="showAddChild" @edit="edit" @del="sureDeleteConfirm" @set-filter="setFilter"></TypeManagerList>
        </div>
        <div class="right">
            <div class="item" v-show="isShowAdd">
                <div class="top">
                    <Divider orientation="left" size="small">{{title}}</Divider>
                    <div class="top_tabale">
                        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                            <template slot="button">
                                <FormItem>
                                    <div style="width:100%">
                                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                                        <Button @click="clearFormData" style="float: left; margin-left:10px" v-if="!formValidate.id">取消</Button>
                                    </div>
                                </FormItem>
                            </template>
                        </XForm>
                    </div>
                </div>
            </div>
            <div class="item"  v-show="isShowBind">
                <div class="top">
                    <Divider orientation="left" size="small">类目属性</Divider>
                    <TypeManagerTab :list="attrList" :loading="attrLoading" :pageAttrData="pageAttrData" @change-page="changePage" @on-page-size-change="onPageSizeChange" @get-data="GetAttributeCategoryPage" :categoryId="formValidate.id" ref="typeManagerTab"></TypeManagerTab>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/settings/typeManager/typeManagerConfig";
import TypeManagerList from "@components/settings/typeManager/typeManagerList";
import TypeManagerTab from "@components/settings/typeManager/typeManagerTab";
import XForm from "@components/public/form/xForm";
import {
    GetCategoryList,
    CreateCategory,
    UpdateCategory,
    DelCategory,
    GetAttributeCategoryPage
} from "@service/settingsService"

export default {
    name: "TypeManager",
    mixins: [config],
    components: {
        TypeManagerList,
        XForm,
        TypeManagerTab,
    },
    data() {
        return {
            list: [],
            selectPBind: {},
            selectSBind: {},
            isShowAdd: true,
            isShowBind:false,
            listLoading: true,
            attrList:[],
            attrLoading:true,
            pageData:{
                keyword:'',
                maxResultCount:200,
            },
            pageAttrData:{
                skipCount: 1,
                skipTotal: 10,
                maxResultCount: 10,
                keyword:'',
                totalPage:0,
                pageSizeOpts:[10,50,200],
            },
            activatedRow:{}
        }
    },
    computed:{
        title(){
            if(this.formValidate.id){
                return '编辑';
            } else {
                return '新建';
            }
        }    
    },
    methods: {
        GetCategoryList() {
            return new Promise((resolve, reject) => {
                GetCategoryList(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.list = res.result.item;
                            this.listLoading = false;
                        });
                    }
                });
            });
        },
        GetAttributeCategoryPage() {
            return new Promise((resolve, reject) => {
                GetAttributeCategoryPage({categoryId:this.formValidate.id,...this.pageAttrData}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.attrList = res.result.item.items;
                            this.pageAttrData.totalPage = res.result.item.totalCount;
                            this.attrLoading = false;
                        });
                    }
                });
            });
        },
        save() {
            var params = this.formValidate;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateCategory(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.GetCategoryList();
                                    //this.clearFormData();
                                    this.formValidate.name='';
                                    this.formValidate.level='';
                                    this.$refs['form'].initEL('input');
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
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateCategory(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.GetCategoryList();
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
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        selectItem(index) {
            this.isShowBind = true;
        },
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        //选择系统类目后的处理
        selectSystemBind(data) {
            this.selectSBind = data;
            if (this.selectPBind && this.selectSBind) {
                this.$Message.info('温馨提示：绑定成功');
                setTimeout(() => {
                    this.$refs.selectPlatformBind.removeSelect();
                    this.$refs.selectSystemBind.removeSelect();
                }, 1000);
            }
        },
        showAdd() {
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$delete(this.formValidate,'id');
            this.isShowAdd = true;
            this.isShowBind = false;
            this.formValidate.parentId= 0;
            this.$refs['form'].initEL('input');
        },
        showAddChild(data) {
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$delete(this.formValidate,'id');
            this.isShowAdd = true;
            this.isShowBind = false;
            if(data.id){
                this.formValidate.parentName = data.name;
                this.formValidate.parentId = data.id;
            }
            this.$refs['form'].initEL('input');
        },
        clearFormData() {
            // this.isShowAdd = false;
            this.$delete(this.formValidate,'id');
            this.isShowBind = false;
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.formValidate.parentId=0;
        },
        edit(root,node,data){
            this.activatedRow = data;
            var parentName = "";
            if(data.parentId){
                parentName = root.find(el => el.node.id === node.node.parentId).node.name;
            }
            this.formValidate = {
                parentId: data.parentId,
                parentName :parentName,
                name: data.name,
                level: data.level,
                id: data.id,
            };
            this.pageAttrData={
                skipCount: 1,
                skipTotal: 10,
                maxResultCount: 10,
                keyword:'',
                totalPage:0,
                pageSizeOpts:[10,50,200],
            },
            this.GetAttributeCategoryPage();
            this.isShowAdd = true;
            this.isShowBind = true;
            this.$refs.typeManagerTab.$refs.selectorMulti.initPage();
        },
        sureDeleteConfirm (root, node, data,flag) {
            if (data.id&&this.activatedRow.id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '数据删除后将无法恢复！',
                    onCancel: () => {
                        this.$Message.info('取消');
                    },
                    onOk: () => {
                        flag ? this.deletesData() : this.deleteData(root, node, data);
                    },
                });
            }
        },
        deleteData(root, node, data) {
            if (data.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelCategory({id:data.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetCategoryList();
                            this.clearFormData();
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
        setFilter(value){
            this.pageData.keyword = value;
            this.GetCategoryList(); 
        },
        changePage(page) {
            this.pageAttrData.skipCount = page;
            this.GetAttributeCategoryPage();
        },
        onPageSizeChange(pagesize){
            this.pageAttrData.maxResultCount = pagesize;
            this.GetAttributeCategoryPage();
        },
    },
    created() {
        this.GetCategoryList();
    }
}
</script>

<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
@import "~@less/form.less";
</style>
