<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-25 11:55:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 19:50:47
-->
<template>
<div class="add_store">
    <div class="top">
        <Divider orientation="left" size="small">用户信息</Divider>
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
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import config from "@views/settings/userManager/viewUserManagerConfig";
import {
    UpdateUserInfo,
    GetUserInfoById
} from "@service/settingsService"

export default {
    name: "ViewUser",
    components: {
        ViewForm,
    },
    data() {
        return {
            id:null
        }
    },
    mixins: [config],
    methods: {
        save() {
            var params = this.formValidate;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateUserInfo(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.$router.go(-1);
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
                }

            })
        },
        clearFormData() {},
        goReturn(){
            this.$router.push({name:'userManagerList'});
        },

    },
    created() {
        this.id = this.$route.query.id;
        if(this.id) {
            return new Promise((resolve, reject) => {
                GetUserInfoById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            id: res.result.item.id,
                            userName: res.result.item.userName,
                            roleId: res.result.item.roleId,
                            merchantCode: res.result.item.merchantCode,
                            nickName:res.result.item.nickName,
                            email:res.result.item.email,
                            phoneNumber:res.result.item.phoneNumber,
                            birthday:res.result.item.birthday,
                            sex:res.result.item.sex,
                            password:res.result.item.password,
                            isManager:res.result.item.isManager,
                            enabled:res.result.item.enabled,
                            remark:res.result.item.remark,
                            userRoleId:res.result.item.userRoleId,
                        };
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
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
