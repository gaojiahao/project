<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:17:18
-->
<template>
<div class="propertyManager-container">
    <div class="propertyManager-container-panel">
        <div class="left">
            <PropertyManagerList :list="list" @select-item="selectItem"></PropertyManagerList>
        </div>
        <div class="right">
            <div class="right-top">
                <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form"></XForm>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PropertyManagerList from "@components/settings/propertyManager/propertyManagerList";
import config from "@views/settings/propertyManager/propertyManagerConfig.js";
import XForm from "@components/public/form/xForm";
import {
    addEcommercePlatform,
    getEcommercePlatformList
} from "@service/basicinfoService"

export default {
    name: "PropertyManager",
    mixins: [config],
    components: {
        PropertyManagerList,
        XForm,
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
                    this.$Message.info('温馨提示：成功');
                    this.$refs['form'].$refs['formValidate'].resetFields();
                    this.$refs['form'].initEL('input');
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
.propertyManager-container {
    .propertyManager-container-panel {
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
                max-height: 300px;
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
