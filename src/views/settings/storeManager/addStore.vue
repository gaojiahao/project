<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-28 10:09:11
-->
<template>
<div class="add_store">

    <div class="top">
        <div class="top_tabale">
            <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form"></XForm>
        </div>
    </div>
    <div class="item">
        <div class="top">
            <Divider orientation="left" size="small">选择运营类目</Divider>
            <div class="" style="display:flex">
                <PlatformCategoryBind @select-platform-bind="selectPlatformBind" ref="selectPlatformBind"></PlatformCategoryBind>
                <NowCategoryBind></NowCategoryBind>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Divider
} from "view-design";
import XForm from "@components/public/form/xForm";
import config from "@views/settings/storeManager/addStoreConfig";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";

export default {
    name: "AddStore",
    components: {
        XForm,
        PlatformCategoryBind,
        NowCategoryBind,
        Divider
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
    transition: all 0.2s ease-in-out;
    margin: 0 0 10px 10px;
    .top_tabale{
        background-color: #f5fffa;
        border: 1px solid #dcdee2;
        border-color: #e8eaec;    
    }
}

.top-title {
    margin: 10px 10px;
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 10px 20px;
}
</style>
