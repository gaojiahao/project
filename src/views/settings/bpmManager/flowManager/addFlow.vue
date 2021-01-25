<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-23 11:13:43
-->
<template>
<div class="form">
    <div class="top">
        <Divider orientation="left" size="small">流程信息</Divider>
        <div class="top_tabale">
            <div class="myTable">
                <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                    <template slot="button">
                        <FormItem>
                            <div style="width:100%">
                                <Button type="primary" @click="slotSave" style="float: left;">保存</Button>
                                <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                            </div>
                        </FormItem>
                    </template>
                </XForm>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/settings/bpmManager/flowManager/addConfig";
import {
    CreateWorkflowClause
} from "@service/settingsService"

export default {
    name: "AddFlow",
    components: {
        XForm,
    },
    data() {
        return {

        }
    },
    mixins: [config],
    methods: {
        slotSave() {
            this.$refs.form.handleSubmit('formValidate');
        },
        save() {
            var params = this.formValidate;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateWorkflowClause(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    if(res.result.item.id){
                                        this.$router.push({name:'saveBpm',query: {id:res.result.item.id}});    
                                    }
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
        clearFormData() {
            this.$refs.form.$refs['formValidate'].resetFields();
            this.$router.go(-1); 
        },

    },
    created() {

    }
}
</script>

<style lang="less" scoped>
@import  "~@less/form.less";
</style>
