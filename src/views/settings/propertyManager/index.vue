<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-23 09:38:39
-->
<template>
<div class="manager-container">
    <div class="manager-container-panel">
        <div class="left">
            <PropertyManagerList :list="listData" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @show-add-child="showAddChild" @edit="edit" @edit-child="editChild" @del="sureDeleteConfirm" @del-child="sureDeleteConfirmChild" @set-filter="setFilter"></PropertyManagerList>
        </div>
        <div class="right" v-show="isShowAdd">
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
        <div class="right" v-show="isShowChild">
            <div class="top">
                <Divider orientation="left" size="small">{{title}}</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form2">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button type="primary" @click="saveChild" style="float: left;">保存</Button>
                                    <!-- <Button @click="clearFormData2" style="float: left; margin-left:10px">取消</Button> -->
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PropertyManagerList from "@components/settings/propertyManager/propertyManagerList";
import config from "@views/settings/propertyManager/propertyManagerConfig.js";
import XForm from "@components/public/form/xForm";
import {
    GetAttributeList,
    CreateAttributes,
    UpdateAttributes,
    DelAttributes,
    GetAttributeById,
    CreateAttributeValue,
    UpdateAttributeValue,
    DelAttributeValue
} from "@service/settingsService"

export default {
    name: "PropertyManager",
    mixins: [config],
    components: {
        PropertyManagerList,
        XForm,
    },
    data() {
        return {
            listData: [],
            selectPBind: {},
            selectSBind: {},
            listLoading: true,
            isShowAdd:true,
            isShowChild:false,
            pageData:{
                maxResultCount: 200,
                keyword:''
            }
        }
    },
    computed:{
        title(){
            if(this.formValidate.id||this.formValidate2.id){
                return '编辑';
            } else {
                return '新建';
            }
        }    
    },
    methods: {
        GetAttributeList() {
            return new Promise((resolve, reject) => {
                GetAttributeList(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.listData = res.result.item;
                            this.listLoading = false;
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
                            CreateAttributes(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.GetAttributeList();
                                    this.$refs['form'].$refs['formValidate'].resetFields();
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
                            UpdateAttributes(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.GetAttributeList();
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
        saveChild() {
            var params = this.formValidate2;
            this.$refs['form2'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!this.formValidate2.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateAttributeValue(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.GetAttributeList();
                                    this.$refs['form2'].$refs['formValidate'].resetFields();
                                    this.$refs['form2'].initEL('input');
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
                            UpdateAttributeValue(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.GetAttributeList();
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
        clearFormData() {
            this.$delete(this.formValidate,'id');
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.formValidate2.attributeId='';
        },
        clearFormData2() {
            this.formValidate2.attributeId='';
            this.$refs['form2'].$refs['formValidate'].resetFields();
        },
        selectItem(id) {

        },
        showAdd() {
            this.$delete(this.formValidate,'id');
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$delete(this.formValidate2,'id');
            this.$refs['form2'].$refs['formValidate'].resetFields();
            this.isShowChild=false;
            this.isShowAdd = true;
        },
        showAddChild(root,node,data) {
            this.$delete(this.formValidate,'id');
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$delete(this.formValidate2,'id');
            this.$refs['form2'].$refs['formValidate'].resetFields();
            this.isShowChild=true;
            this.isShowAdd=false;
            this.formValidate2.attributeId = data.id;
            this.formValidate2.attributeName = data.title;
        },
        edit(root,node,data){   
            this.clearFormData();         
            this.formValidate = {
                name: data.name,
                groupName :data.groupName,
                id: data.id,
            };
            this.isShowAdd = true;
            this.isShowChild = false;
        },
        editChild(root,node,data){
            var attributeName = "";
            if(data.attributeId){
                attributeName = root.find(el => el.node.id === data.attributeId).node.name;
            }
            this.formValidate2 = {
                attributeId: data.attributeId,
                attributeName: attributeName,
                valueName :data.valueName,
                id: data.id,
            };
            this.isShowAdd = false;
            this.isShowChild = true;
        },
        sureDeleteConfirm (root, node, data,flag) {
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
        },
        deleteData(root, node, data) {
            if (data.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelAttributes({id:data.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetAttributeList();
                            this.clearFormData();
                            this.showAdd();
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
        sureDeleteConfirmChild (root, node, data,flag) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    flag ? this.deletesData() : this.deleteDataChild(root, node, data);
                },
            });
        },
        deleteDataChild(root, node, data) {
            if (data.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelAttributeValue({id:data.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetAttributeList();
                            this.clearFormDataChild();
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
            this.GetAttributeList(); 
        },
    },
    created() {
        this.GetAttributeList();
    }
}
</script>

<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
@import "~@less/form.less";
</style>
