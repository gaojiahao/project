<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 16:11:27
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">运费设置</Divider>
        <div class="top_tabale">
            <viewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="form">
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
import config from "@views/settings/freightManager/addFreightConfig";
import {
    TransportFormulaByID
} from "@service/settingsService"

export default {
    name: "ViewFreight",
    components: {
        ViewForm,
    },
    data() {
        return {

        }
    },
    mixins: [config],
    methods: {
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
                                sumAreaCode: res.result.item.sumAreaCode,
                            }
                            this.formValidate['sumAreaCode'] = this.formValidate['sumAreaCode'].split(",");
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
