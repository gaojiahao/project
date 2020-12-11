<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-11 14:52:38
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
                <FormItem v-for="(item,index) in data" :key="index" slot="other" style="flex-direction: column;">
                    <div class="top_tabale_header">
                        <div class="item"><Icon type="ios-browsers" />{{item.platform}}</div>
                        <div class="item"><Icon type="ios-basket" />{{item.store}}</div>
                        <div class="item"><Icon type="md-person" />{{item.people}}</div>
                    </div>
                    <div style="margin-bottom:10px;"><Upload type="img"></Upload></div> 
                    <div style="margin-bottom:10px;"><Upload type="music"></Upload></div>
                    <div style="margin-bottom:10px;"><Upload type="vdieo"></Upload></div>
                    <div style="margin-bottom:10px;"><Upload type="threed"></Upload></div>
                </FormItem>
                <template slot="button">
                <FormItem>
                    <div style="width:100%">
                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                        <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                    </div>
                </FormItem>
                </template>
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/charting/chartingManager/productAppointStoreConfig";
const viewForm = ()=>import("@components/public/form/viewForm");
const xForm = ()=>import("@components/public/form/xForm");
const upload = ()=>import("@components/public/upload/upload");

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'UploadProgress',
    components: {
        Tabs,
        TabPane,
        ViewForm:viewForm,
        XForm:xForm,
        Upload:upload
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
            ]
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
.top_tabale_header {
    height: 30px;
    line-height: 30px;
    .item {
        float: left;
        margin-right: 10px;
    }
}
</style>
