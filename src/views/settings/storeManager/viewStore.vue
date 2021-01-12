<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-07 16:08:17
-->
<template>
<div class="edit_store">
    <Row>
        <Col span="12">
            <div class="top">
                <Divider orientation="left" size="small">店铺信息</Divider>
                <div class="top_tabale">
                    <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                                </div>
                            </FormItem>
                        </template>
                    </ViewForm>
                </div>
            </div>
        </Col>
        <Col span="12">
            <div class="item">
                <div class="top">
                    <Divider orientation="left" size="small">选择系统类目</Divider>
                    <div class="top_tabale">
                        <SystemCategoryBind :loading="loading" @select-system-bind="selectSystemBind" @set-filter="setSystemCategoryFilter" ref="selectSystemBind" :data="systemCategoryData" :formData="formValidate.storeBinds"></SystemCategoryBind>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</div>
</template>

<script>
import {
    Row,
    Col
} from "view-design";
import ViewForm from "@components/public/form/viewForm";
import config from "@views/settings/storeManager/editStoreConfig";
import SystemCategoryBind from "@components/settings/storeManager/systemCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import {
    CreateStore,
    UpdateStore,
    GetStoreById,
    GetCategoryList
} from "@service/settingsService"

export default {
    name: "EditStore",
    components: {
        ViewForm,
        SystemCategoryBind,
        Row,
        Col
    },
    data() {
        return {
            selectPBind: {},
            id:null,
            loading:true,
            systemCategoryData:[]
        }
    },
    mixins: [config],
    methods: {
        save() {
            var params = this.formValidate;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateStore(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
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
                            UpdateStore(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
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
        clearFormData() {},
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        goReturn(){
            this.$router.go(-1);
        },
        setSystemCategoryFilter(value){
            this.GetCategoryList(value);
        },
        selectSystemBind(data){
            this.formValidate.storeBinds = data;
        },
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetStoreById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                name: res.result.item.name,
                                code: res.result.item.code,
                                account: res.result.item.account,
                                login_Id: res.result.item.login_Id,
                                app_Key: res.result.item.app_Key,
                                app_Secret: res.result.item.app_Secret,
                                platformId: res.result.item.platformId,
                                platformName: res.result.item.platformName,
                                status: res.result.item.status,
                                remark: res.result.item.remark,
                                storeBinds: res.result.item.storeBinds,
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
    },
    created() {
        this.getFormData();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
