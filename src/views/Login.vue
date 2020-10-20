<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 16:28:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-20 16:54:47
-->
<template>
<div class="login">
    <div class="container">
        <div class="logo"></div>
        <div class="text">小竹熊ERP</div>
        <Input class="account" prefix="ios-contact" v-model="userCode" placeholder="账户" />
        <Input class="password" prefix="ios-key" v-model="passWord" type="password" password placeholder="密码6-10位" />
        <div class="login"><Button type="primary" @click="login">登录</Button></div>
    </div>
</div>
</template>

<script>
import {
    Button,
    Input,
    Message
} from 'view-design';
import tokenService from '@service/tokenService'

export default {
    name: "Login",
    components: {
        Button,
        Input
    },
    data() {
        var userCode = localStorage.getItem('userCode');

        return {
            userCode: userCode || '',
            passWord: '',
            mobile: '',
            testCode: '',
            show: false,
            isLoginInpFoc: false,
            isLoginInpFocS: false,
            isMobileLogin: false,
            showTestCode: true,
            isDisabled: true,
            theme: '',
            count: 60
        }
    },
    methods: {
        login() {
            console.log('aaa');
            let params = {};
            if (this.isMobileLogin) {
                if (!this.mobile || !this.testCode) {
                    this.$Message.info('请输入有效的手机号或验证码！');
                    return;
                }
                params.userCode = this.mobile;
                params.password = this.testCode;
            } else {
                if (!this.userCode || !this.passWord) {
                    this.$Message.info('请输入用户名或密码');
                    return;
                }
                params.userCode = this.userCode;
                params.password = this.passWord;
            }

        }
    },
    created() {

    }
};
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    color: #464c5b;
    position: absolute;

    .container {
        border: 1px solid #808695;
        border-radius: 10px;
        width: 400px;
        margin: auto;
        height: 300px;
        position: relative;
        top: 30%;

        .text {
            margin-top: 20px;
            color: #464c5b;
            font-size: 2rem;
        }

        .account {
            margin-top: 20px;
            width: 200px
        }

        .password {
            margin-top: 20px;
            width: 200px
        }

        .login {
            margin-top: 20px;
            width: 200px;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            line-height: normal;

            .ivu-btn-primary {
                width: 200px;
            }
        }
    }
}
</style>
