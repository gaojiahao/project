<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 19:54:19
-->
<template>
<div class="edit_store">
    <div class="top">
        <Divider orientation="left" size="small">店铺信息</Divider>
        <div class="top_tabale">
            <Row>
                <Col span="12">
                    <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form" style="height:550px">
                        <template slot="button">
                            <FormItem>
                                <div style="width:100%">
                                </div>
                            </FormItem>
                        </template>
                    </XForm>
                    <div style="margin:10px 10px 20px 130px;float:left">
                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                        <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                    </div>
                </Col>
                <Col span="12">
                    <span class="ivu-form-item-label"></span>选择系统类目绑定<span style="color:red;margin-left:10px" v-show="systemBindFlag">请选择系统类目绑定</span>
                    <div class="" style="border-left: 1px solid #dcdee2;">
                        <SystemCategoryBind type="edit" :loading="loading" @select-system-bind="selectSystemBind" @set-filter="setSystemCategoryFilter" ref="selectSystemBind" :data="systemCategoryData" :formData="formValidate"></SystemCategoryBind>
                    </div>   
                </Col>
            </Row>
        </div>
    </div>
    <!-- <div class="item">
        <div class="top">
            <Divider orientation="left" size="small">选择系统类目</Divider>
            <div class="top_tabale">
                <SystemCategoryBind type="edit" :loading="loading" @select-system-bind="selectSystemBind" @set-filter="setSystemCategoryFilter" ref="selectSystemBind" :data="systemCategoryData" :formData="formValidate.storeBinds"></SystemCategoryBind>
            </div>
        </div>
    </div> -->
</div>
</template>

<script>
import {
    Row,
    Col
} from "view-design";
import XForm from "@components/public/form/xForm";
import config from "@views/settings/storeManager/editStoreConfig";
import SystemCategoryBind from "@components/settings/storeManager/systemCategoryBind";
import NowCategoryBind from "@components/settings/platformManager/nowCategoryBind";
import {
    CreateStore,
    UpdateStore,
    GetStoreById,
    GetCategoryList
} from "@service/settingsService"

export default {
    name: "EditStore",
    components: {
        XForm,
        SystemCategoryBind,
        Row,
        Col
    },
    data() {
        return {
            selectPBind: {},
            id:null,
            loading:true,
            systemCategoryData:[],
            systemBindFlag:false,
        }
    },
    mixins: [config],
    methods: {
        save() {
            var params = this.formValidate;
            var cData = this.$refs.selectSystemBind.$refs&&this.$refs.selectSystemBind.$refs.tree&&this.$refs.selectSystemBind.$refs.tree.getCheckedAndIndeterminateNodes()||[];
            var cSelectData = [];
            for(var i=0;i<cData.length;i++){
                var arr = {
                    categoryId:cData[i]['categoryId'],
                    categoryName:cData[i]['categoryName'],
                };
                cSelectData.push(arr);
            }
            params.storeBinds = cSelectData;

            var storeUsers = [];
            for(var i=0;i<params['storeUsers'].length;i++){
                var obj = {
                    storeName:params['name'],
                    storeId:params['id'],
                    userName:params['storeUsers'][i]['name'],
                    userId:params['storeUsers'][i]['id'],
                    name:params['storeUsers'][i]['name'],
                    value:params['storeUsers'][i]['id'],
                    id:params['storeUsers'][i]['id'],
                }
                if(params['storeUsers'][i]['id']==params['chargeId']){
                    obj['isPrincipal'] = true;
                } else {
                    obj['isPrincipal'] = false;    
                }
                storeUsers.push(obj);
            };
            params['storeUsers'] = storeUsers;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if(!params['storeBinds'].length){
                        this.$Message.error('保存失败');
                        this.systemBindFlag = true;
                        return false;    
                    } else {
                        this.systemBindFlag = false;
                    }
                    if (!this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateStore(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：新建成功！');
                                    // this.$refs['form'].$refs['formValidate'].resetFields();
                                    // this.$refs['form'].initEL('input');
                                    this.$router.go(-1);
                                } else if (res.result.code == 400) {
                                    this.$Message.error({
                                        background: true,
                                        content: res.result.msg
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
                                    this.$router.go(-1);
                                } else if (res.result.code == 400) {
                                    this.$Message.error({
                                        background: true,
                                        content: res.result.msg
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
        clearFormData() {},
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        goReturn(){
            this.$router.go(-1);
        },
        setSystemCategoryFilter(value){
            this.GetCategoryList(value);
        },
        selectSystemBind(data){
            this.formValidate.storeBinds = data;
        },
        getFormData(){
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
                                storeUsers: res.result.item.storeUsers,
                                chargeId: res.result.item.chargeId,
                                status: res.result.item.status,
                                remark: res.result.item.remark,
                                storeBinds: res.result.item.storeBinds,
                                createdBy: res.result.item.createdBy,
                                createdOn: res.result.item.createdOn,
                            }
                            var data = [];
                            for(var i=0;i<res.result.item.storeUsers.length;i++){
                                if(res.result.item.storeUsers[i]['isPrincipal']){
                                    this.formValidate['chargeId'] = res.result.item.storeUsers[i]['userId'];
                                }
                                var obj = {
                                    userName:res.result.item.storeUsers[i]['userName'],
                                    name:res.result.item.storeUsers[i]['userName'],
                                    id:res.result.item.storeUsers[i]['userId'],
                                }
                                data.push(obj);
                            }
                            this.formValidate['storeUsers'] = data;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
    },
    created() {
        this.getFormData();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
.ivu-form-item-label:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 14px;
    color: #ed4014;
}
</style>
