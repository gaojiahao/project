<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-11 20:29:30
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
        <Divider orientation="left" size="small">上传文件</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form">
                <FormItem v-for="(item,index) in data" :key="index" slot="other">
                    <MultUpload :item="item" v-model="formValidate2['data'][index]" :config="config"></MultUpload> 
                </FormItem>
                <template slot="button">
                    <FormItem>
                        
                    </FormItem>
                </template>
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/charting/chartingManager/viewProductAppointStoreConfig";
const viewForm = ()=>import("@components/public/form/viewForm");
const xForm = ()=>import("@components/public/form/xForm");
const multUpload = ()=>import("@components/charting/multUpload");

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'ViewUploadProgress',
    components: {
        Tabs,
        TabPane,
        ViewForm:viewForm,
        XForm:xForm,
        MultUpload:multUpload
    },
    mixins: [config],
    data(){
        return{
            data:[
                {
                    platform: '速卖通',
                    store: '玩具店铺1',
                    people: '李四'
                },
                {
                    platform: '速卖通',
                    store: '玩具店铺2',
                    people: '李四'
                },
                {
                    platform: '速卖通',
                    store: '玩具店铺3',
                    people: '李四'
                }
            ],
            config:{
                disabled:true,
            }
        }
    },
    methods: {
        clearFormData() {},
        save() {},
    },
    created() {}
}
</script>
<style scoped>
>>>.ivu-form-item-content {
    flex-direction: column;
}
</style>
<style lang="less" scoped>
@import  "~@less/form.less";

</style>
