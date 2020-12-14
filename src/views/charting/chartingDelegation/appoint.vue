<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-12 09:42:57
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">基本信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <div style="width:100%">   
                    </div>
                </template>
            </ViewForm>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">人员分配</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form">
                <FormItem>
                    <div style="width:100%">
                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                        <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                    </div>
                </FormItem>
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/charting/chartingDelegation/productAppointStoreConfig";
const viewForm = ()=>import("@components/public/form/viewForm");
const xForm = ()=>import("@components/public/form/xForm");

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'Appoint',
    components: {
        Tabs,
        TabPane,
        ViewForm:viewForm,
        XForm:xForm,
    },
    mixins: [config],
    data(){
        return{
        }
    },
    methods: {
        clearFormData() {},
        save() {},
    },
    created(){ }
}
</script>

<style lang="less" scoped>
@import  "~@less/form.less";
</style>
