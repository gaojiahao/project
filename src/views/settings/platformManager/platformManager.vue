<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-28 16:46:14
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
                    <Divider orientation="left" size="small">类目绑定</Divider>
                    <div class="" style="display:flex">
                        <PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind>
                        <SystemCategoryBind @select-system-bind="selectSystemBind" ref="selectSystemBind"></SystemCategoryBind>
                        <NowCategoryBind></NowCategoryBind>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/settings/platformManager/platformManagerConfig";
import XForm from "@components/public/form/xForm";
import PlatformManagerList from "@components/settings/platformManager/list";
import SystemCategoryBind from "@components/settings/platformManager/systemCategoryBind";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import CategoryBind from "@components/settings/platformManager/categoryBind";
import {
    CreatePlatforms,
    GetPlatformsPage,
    UpdatePlatforms,
    GetPlatformsById,
    DelPlatforms
} from "@service/basicinfoService"

export default {
    name: "platformManager",
    mixins: [config],
    components: {
        PlatformManagerList,
        CategoryBind,
        XForm,
        SystemCategoryBind,
        PlatformCategoryBind,
        NowCategoryBind,
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
                skipTotal: 100,
                maxResultCount: 100,
                keyword:''
            }
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
                                content: res.result.message
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
                                content: res.result.message
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        showAdd() {
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.isShowBind = false;
            this.$refs.selectPlatformBind.clear();
            this.$refs.selectSystemBind.clear();
        },
        clearFormData() {
            this.formValidate.id = '';
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        selectItem(id) {
            this.clearFormData();
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
                        this.isShowAdd = true;
                        this.isShowBind = true;
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.message
                        });
                    }
                });
            });
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
                                content: res.result.message
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        setFilter(value){
            this.pageData.keyword = value;
            this.GetPlatformsPage(); 
        }
    },
    created() {
        this.GetPlatformsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
</style>
