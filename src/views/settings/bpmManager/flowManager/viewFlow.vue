<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-01 17:16:11
-->
<template>
<div class="form">
    <div class="top">
        <Divider orientation="left" size="small">流程信息</Divider>
        <div class="top_tabale">
            <div class="myTable">
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
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import config from "@views/settings/bpmManager/flowManager/addConfig";
import {
    CreateWorkflowClause,
    GetWorkflowClauseById,
    UpdateWorkflowClause
} from "@service/settingsService"

export default {
    name: "ViewFlow",
    components: {
        ViewForm,
    },
    data() {
        return {

        }
    },
    mixins: [config],
    methods: {
        save() {
            var params = this.formValidate;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.formValidate.packageId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateWorkflowClause(params).then(res => {
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
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        clearFormData() {
            this.$refs.form.$refs['formValidate'].resetFields();
            this.$router.go(-1); 
        },
        goReturn(){
            this.$router.go(-1);
        },
    },
    created() {
        this.id = this.$route.query.id;
        if(this.id) {
            return new Promise((resolve, reject) => {
                GetWorkflowClauseById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            packageId: res.result.item.packageId,
                            workflowName: res.result.item.workflowName,
                            workflowIcon: res.result.item.workflowIcon,
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
    }
}
</script>

<style lang="less" scoped>
@import  "~@less/form.less";
</style>
