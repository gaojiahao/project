<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-09 10:35:08
-->
<template>
<div>
    <div class="top">
        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form"></XForm>
    </div>
    <div class="bottom-title">
        选择运营类目
    </div>
    <div class="bottom">
        <PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind>
        <NowCategoryBind></NowCategoryBind>
    </div>
</div>
</template>

<script>
import XForm from "@components/public/form/xForm";
import config from "@views/basicinfo/storeManager/addStoreConfig";
import PlatformCategoryBind from "@components/basicinfo/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/basicinfo/platformManager/nowCategoryBind";

export default {
    name: "AddStore",
    components: {
        XForm,
        PlatformCategoryBind,
        NowCategoryBind
    },
    data() {
        return {
            selectPBind: {},
        }
    },
    mixins: [config],
    methods: {
        save() {},
        clearFormData() {},
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
    },
    created() {

    }
}
</script>

<style lang="less" scoped>
.top {
    flex: 1;
    margin: 10px 10px;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
}

.bottom-title {
    margin: 10px 10px;
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 10px 20px;
}

.bottom {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
}
</style>
