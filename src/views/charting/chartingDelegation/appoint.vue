<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-10 09:42:14
-->
<template>
<div>
    <div class="top-title">
        基本信息
    </div>
    <div class="top">
        <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
            <template slot="button">
                <div style="width:100%">
                    
                </div>
            </template>
        </ViewForm>
        <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
            <div class="ivu-form-item">
                <label class="ivu-form-item-label" style="width: 120px;">选品人员:</label> 
                <div class="ivu-form-item-content" style="margin-left: 120px;">
                    <Table :columns="selectionPeopleColumns" :data="selectionPeopleData" :width="450">

                    </Table>
                    <span style="margin-left: 10px;"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="top-title">
        人员分配
    </div>
    <div class="top">
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
            selectionPeopleColumns: [
                {
                    title: '平台',
                    key: 'title'
                },
                {
                    title: '店铺名称',
                    key: 'name'
                },
                {
                    title: '销售人员',
                    key: 'people'
                },
                {
                    title: '需求文件',
                    key: 'file'
                }
            ],
            selectionPeopleData: [
                {
                    name: '玩具店铺1',
                    title: "速卖通",
                    people: '李四',
                    file: '图片，视频'
                },
                {
                    name: '玩具店铺2',
                    title: "速卖通",
                    people: '李四',
                    file: '图片，视频'
                },
                {
                    name: '玩具店铺3',
                    title: "亚马逊",
                    people: '李四',
                    file: '图片，视频，3d'
                },
            ],
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
>>>.ivu-tabs-bar {
    margin-bottom: 0;
}
>>>.ivu-table td {
    height: 38px;
}
</style><style lang="less" scoped>
.top {
    flex: 1;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
}

.top-title {
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 5px;
}

.bottom {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
}
</style>
