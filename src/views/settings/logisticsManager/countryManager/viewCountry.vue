<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-25 11:18:01
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">国家信息</Divider>
        <div class="top_tabale">
            <viewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                        </div>
                    </FormItem>
                </template>
            </viewForm>
        </div>
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import config from "@views/settings/logisticsManager/countryManager/addCountryConfig";
import {
    GetAreaById,
    CreateArea,
    UpdateArea
} from "@service/settingsService"

export default {
    name: "ViewCountry",
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
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateArea(params).then(res => {
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
                            UpdateArea(params).then(res => {
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
                GetAreaById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            id: res.result.item.id,
                            longName: res.result.item.longName,
                            abbreviation: res.result.item.abbreviation,
                            chinaName: res.result.item.chinaName,
                            areaLevel: res.result.item.areaLevel,
                            directLevel: res.result.item.directLevel,
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
