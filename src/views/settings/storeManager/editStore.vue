<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-25 11:55:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-25 15:39:23
-->
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-24 20:43:53
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
import XForm from "@components/public/form/xForm";
import config from "@views/settings/storeManager/addStoreConfig";
import PlatformCategoryBind from "@components/settings/platformManager/platformCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import {
    GetStorePage,
    CreateStore,
    UpdateStore,
    GetStoreById
} from "@service/basicinfoService"

export default {
    name: "EditStore",
    components: {
        XForm,
        PlatformCategoryBind,
        NowCategoryBind,
    },
    data() {
        return {
            selectPBind: {},
            id:null
        }
    },
    mixins: [config],
    methods: {
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateStore(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
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
        },
        clearFormData() {},
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
    },
    created() {
        this.id = this.$route.query.id;
        if(this.id) {
            return new Promise((resolve, reject) => {
                GetStoreById({id:this.id}).then(res => {
                    if (res.result.code == 200) {
                        this.$FromLoading.hide();
                        this.formValidate = {
                            id: res.result.item.id,
                            name: res.result.item.name,
                            code: res.result.item.code,
                            account: res.result.item.account,
                            login_Id: res.result.item.login_Id,
                            app_Key: res.result.item.app_Key,
                            app_Secret: res.result.item.app_Secret,
                            platformId: res.result.item.platformId,
                            platformName: res.result.item.platformName,
                            remark: res.result.item.remark,
                        }
                    } else if (res.result.code == 400) {
                        this.$Message.error({
                            background: true,
                            content: res.result.message
                        });
                    }
                });
            });    
        }
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
