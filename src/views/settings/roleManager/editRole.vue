<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-25 11:55:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-31 18:02:26
-->
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-24 20:43:53
-->
<template>
<div class="add_store">
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
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/settings/roleManager/roleManagerConfig";
import {
    UpdateAuthRole,
    GetUserRoleMenuById
} from "@service/settingsService"

export default {
    name: "EditStore",
    components: {
        XForm,
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
                            UpdateAuthRole(params).then(res => {
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
                }

            })
        },
        clearFormData() {},
        goReturn(){
            this.$router.go(-1);
        }
    },
    created() {
        this.id = this.$route.query.id;
        if(this.id) {
            return new Promise((resolve, reject) => {
                GetUserRoleMenuById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            id: res.result.item.id,
                            roleName: res.result.item.roleName,
                            roleCode:res.result.item.roleCode,
                            enabled:res.result.item.enabled,
                            isAdmin:res.result.item.isAdmin,
                            merchantId:res.result.item.merchantId,
                            moduleIdList:res.result.item.moduleIdList
                        };
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
