<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-27 20:23:46
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <PlatformManagerList :list="listData" @select-item="selectItem" :loading="listLoading" @show-add="showAdd"></PlatformManagerList>
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
                                        <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                    </div>
                                </FormItem>
                            </template>
                        </XForm>
                    </div>
                </div>
            </div>
            <div class="item"  v-show="isShowBind">
                <div class="top">
                    <Divider orientation="left" size="small">类目绑定</Divider>
                    <div class="" style="display:flex">
                        <PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind>
                        <SystemCategoryBind @select-system-bind="selectSystemBind" ref="selectSystemBind"></SystemCategoryBind>
                        <NowCategoryBind></NowCategoryBind>
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
    Card,
    Divider,
    FormItem
} from "view-design";
import PlatformManagerList from "@components/settings/platformManager/list";
import SystemCategoryBind from "@components/settings/platformManager/systemCategoryBind";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import CategoryBind from "@components/settings/platformManager/categoryBind";
import config from "@views/settings/platformManager/platformManagerConfig";
import XForm from "@components/public/form/xForm";
import {
    addEcommercePlatform,
    getEcommercePlatformList
} from "@service/basicinfoService"

export default {
    name: "platformManager",
    mixins: [config],
    components: {
        Card,
        PlatformManagerList,
        CategoryBind,
        XForm,
        SystemCategoryBind,
        PlatformCategoryBind,
        NowCategoryBind,
        Divider,
        FormItem,
    },
    data() {
        return {
            listData: [],
            selectPBind: {},
            selectSBind: {},
            listLoading: true,
            isShowAdd: false,
            isShowBind:false
        }
    },
    computed: {
        title:function () {
            return this.formValidate.id ? '编辑平台':'新增平台';
        }
    },
    methods: {
        getEcommercePlatformList() {
            return new Promise((resolve, reject) => {
                getEcommercePlatformList().then(res => {
                    this.$nextTick(() => {
                        this.listData = res.data.items;
                        this.listLoading = false;
                    });
                });
            });
        },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    addEcommercePlatform(params).then(res => {
                        if (res.status == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：成功');
                            this.getEcommercePlatformList();
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                        } else if (res.status == 403) {
                            this.$Message.error({
                                background: true,
                                content: res.message
                            });
                        }
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$Message.info('更新成功');
                });
            }
        },
        showAdd() {
            this.isShowAdd = this.isShowAdd ? false:true;
        },
        clearFormData() {
            this.showAdd();
        },
        selectItem(index) {
            // if (!this.$refs['form'].$refs['formValidate'].validate()) {
            //     this.$refs['form'].$refs['formValidate'].resetFields();
            // }
            // this.formValidate = this.listData[index];
            this.isShowBind = true;
        },
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        //选择系统类目后的处理
        selectSystemBind(data) {
            this.selectSBind = data;
            if (this.selectPBind && this.selectSBind) {
                this.$Message.info('温馨提示：绑定成功');
                setTimeout(() => {
                    this.$refs.selectPlatformBind.removeSelect();
                    this.$refs.selectSystemBind.removeSelect();
                }, 1000);
            }
        }
    },
    created() {
        this.getEcommercePlatformList();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/basicinfo/platformManager/index";
.platformManager-container {
    .platformManager-container-panel {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
        .left {
            width: 350px;
            background-color: #f5fffa;
            height: 750px;
            border: 1px solid #dcdee2;
            border-color: #e8eaec;
            transition: all 0.2s ease-in-out;
        }
        .right {
            flex: 1;
            .top {
                flex: 1;
                transition: all 0.2s ease-in-out;
                margin: 0 0 10px 10px;
                .top_tabale{
                    background-color: #f5fffa;
                    border: 1px solid #dcdee2;
                    border-color: #e8eaec;    
                }
                .top_tabale_white{
                    border: 1px solid #dcdee2;
                    border-top:0;
                    border-color: #e8eaec;    
                }
            }
            .right-bottom {
                transition: all 0.2s ease-in-out;
                display: flex;
                flex-direction: row;
            }
        }
    }
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-center, 
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-left, 
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-right
    {
        margin: 8px 0 0 0;
        font-weight: 600;
        color: #515a6e;
    }
}
</style>
