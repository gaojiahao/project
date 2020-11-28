<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-28 09:47:38
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <TypeManagerList :list="list" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" ></TypeManagerList>
        </div>
        <div class="right">
            <div class="item" v-show="isShowAdd">
                <div class="top">
                    <Divider orientation="left" size="small">新建分类</Divider>
                    <div class="top_tabale">
                        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form"></XForm>
                    </div>
                </div>
            </div>
            <div class="item"  v-show="isShowBind">
                <div class="top">
                    <Divider orientation="left" size="small">分类属性</Divider>
                    <TypeManagerTab></TypeManagerTab>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Divider
} from "view-design";
import TypeManagerList from "@components/settings/typeManager/typeManagerList";
import TypeManagerTab from "@components/settings/typeManager/typeManagerTab";
import config from "@views/settings/typeManager/typeManagerConfig";
import XForm from "@components/public/form/xForm";
import {
    addEcommercePlatform,
    getEcommercePlatformList
} from "@service/basicinfoService"

export default {
    name: "TypeManager",
    mixins: [config],
    components: {
        TypeManagerList,
        XForm,
        TypeManagerTab,
        Divider
    },
    data() {
        return {
            list: [],
            selectPBind: {},
            selectSBind: {},
            isShowAdd: false,
            isShowBind:false,
            listLoading: true,
        }
    },
    watch: {
        list: {
            handler(val) {
                console.log(val)
            }
        }
    },
    methods: {
        getEcommercePlatformList() {
            return new Promise((resolve, reject) => {
                getEcommercePlatformList().then(res => {
                    this.$nextTick(() => {
                        this.list = res.data.items;
                    });
                });
            });
        },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                this.$FromLoading.show();
                return new Promise((resolve, reject) => {
                    addEcommercePlatform(params).then(res => {
                        if (res.status == 200) {
                            setTimeout(() => {
                                this.$FromLoading.hide();
                            }, 500);
                            this.$Message.info('温馨提示：成功');
                            this.getEcommercePlatformList();
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                        } else if (res.status == 403) {
                            setTimeout(() => {
                                this.$FromLoading.hide();
                            }, 500);
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
        clearFormData() {

        },
        selectItem(index) {
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
        },
        showAdd() {
            this.isShowAdd = this.isShowAdd ? false:true;
        },
        clearFormData() {
            this.showAdd();
        },
    },
    created() {
        this.getEcommercePlatformList();
        setTimeout(() => {
            this.listLoading = false;
        }, 500);
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
                flex: 1;
                margin: 10px 10px;
                transition: all 0.2s ease-in-out;
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
