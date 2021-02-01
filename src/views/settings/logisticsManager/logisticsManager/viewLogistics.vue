<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 14:33:37
-->
<template>
<div class="edit_store">
    <div class="top">
        <Divider orientation="left" size="small">物流信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                        </div>
                    </FormItem>
                </template>
            </ViewForm>
        </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">运费模板列表</Divider>
        <div class="top_tabale">
            <AddTemplateTable :data="templateData" :loadingConfig="loading" :pageData="pageData" @change-page="changePage" @on-page-size-change="onPageSizeChange" :formValidate="formValidate" @set-filter="setFilter" :disabled="true"></AddTemplateTable>
        </div> 
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
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
        ViewForm,
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
                                    this.$router.go(-1);
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
                                    this.$router.go(-1);
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
            this.$router.go(-1);
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
                return GetFreightTemplatePage({id:logisticsId,...this.pageData}).then(res => {
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
