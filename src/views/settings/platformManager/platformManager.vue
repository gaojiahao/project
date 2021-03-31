<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-31 09:38:43
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <PlatformManagerList :list="listData" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @del="sureDeleteConfirm" @set-filter="setFilter"></PlatformManagerList>
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
            <div class="item" v-show="isShowBind">
                <div class="top">
                    <!-- <Divider orientation="left" size="small">类目绑定</Divider> -->
                    <Row>
                        <Col span="8"><PlatformCategoryBind @select-platform-bind="selectPlatformBind" @set-filter="setPlatformCategoryFilter" ref="selectPlatformBind" :data="platformCategoryData"></PlatformCategoryBind></Col>
                        <Col span="8"><SystemCategoryBind @select-system-bind="selectSystemBind" @set-filter="setSystemCategoryFilter" ref="selectSystemBind" :data="systemCategoryData"></SystemCategoryBind></Col>
                        <Col span="8"><NowCategoryBind :loading="nowLoading" @set-filter="setNowCategoryFilter" ref="selectNowBind" :data="nowCategoryData" @del="delCategoryRelationConfirm"></NowCategoryBind></Col>
                    </Row>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Row,
    Col
} from "view-design";
import config from "@views/settings/platformManager/platformManagerConfig";
import XForm from "@components/public/form/xForm";
import PlatformManagerList from "@components/settings/platformManager/list";
import SystemCategoryBind from "@components/settings/platformManager/systemCategoryBind";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";

import {
    CreatePlatforms,
    GetPlatformsPage,
    UpdatePlatforms,
    GetPlatformsById,
    DelPlatforms,
    GetCategoryList,
    CreateCategoryRelation,
    GetCategoryRelatedList,
    GetEcommerceCategoryList,
    DelCategoryRelation
} from "@service/settingsService"

export default {
    name: "platformManager",
    mixins: [config],
    components: {
        PlatformManagerList,
        XForm,
        SystemCategoryBind,
        PlatformCategoryBind,
        NowCategoryBind,
        Row,
        Col
    },
    data() {
        return {
            listData: [],
            selectPBind: {},
            selectSBind: {},
            listLoading: true,
            isShowAdd: true,
            isShowBind:false,
            pageData:{
                skipCount: 1,
                skipTotal: 200,
                maxResultCount: 200,
                keyword:''
            },
            systemCategoryData:[],
            nowCategoryData:[],
            platformCategoryData:[],
            nowLoading:true,
            pageDataEmm:{
                platformId:'',
                keyword:'',
                maxResultCount: 200,
            },
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
        GetPlatformsPage() {
            return new Promise((resolve, reject) => {
                GetPlatformsPage(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.listData = res.result.item.items;
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
                            CreatePlatforms(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.GetPlatformsPage();
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
                            UpdatePlatforms(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.GetPlatformsPage();
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
        showAdd() {
            this.$delete(this.formValidate,'id');
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.isShowBind = false;
            this.$refs.selectPlatformBind.clear();
            this.$refs.selectSystemBind.clear();
        },
        clearFormData() {
            this.$delete(this.formValidate,'id');
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        selectItem(id) {
            this.clearFormData();
            this.selectPBind = [];
            this.selectSBind = [];
            return new Promise((resolve, reject) => {
                GetPlatformsById({id:id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            name: res.result.item.name,
                            code: res.result.item.code,
                            url: res.result.item.url,
                            chargeUser: res.result.item.chargeUser,
                            merchantId: res.result.item.merchantId,
                            parentIndex: res.result.item.parentIndex,
                            id: res.result.item.id,
                        }
                        this.pageDataEmm.platformId = id;
                        this.isShowAdd = true;
                        this.isShowBind = true;
                        this.$refs.selectPlatformBind.onCler();
                        this.$refs.selectSystemBind.onCler();
                        this.GetCategoryRelatedList();
                        this.GetEcommerceCategoryList();
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                    }
                });
            });
        },
        selectPlatformBind(data) {
            this.selectPBind = data;
            if (this.selectPBind.id && this.selectSBind.id) {
                var datas = {
                    categoryId: this.selectSBind.id,
                    categoryName: this.selectSBind.name,
                    platformsId: this.formValidate.id,
                    platformName: this.formValidate.name,
                    eCategotyId: this.selectPBind.id,
                    eCategotyName: this.selectPBind.name
                };
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateCategoryRelation(datas).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.$FromLoading.hide();
                                this.$Message.info('温馨提示：绑定成功');
                                this.$refs.selectPlatformBind.clear();
                                this.$refs.selectSystemBind.clear();
                                this.selectPBind = {};
                                this.selectSBind = {};
                                this.GetCategoryRelatedList();
                            });
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$refs.selectPlatformBind.clear();
                            this.$refs.selectSystemBind.clear();
                            this.selectPBind = {};
                            this.selectSBind = {};
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        //选择系统类目后的处理
        selectSystemBind(data) {
            this.selectSBind = data;
            if (this.selectPBind.id && this.selectSBind.id) {
                var datas = {
                    categoryId: this.selectSBind.id,
                    categoryName: this.selectSBind.name,
                    platformsId: this.formValidate.id,
                    platformName: this.formValidate.name,
                    eCategotyId: this.selectPBind.id,
                    eCategotyName: this.selectPBind.name
                };
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateCategoryRelation(datas).then(res => {
                        if(res.result.code==200){
                            this.$nextTick(() => {
                                this.$FromLoading.hide();
                                this.$Message.info('温馨提示：绑定成功');
                                this.$refs.selectPlatformBind.clear();
                                this.$refs.selectSystemBind.clear();
                                this.selectPBind = {};
                                this.selectSBind = {};
                                this.GetCategoryRelatedList();
                            });
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$refs.selectPlatformBind.clear();
                            this.$refs.selectSystemBind.clear();
                            this.selectPBind = {};
                            this.selectSBind = {};
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        sureDeleteConfirm (id,flag) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    flag ? this.deletesData() : this.deleteData(id);
                },
            });
        },
        deleteData(id){
            if (id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelPlatforms({id:id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetPlatformsPage();
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
            this.pageData.skipCount = 1;
            this.GetPlatformsPage();
        },
        setPlatformCategoryFilter(value){
            this.pageDataEmm.keyword=value;
            this.GetEcommerceCategoryList(); 
        },
        setSystemCategoryFilter(value){
            this.GetCategoryList(value);
        },
        setNowCategoryFilter(value){
            this.GetCategoryRelatedList();
        },
        GetCategoryList(value) {
            return new Promise((resolve, reject) => {
                GetCategoryList({keyword:value,maxResultCount:200}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.systemCategoryData = res.result.item;
                        });
                    }
                });
            });
        },
        GetCategoryRelatedList() {
            this.nowLoading = true;
            return new Promise((resolve, reject) => {
                GetCategoryRelatedList({platformId:this.formValidate.id,maxResultCount:200}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.nowCategoryData = res.result.item;
                            this.nowLoading = false;
                        });
                    }
                });
            });
        },
        GetEcommerceCategoryList() {
            return new Promise((resolve, reject) => {
                GetEcommerceCategoryList(this.pageDataEmm).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.platformCategoryData = res.result.item;
                        });
                    }
                });
            });
        },
        delCategoryRelationConfirm(id) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    this.delCategoryRelationData(id);
                },
            });
        },
        delCategoryRelationData(id){
            if (id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelCategoryRelation({id:id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetCategoryRelatedList();
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
    },
    created() {
        // this.GetEcommerceCategoryList();
        this.GetPlatformsPage();
        this.GetCategoryList();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
@import "~@less/form.less";
</style>
