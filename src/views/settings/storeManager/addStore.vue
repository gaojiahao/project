<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-07 16:20:59
-->
<template>
<div class="add_store">
    <Row>
        <Col span="12">
            <div class="top">
                <Divider orientation="left" size="small">店铺信息</Divider>
                <div class="top_tabale">
                    <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                    <Button type="primary" @click="save" style="float: left;">保存</Button>
                                    <Button @click="clearFormData" style="float: left; margin-left:10px" v-if="!formValidate.id">重置</Button>
                                    <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                </div>
            </div>
        </Col>
        <Col span="12">
            <div class="item">
                <div class="top">
                    <Divider orientation="left" size="small">选择系统类目绑定</Divider>
                    <div class="top_tabale">
                        <SystemCategoryBind :loading="loading" @select-system-bind="selectSystemBind" ref="selectSystemBind" :data="systemCategoryData"></SystemCategoryBind>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</div>
</template>

<script>
import {
    Row,
    Col
} from "view-design";
import XForm from "@components/public/form/xForm";
import config from "@views/settings/storeManager/addStoreConfig";
import SystemCategoryBind from "@components/settings/storeManager/systemCategoryBind";
import {
    CreateStore
} from "@service/settingsService"

export default {
    name: "AddStore",
    components: {
        XForm,
        SystemCategoryBind,
        Row,
        Col
    },
    data() {
        return {
            selectPBind: {},
            systemCategoryData:[],
            loading:true
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
                            CreateStore(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    this.$refs.selectSystemBind.clear();
                                    // this.$refs['form'].$refs['formValidate'].resetFields();
                                    // this.$refs['form'].initEL('input');
                                    this.$router.go(-1);
                                } else if (res.result.code == 400) {
                                    this.$Message.error({
                                        background: true,
                                        content: res.result.message
                                    });
                                    this.$FromLoading.hide();
                                }
                            });
                        });
                    } else {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateStore(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                } else if (res.result.code == 400) {
                                    this.$Message.error({
                                        background: true,
                                        content: res.result.message
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
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        goReturn(){
            this.$router.go(-1);
        },
        GetCategoryList(value) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                GetCategoryList({keyword:value,maxResultCount:200}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.systemCategoryData = res.result.item;
                            this.loading = false;
                        });
                    }
                });
            });
        },
        setSystemCategoryFilter(value){
            this.GetCategoryList(value);
        },
        selectSystemBind(data){
            this.formValidate.storeBinds = data;
        }
    },
    created() {
        
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
