<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-12 16:09:06
-->
<template>
<div>
    <div class="bottom-title">
        商品信息
    </div>
    <div class="top">
        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
            <template slot="button">
                <div style="width:100%">
                    <Button type="primary" @click="slotSave" style="float: left;">保存</Button>
                    <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                </div>
            </template>
        </XForm>
    </div>
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/customer/supplierManager/addSupplierConfig";

export default {
    name: "AddSupplier",
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
        },

    },
    created() {

    }
}
</script>

<style lang="less" scoped>
.top {
    flex: 1;
    margin: 0 10px;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
}

.bottom-title {
    margin: 0 10px;
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 10px 20px;
}

.bottom {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
}
</style>
