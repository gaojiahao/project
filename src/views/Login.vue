d<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 16:28:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-02 12:00:31
-->
<template>
<div class="login" ref="login">
    <div class="container">
        <div class="logo"></div>
        <div class="text">跨境电商ERP</div>
        <div class="type" v-model="type"><span :class="[type=='login' ? 'active':'']" @click="changeType('login')">登录
            </span>|<span :class="[type!='login'?'active':'']" @click="changeType('register')">注册</span></div>
        <Input class="account" prefix="ios-mail" v-model="phoneNumber" placeholder="邮箱" @keyup.enter.native="nextFocus($event,0)" v-show="type=='register'" icon="ios-send" @click.native="send" />
        <Input class="account" v-model="phoneVerificationCode" placeholder="邮箱验证码" @keyup.enter.native="nextFocus($event,1)" v-show="type=='register'" />
        <Input class="account" prefix="ios-contact" v-model="userCode" placeholder="账户" @keyup.enter.native="nextFocus($event,1)" />
        <Input class="password" prefix="ios-key" v-model="passWord" type="password" password placeholder="密码6-10位" @keyup.enter.native="nextFocus($event,2)" />
        <div style="width: 100%;display: flex; margin-top: 20px;" v-show="type=='login'">
            <Input v-model="code" placeholder="验证码" style="width: 80px;margin-left: 100px;float: left;" @keyup.enter.native="submitForm('ruleForm')" />
            <s-identify :identifyCode="identifyCode" @click.native="refreshCode"></s-identify>
        </div>
        <div class="login" v-show="type=='login'">
            <Button type="primary" @click="login" @keyup.enter="login">登录</Button>
        </div>
        <div class="login" v-show="type=='register'">
            <Button type="primary" @click="register" @keyup.enter="register">注册</Button>
        </div>
    </div>
</div>
</template>

<script>
import {
    Button,
    Input,
    Message
} from "view-design";
import SIdentify from '@components/public/sIdentify/sIdentify'
import tokenService from "@service/tokenService";

export default {
    name: "Login",
    components: {
        Button,
        Input,
        SIdentify
    },
    data() {
        var userCode = localStorage.getItem("userCode");

        return {
            mail: "",
            userCode: userCode || "",
            passWord: "",
            mobile: "",
            testCode: "",
            show: false,
            isLoginInpFoc: false,
            isLoginInpFocS: false,
            isMobileLogin: false,
            showTestCode: true,
            isDisabled: true,
            theme: "",
            count: 60,
            controls: "",
            type: "login",
            code: "",
            identifyCode: "",
            phoneNumber: "",
            phoneVerificationCode: ""
        };
    },
    inject: ['reload'],
    methods: {
        /**
         * @name: gaojiahao
         * @test: 登录
         * @msg:
         * @param {*}
         * @return {*}
         */
        login() {
            let params = {};
            if (this.isMobileLogin) {
                if (!this.mobile || !this.testCode) {
                    this.$Message.error("请输入有效的手机号或验证码！");
                    return;
                }
                params.userCode = this.mobile;
                params.password = this.testCode;
            } else {
                debugger
                if (!this.userCode || !this.passWord) {
                    this.$Message.error("请输入用户名或密码");
                    return;
                }
                if (this.code == '') {
                    if (this.code != this.identifyCode) {
                        this.$Message.error("验证码出错");
                        return;
                    }
                    this.$Message.error("验证码不能为空");
                    return;
                }
                params.username = this.userCode;
                params.password = this.passWord;
            }
            this.$loading.show();
            tokenService
                .pcLogin(params)
                .then(data => {
                    var token = tokenService.getToken(true);
                    this.loginIn = true;
                    localStorage.setItem("userCode", this.userCode);
                    this.$loading.hide();
                    this.$router.replace("/index");
                    this.reload();
                })
                .catch(err => {
                    this.$loading.hide();
                    this.$Message["error"]({
                        background: true,
                        content: '温馨提示：' + err.message
                    });
                    this.refreshCode();
                    this.initEL('input');
                });
        },
        register() {
            let params = {};
            if (!this.phoneNumber) {
                this.$Message.error("请输入邮箱");
                return;
            }
            if (!this.phoneVerificationCode) {
                this.$Message.error("请输入邮箱验证码");
                return;
            }
            if (!this.userCode || !this.passWord) {
                this.$Message.error("请输入用户名或密码");
                return;
            }
            params.phoneNumber = this.phoneNumber;
            params.phoneVerificationCode = this.phoneVerificationCode;
            params.username = this.userCode;
            params.password = this.passWord;
            this.$loading.show();
            tokenService
                .register(params)
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    this.$loading.hide();
                    this.$Message["error"]({
                        background: true,
                        content: '温馨提示：' + err.message
                    });
                    this.refreshCode();
                    this.initEL('input');
                });
        },
        generatedCode() {
            const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ]
            let code = ''
            for (let i = 0; i < 4; i++) {
                let index = Math.floor(Math.random() * 36)
                code += random[index]
            }
            return code
        },
        changeType(type) {
            this.type = type;
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        makeCode(o, l) {
            this.identifyCode = this.generatedCode();
        },
        //下一个输入框事件
        nextFocus(el, index) {
            var dom = document.getElementsByTagName('input'),
                currInput = dom[index],
                nextInput = dom[index + 1],
                lastInput = dom[index - 1];
            if (el.keyCode != 8) {
                if (index < (2 - 1)) {
                    nextInput.focus();
                } else {
                    currInput.blur();
                }
            } else {
                if (index != 0) {
                    lastInput.focus();
                    console.log('到最后一个输入框啦！')
                }
            }
            if (dom.length - 1 == index) {
                this.nextButton();
            }
        },
        nextButton() {
            var dom = document.getElementsByTagName('button'),
                currButton = dom[0];
            currButton.focus();
        },
        send() {
            if (this.phoneNumber) {
                this.$Message.info({
                    content: '温馨提示：' + "发送成功！"
                });
            }
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text') { //第一个输入框获取焦点
                    controls[i].focus();
                }
            }
        }
    },
    created() {},
    mounted() {
        this.initEL('input');
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
        height: auto;
        position: relative;
        top: 30%;

        .text {
            margin-top: 20px;
            color: #464c5b;
            font-size: 2rem;
        }

        .account {
            margin-top: 20px;
            width: 200px;
        }

        .password {
            margin-top: 20px;
            width: 200px;
        }

        .login {
            width: 200px;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            line-height: normal;

            .ivu-btn-primary {
                width: 200px;
                margin-bottom: 10px;
                margin-top: 20px;
            }
        }

        .type {
            margin-top: 10px;

            .active {
                color: #57a3f3
            }
        }
    }
}
</style>
