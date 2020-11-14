<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:20:48
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <TypeManagerList :list="list" @select-item="selectItem"></TypeManagerList>
        </div>
        <div class="right">
            <div class="right-top">
                <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form"></XForm>
            </div>
            <div class="right-bottom">
                <TypeManagerTab></TypeManagerTab>
            </div>
        </div>
    </div>
</div>
</template>

<script>
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
        TypeManagerTab
    },
    data() {
        return {
            list: [],
            selectPBind: {},
            selectSBind: {},
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
        clearFormData() {

        },
        selectItem(index) {
            console.log(index)
            //this.$refs['form'].$refs['formValidate'].resetFields();
            this.formValidate = this.list[index];
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
            margin: 10px 10px;
            width: 350px;
            background-color: #f5fffa;
            height: 750px;
            border: 1px solid #dcdee2;
            border-color: #e8eaec;
            transition: all 0.2s ease-in-out;
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;

            .right-top {
                flex: 1;
                margin: 10px 10px;
                background-color: #f5fffa;
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
            }

            .right-bottom {
                flex: 1;
                margin: 10px 10px;
                transition: all 0.2s ease-in-out;
            }
        }
    }
}
</style>
