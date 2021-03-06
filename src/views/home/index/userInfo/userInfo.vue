<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-23 11:29:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-06 16:08:03
-->
<template>
    <div class="userInfo">
        <Row :gutter="16">
            <Col span="12">
                <Card>
                    <div>
                        <div>
                            基本资料
                            <Button type="primary" @click="showPwd(true)" style="float: right; margin-right:10px">修改密码</Button>
                            <Button type="primary" @click="showPop(true)" style="float: right; margin-right:10px">修改档案</Button>
                        </div>
                    </div>
                    <div class="top">
                        <Divider orientation="left" size="small"></Divider>
                        <div class="top_tabale">
                            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="viewform">
                                <template slot="button">
                                    <FormItem>
                                        <div style="width:100%">
                                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>
                                        </div>
                                    </FormItem>
                                </template>
                            </ViewForm>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col span="12">
                <Card style="height:729px">
                    <div>
                        <div>个人贡献</div>
                    </div>
                    <div class="top">
                        <Divider orientation="left" size="small"></Divider>
                        <div class="top_tabale">
                            <Row :gutter="16">
                                <Col span="8">
                                    <div class="userinfo_item">
                                        <div class="title">创建的待办数</div>
                                        <div class="text">5</div>
                                    </div>
                                </Col>
                                <Col span="8">
                                    <div class="userinfo_item">
                                        <div class="title">创建的需求数</div>
                                        <div class="text">5</div>
                                    </div>
                                </Col>
                                <Col span="8">
                                    <div class="userinfo_item">
                                        <div class="title">完成的任务数</div>
                                        <div class="text">5</div>
                                    </div>
                                </Col>
                                <Col span="8">
                                    <div class="userinfo_item">
                                        <div class="title">解决的Bug数</div>
                                        <div class="text">5</div>
                                    </div>
                                </Col>
                                <Col span="8">
                                    <div class="userinfo_item">
                                        <div class="title">创建的用例</div>
                                        <div class="text">5</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        <ModalForm :titleText="title" :formValidate="formValidate2" :ruleValidate="ruleValidate2" :showModel='showModel' :formConfig="formConfig2" @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
        <ModalForm :titleText="titlePwd" :formValidate="formValidate3" :ruleValidate="ruleValidate3" :showModel='showModelPwd' :formConfig="formConfig3" @save="savePwd" @show-pop="showPwd" @clear-form-data="clearFormDataPwd" ref="form2"></ModalForm>
    </div>
</template>
<script>
import {
    Row,
    Col
} from "view-design";
import {
    GetUserInfoById,
    UpdateUserInfo,
    UpdatePassword
} from "@service/settingsService";
import ViewForm from "@components/public/form/viewForm";
import ModalForm from "@components/public/form/modalForm";
import config from "@views/home/index/userInfo/userInfoConfig";
import config2 from "@views/home/index/userInfo/editUserInfoConfig";
import config3 from "@views/home/index/userInfo/pwdUserInfoConfig";

export default {
    name: 'UserInfo',
    data() {
        return {
            showModel: false,
            title: '编辑',
            userInfo:{},
            showModelPwd:false,
            titlePwd:'修改密码'
        }
    },
    components: {
        ViewForm,
        ModalForm,
        Row,
        Col
    },
    mixins: [config,config2,config3],
    methods:{
        showPop(flag, row) {
            this.showModel = flag;
            this.formValidate2 = {...this.formValidate};
        },
        save() {
            var params = this.formValidate2;
            this.$refs['form'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.formValidate.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdateUserInfo(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.getFomrData();
                                    this.showModel = false;
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
                }

            })
        },
        clearFormData(){
            
        },
        cancel(){
            
        },
        getFomrData(){
             this.userInfo = JSON.parse(window.localStorage.getItem('XZX_LOGIN_TOKEN'))['userInfo'];
            if(this.userInfo.id) {
                return new Promise((resolve, reject) => {
                    GetUserInfoById({id:this.userInfo.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                userName: res.result.item.userName,
                                roleId: res.result.item.roleId,
                                merchantCode: res.result.item.merchantCode,
                                nickName:res.result.item.nickName,
                                email:res.result.item.email,
                                phoneNumber:res.result.item.phoneNumber,
                                birthday:res.result.item.birthday,
                                sex:res.result.item.sex,
                                password:res.result.item.password,
                                enabled:res.result.item.enabled,
                                remark:res.result.item.remark,
                                userRoleId:res.result.item.userRoleId,
                            };
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
        goReturn(){
            this.$router.go(-1);
        },
        showPwd(flag){
            this.showModelPwd = flag;
        },
        savePwd(){
            this.formValidate3.id = this.formValidate.id;
            var params = this.formValidate3;
            this.$refs['form2'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (this.formValidate3.id) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            UpdatePassword(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：更新成功！');
                                    this.showModelPwd = false;
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
                }
            })    
        },
        clearFormDataPwd(){
            this.formValidate3['original'] = '';
            this.formValidate3['newPwd'] = '';
        }
    },
    created() {
        this.getFomrData();
    }
}
</script>
<style lang="less" scoped>
.userInfo{
    margin: 15px;
    .userinfo_item{
        margin-left: 5px;
        .title{
            color: #808695;
        }
        .text{
            font-size: 24px;
        }
    }
}
</style>