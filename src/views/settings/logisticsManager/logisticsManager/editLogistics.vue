<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-17 12:25:20
-->
<template>
<div class="edit_store">
    <div class="top">
        <Divider orientation="left" size="small">物流信息</Divider>
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
    <div class="top">
        <Divider orientation="left" size="small">运费模板列表</Divider>
        <div class="top_tabale">
            <AddTemplateTable :data="templateData" :loadingConfig="loading" :pageData="pageData" @change-page="changePage" @on-page-size-change="onPageSizeChange" :formValidate="formValidate" @set-filter="setFilter"></AddTemplateTable>
        </div> 
    </div>
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/settings/logisticsManager/logisticsManager/editStoreConfig";
import AddTemplateTable from "@components/settings/logisticsManager/addTemplateTable";

import {
    CreateLogistics,
    UpdateLogistics,
    GetLogisticsById,
    GetFreightTemplatePage
} from "@service/settingsService"

export default {
    name: "EditStore",
    components: {
        XForm,
        AddTemplateTable
    },
    data() {
        return {
            id:null,
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
                totalPage:0
            },
            templateData:[],
            loading:true,
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
                            CreateLogistics(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    // this.$refs['form'].$refs['formValidate'].resetFields();
                                    // this.$refs['form'].initEL('input');
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
                    } else {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateLogistics(params).then(res => {
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
        clearFormData() {},
        goReturn(){
            this.$router.push({name:'logisticsList'});
        },
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return GetLogisticsById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            id: res.result.item.id,
                            name: res.result.item.name,
                            code: res.result.item.code,
                        }
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                    }
                }).catch(e =>{console.log(e)});
            }
        },
        GetFreightTemplatePage(){
            var logisticsId = this.$route.query.id;
            if(this.formValidate.id) {
                this.loading = true;
                return GetFreightTemplatePage({logisticsId:logisticsId,...this.pageData}).then(res => {
                    if (res.result.code == 200) {
                        this.templateData = res.result.item.items;
                        this.pageData.totalPage = res.result.item.totalCount;
                        this.loading = false;
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                    }
                }).catch(e =>{console.log(e)});
            }    
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetFreightTemplatePage();
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetFreightTemplatePage();
        },
        saveFreightTemplate(){

        },
        clearFreightTemplate(){
            
        },
        async init(){
            await this.getFormData();
            await this.GetFreightTemplatePage();
        },
        setFilter(value){
            this.pageData.keyword=value;
            this.pageData.skipCount = 1;
            this.GetFreightTemplatePage(); 
        },
    },
    created() {
        this.init();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
