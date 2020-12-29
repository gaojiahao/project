<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-28 20:49:48
-->
<template>
<div class="brandManager-container">
    <div class="brandManager-container-panel">
        <div class="left">
            <BrandManagerList :list="listData" @select-item="selectItem" @show-add="showAdd" :loading="listLoading" @del="sureDeleteConfirm" @set-filter="setFilter"></BrandManagerList>
        </div>
        <div class="right">
            <div class="item" v-show="isShowAdd">
                <div class="top">
                    <Divider orientation="left" size="small">{{title}}</Divider>
                    <div class="top_tabale">
                        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                            <template slot="button">
                                <FormItem>
                                    <div style="width:100%">
                                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                                        <Button @click="clearFormData" style="float: left; margin-left:10px" v-if="!formValidate.id">取消</Button>
                                    </div>
                                </FormItem>
                            </template>
                        </XForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Tree,
    Card
} from "view-design";
import BrandManagerList from "@components/settings/brandManager/brandManagerList";
import config from "@views/settings/brandManager/brandManagerConfig";
import XForm from "@components/public/form/xForm";
import {
    CreateBrand,
    GetBrandList,
    UpdateBrand,
    DelBrand,
    GetBrandById
} from "@service/settingsService"

export default {
    name: "BrandManager",
    mixins: [config],
    components: {
        Card,
        BrandManagerList,
        XForm,
    },
    data() {
        return {
            listData: [],
            selectPBind: {},
            selectSBind: {},
            isShowAdd: true,
            listLoading: true,
            pageData:{
                skipCount: 1,
                skipTotal: 100,
                maxResultCount: 200,
                keyword:''
            }
        }
    },
    computed:{
        title(){
            if(this.formValidate.id){
                return '编辑';
            } else {
                return '新建';
            }
        }    
    },
    methods: {
        GetBrandList() {
            return new Promise((resolve, reject) => {
                GetBrandList({keyword:this.pageData.keyword,maxResultCount:this.pageData.maxResultCount}).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.listData = res.result.item;
                            this.listLoading = false;
                        });
                    }
                });
            });
        },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateBrand(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
                            this.GetBrandList();
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
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
                    UpdateBrand(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：更新成功！');
                            this.GetBrandList();
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
        },
        showAdd() {
            this.title = '新建';
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.$refs['form'].initEL('input');
        },
        clearFormData() {
            this.formValidate.id = '';
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        selectItem(id) {
            this.clearFormData();
            return new Promise((resolve, reject) => {
                GetBrandById({id:id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            name: res.result.item.name,
                            code: res.result.item.code,
                            platformId: res.result.item.platformId,
                            merchantId: res.result.item.merchantId,
                            parentIndex: res.result.item.parentIndex,
                            id: res.result.item.id,
                        }
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.message
                        });
                    }
                });
            });
        },
        sureDeleteConfirm (id,flag) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    flag ? this.deletesData() : this.deleteData(id);
                },
            });
        },
        deleteData(id){
            if (id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    DelBrand({id:id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetBrandList();
                            this.clearFormData();
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
        },
        setFilter(value){
            this.pageData.keyword = value;
            this.GetBrandList(); 
        }
    },
    created() {
        this.GetBrandList();     
    }
}
</script>
<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
</style>
