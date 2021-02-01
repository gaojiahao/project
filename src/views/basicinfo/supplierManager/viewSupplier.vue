<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-01 16:44:28
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">供应商信息</Divider>
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
import config from "@views/basicinfo/supplierManager/addSupplierConfig";
import {
    CreateSupplier,
    UpdateSupplier,
    GetSupplierById
} from "@service/basicinfoService";

export default {
    name: "ViewSupplier",
    components: {
        ViewForm,
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
        goReturn(){
            this.$router.go(-1);
        },
    },
    created() {
        this.id = this.$route.query.id;
        if(this.id) {
            return new Promise((resolve, reject) => {
                GetSupplierById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            id: res.result.item.id,
                            name: res.result.item.name,
                            code: res.result.item.code,
                            telePhone: res.result.item.telePhone,
                            changeUser: res.result.item.changeUser,
                            address: res.result.item.address,
                            email: res.result.item.email,
                            remark: res.result.item.remark,
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
@import "~@less/form.less";
</style>