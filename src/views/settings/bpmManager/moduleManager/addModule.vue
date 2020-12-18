<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 17:04:58
-->
<template>
<div class="form">
    <div class="top">
        <Divider orientation="left" size="small">模块信息</Divider>
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
import config from "@views/settings/bpmManager/moduleManager/addSupplierConfig";

export default {
    name: "AddModule",
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
            this.$Message.info('温馨提示：成功');
            this.$refs['form'].$refs['formValidate'].resetFields()
            this.$refs['form'].initEL('input');

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
