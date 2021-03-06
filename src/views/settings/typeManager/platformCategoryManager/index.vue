<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-06 12:20:42
-->
<template>
<div class="manager-container">
    <div class="manager-container-panel">
        <div class="left">
            <PlatFormTypeManagerList :list="list" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @show-add-child="showAddChild" @edit="edit" @del="sureDeleteConfirm" @set-filter="setFilter" @set-platform-filter="setEcommerceCategoryFilter" ref="list"></PlatFormTypeManagerList>
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
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/settings/typeManager/platformTypeManagerConfig";
import PlatFormTypeManagerList from "@components/settings/typeManager/platFormTypeManagerList.vue";
import XForm from "@components/public/form/xForm";
import {
    GetEcommerceCategoryList,
    CreateEcommerceCategory,
    UpdateEcommerceCategory,
    DelEcommerceCategory,
} from "@service/settingsService"

export default {
    name: "TypeManager",
    mixins: [config],
    components: {
        PlatFormTypeManagerList,
        XForm,
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
                platFormId:'',
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
        GetEcommerceCategoryList() {
            return new Promise((resolve, reject) => {
                GetEcommerceCategoryList(this.pageData).then(res => {
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
                            CreateEcommerceCategory(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.GetEcommerceCategoryList();
                                    // this.clearFormData();
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
                            UpdateEcommerceCategory(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.GetEcommerceCategoryList();
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
        selectItem(selectItem) {
            this.activatedRow = selectItem;
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
        showAdd(data) {
            this.$delete(this.formValidate,'id');
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.isShowAdd = true;
            this.isShowBind = false;
            this.formValidate.platformId = this.$refs.list.platFormId;
            this.formValidate.parentId= 0;
            this.$refs['form'].initEL('input');
        },
        showAddChild(data) {
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$delete(this.formValidate,'id');
            this.isShowAdd = true;
            this.isShowBind = false;
            this.formValidate.platformId = this.$refs.list.platFormId;
            if(this.activatedRow.data.id){
                this.formValidate.parentName = this.activatedRow.data.name;
                this.formValidate.parentId = this.activatedRow.data.id;
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
            var parentName = "";
            if(this.activatedRow.data.parentId){
                parentName =  this.activatedRow.root.find(el => el.node.id === this.activatedRow.node.node.parentId).node.name;
            }
            this.formValidate = {
                parentId: this.activatedRow.data.parentId,
                parentName :parentName,
                platformId: this.activatedRow.data.platformId,
                platformName: this.activatedRow.data.platformName,
                name: this.activatedRow.data.name,
                level: this.activatedRow.data.level,
                id: this.activatedRow.data.id,
            };
            this.pageAttrData={
                skipCount: 1,
                skipTotal: 10,
                maxResultCount: 10,
                keyword:'',
                totalPage:0,
                pageSizeOpts:[10,50,200],
            },
            this.isShowAdd = true;
            this.isShowBind = true;
        },
        sureDeleteConfirm (root, node, data,flag) {
            if (this.activatedRow.data.id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '数据删除后将无法恢复！',
                    onCancel: () => {
                        this.$Message.info('取消');
                    },
                    onOk: () => {
                        flag ? this.deletesData() : this.deleteData(root, node, this.activatedRow.data);
                    },
                });
            }
        },
        deleteData(root, node, data) {
            if (data.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelEcommerceCategory({id:data.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetEcommerceCategoryList();
                            this.clearFormData();
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
        setFilter(value){
            this.pageData.keyword = value;
            this.GetEcommerceCategoryList(); 
        },
        changePage(page) {
            this.pageAttrData.skipCount = page;
            this.GetAttributeCategoryPage();
        },
        onPageSizeChange(pagesize){
            this.pageAttrData.maxResultCount = pagesize;
            this.GetAttributeCategoryPage();
        },
        setEcommerceCategoryFilter(value){
            this.pageData.platFormId = value;
            this.GetEcommerceCategoryList();
        }
    },
    created() {
        this.GetEcommerceCategoryList();
    }
}
</script>

<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
@import "~@less/form.less";
</style>
