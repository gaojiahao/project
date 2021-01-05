<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-04 20:24:51
-->
<template>
<div class="edit_store">
    <div class="top">
        <Divider orientation="left" size="small">店铺信息</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button type="primary" @click="save" style="float: left;">保存</Button>
                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                        </div>
                    </FormItem>
                </template>
            </XForm>
        </div>
    </div>
    <div class="item">
        <div class="top">
            <Divider orientation="left" size="small">选择系统类目</Divider>
            <Row>
                <Col span="12"><PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind></Col>
                <Col span="12"><NowCategoryBind></NowCategoryBind></Col>
            </Row>
        </div>
    </div>
</div>
</template>

<script>
import {
    Row,
    Col
} from "view-design";
import XForm from "@components/public/form/xForm";
import config from "@views/settings/storeManager/addStoreConfig";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import {
    GetStorePage,
    CreateStore,
    UpdateStore,
    GetStoreById
} from "@service/settingsService"

export default {
    name: "EditStore",
    components: {
        XForm,
        PlatformCategoryBind,
        NowCategoryBind,
        Row,
        Col
    },
    data() {
        return {
            selectPBind: {},
            id:null
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
                                        content: res.result.message
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
                                        content: res.result.message
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
        }
    },
    created() {
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
                            remark: res.result.item.remark,
                            storeBinds: res.result.item.storeBinds,
                        }
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.message
                        });
                    }
                });
            });    
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
.edit_store /deep/ .ivu-row {
    background: #ffffff;
}
</style>
