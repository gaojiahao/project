<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-30 19:50:02
-->
<template>
<div class="add_store">
    <div class="top">
        <Divider orientation="left" size="small">制图选项信息</Divider>
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
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/settings/makePicManager/addMakePicConfig";
import {
    CreateSystemConfig,
    UpdateSysetmConfig
} from "@service/settingsService"

export default {
    name: "EditMakePic",
    components: {
        XForm,
    },
    data() {
        return {
            selectPBind: {},
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
                            UpdateSysetmConfig(params).then(res => {
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
                    }
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        clearFormData() {
            this.formValidate.id = '';
            this.$refs['form'].$refs['formValidate'].resetFields();
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
</style>
