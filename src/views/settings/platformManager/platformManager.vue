<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-26 18:08:00
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <PlatformManagerList :list="listData" @select-item="selectItem" @add="add" :loading="listLoading"></PlatformManagerList>
        </div>
        <div class="right">
            <div class="right-top">
                <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form"></XForm>
            </div>
            <div class="right-title">
                类目绑定
            </div>
            <div class="right-bottom">
                <PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind>
                <SystemCategoryBind @select-system-bind="selectSystemBind" ref="selectSystemBind"></SystemCategoryBind>
                <NowCategoryBind></NowCategoryBind>
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
        NowCategoryBind
    },
    data() {
        return {
            listData: [],
            selectPBind: {},
            selectSBind: {},
            listLoading: true,
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
                    addEcommercePlatform(params).then(res => {
                        if (res.status == 200) {
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
        add() {
            // this.$refs['form'].$refs['formValidate'].resetFields();
        },
        clearFormData() {

        },
        selectItem(index) {
            if (!this.$refs['form'].$refs['formValidate'].validate()) {
                this.$refs['form'].$refs['formValidate'].resetFields();
            }
            this.formValidate = this.listData[index];
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

            .right-top {
                margin: 0px 10px;
                background-color: #f5fffa;
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
            }

            .right-title {
                margin: 10px 10px;
                background: linear-gradient(to top, #d2effd, #ffffff);
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                text-align: left;
                padding: 10px 20px;
            }

            .right-bottom {
                transition: all 0.2s ease-in-out;
                display: flex;
                flex-direction: row;
            }
        }
    }
}
</style>
