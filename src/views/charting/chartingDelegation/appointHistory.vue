<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-14 19:10:17
-->
<template>
<div>
    <div class="">
        <Button @click="showPanel(true)" size="small" slot="extra" type="warning" style="float:right">历史记录</Button>
    </div>
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
    <SiderPanel :show="show" @show-panel="showPanel">
        <div slot="info">
            <AppointHistoryPanel></AppointHistoryPanel>        
        </div>
    </SiderPanel>
</div>
</template>

<script>
import config from "@views/charting/chartingDelegation/productAppointStoreConfig";
import configHistory from "@views/charting/chartingManager/viewProductAppointStoreConfig";
const viewForm = ()=>import("@components/public/form/viewForm");
const xForm = ()=>import("@components/public/form/xForm");
const siderPanel = ()=>import("@components/charting/siderPanel");
const appointHistoryPanel = ()=>import("@components/charting/appointHistoryPanel");

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'AppointHistory',
    components: {
        Tabs,
        TabPane,
        ViewForm:viewForm,
        XForm:xForm,
        SiderPanel:siderPanel,
        AppointHistoryPanel:appointHistoryPanel 
    },
    mixins: [config,configHistory],
    data(){
        return{
            show:false,
        }
    },
    methods: {
        clearFormData() {},
        save() {},
        showPanel(flag){
            this.show = flag;
        }
    },
    created(){ }
}
</script>

<style lang="less" scoped>
@import  "~@less/form.less";
</style>
