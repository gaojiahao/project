<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-26 11:08:27
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">运费设置</Divider>
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
import config from "@views/settings/freightManager/addFreightConfig";
import {
    TransportFormulaByID,
    CreateTransportFormula,
    UpdateTransportFormula,
} from "@service/settingsService"

export default {
    name: "EditFreight",
    components: {
        XForm,
    },
    data() {
        return {

        }
    },
    mixins: [config],
    methods: {
        save() {
             var params = {
                ...this.formValidate
            };
            var data = [];
            for(var i=0;i<this.formValidate['sumAreaCode'].length;i++){
                data.push(this.formValidate['sumAreaCode'][i]['name']);
            }
            params['sumAreaCode'] = data.join(',');
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateTransportFormula(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.$router.go(-1);
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
                            UpdateTransportFormula(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.goReturn();
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
            this.$router.push({name:'freightList'});
        },
        TransportFormulaByID(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    TransportFormulaByID({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                sumName: res.result.item.sumName,
                                sumCode: res.result.item.sumCode,
                                isElectrified: res.result.item.isElectrified,
                                minWeight: res.result.item.minWeight,
                                maxWeight: res.result.item.maxWeight,
                                sumAreaCode:[],
                            }
                            var data = res.result.item.sumAreaCode.split(","),
                            data2=[];
                            for(var i=0;i<data.length;i++){
                                var obj = {
                                    name: data[i],
                                    value: data[i],
                                    id: data[i],
                                }
                                data2.push(obj);
                            }
                            this.formValidate['sumAreaCode'] = data2;
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
    },
    created() {
        this.TransportFormulaByID();    
    }
}
</script>

<style lang="less" scoped>
@import "~@less/form.less";
</style>
