<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 11:05:46
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">历史记录</Divider>
        <div class="top_tabale">
            <div class="myTable">
                <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="top" v-if="isForm">
        <Divider orientation="left" size="small">上传记录</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" @save="save" @clear-form-data="clearFormData" ref="form" v-if="isForm">
                <div slot="other">
                    <MultUpload v-model="formValidate2['data']" :config="config"></MultUpload> 
                </div>
                <template slot="button">
                    <div style="line-height:32px height:32px; display:flex">    
                    </div>
                </template>
            </XForm>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">返工意见</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate3" :ruleValidate="ruleValidate3" :formConfig="formConfig3">
                <template slot="button">
                    <div style="line-height:32px height:32px; display:flex">    
                    </div>
                </template>    
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/charting/chartingManager/viewProductAppointStoreConfig";
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import MultUpload from "@components/charting/multUpload";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'AppointHistoryPanel',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
        MultUpload
    },
    mixins: [config],
    data(){
        return{
            dataConfig:[
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
            columns: [
                {
                    title: '平台名称',
                    key: 'platform',
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.platform);//  展示的内容
                    }
                },
                {
                    title: '店铺',
                    key: 'store',
                },
                {
                    title: '制作类型',
                    key: 'type',
                },
                {
                    title: '制作人',
                    key: 'people',
                },
            ],
            data: [
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: 'psd',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: '视频',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: '3d建模',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: 'psd',
                    people:"李四",
                },
                {
                    id:'fds',
                    platform: '速卖通',
                    store: "玩具店铺1",
                    type: 'psd',
                    people:"李四",
                },
            ],
            config:{
                disabled:true,
            },
            loading: true,
            isForm: false
        }
    },
    methods: {
        clearFormData() {
            this.formValidate2 = {
                id:"",
                data:[],
            }
        },
        save() {
            this.$Message.info({content:'温馨提示：保存成功'});
            this.clearFormData();
            this.showForm(false);    
        },
        cancel(){
            this.clearFormData();
            this.showForm(false);     
        },
        changePage() {},
        onCurrentChange(currentRow,oldCurrentRow){
            this.formValidate2['id'] = currentRow.id; 
            this.showForm(true);    
        },
        showForm(flag){
            this.isForm = flag;
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>
<style scoped>
>>>.ivu-form-item-content {
    flex-direction: column;
}
</style>
<style lang="less" scoped>
@import  "~@less/form.less";
.myTable{
    padding:10px;
}
</style>
