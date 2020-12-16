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
    <div class="wrapper">
        <div class="header">
            <div class="container">
                <H4 class="title">HONGHUANG宏煌</H4>
            </div>
        </div>
        <div class="login_wrapper">
            <div class="login_box">
                <div class="logo"></div>
                <div class="text">跨境电商ERP</div>
                <div class="type" v-model="type">
                    <span :class="[type=='login' ? 'active':'']" @click="changeType('login')">登录</span>
                    <!-- |
                    <span :class="[type!='login'?'active':'']" @click="changeType('register')">注册</span> -->
                </div>
                <!-- <template v-if="type=='register'">
                    <Input class="account" prefix="ios-mail" v-model="phoneNumber" placeholder="邮箱" icon="ios-send" @click.native="send" />
                    <Input class="account" v-model="phoneVerificationCode" placeholder="邮箱验证码" />
                    <Input class="account" prefix="ios-contact" v-model="rUserCode" placeholder="账户" />
                    <form>
                        <Input class="password" prefix="ios-key" v-model="rPassWord" type="password" password placeholder="密码必须由数字、字母、特殊字符组合,请输入6-16位" />
                    </form>
                    <Input class="account" prefix="md-appstore" v-model="tenantCode" placeholder="商户号" />
                    <div class="login">
                        <Button type="primary" @click="register" @keyup.enter="register">注册</Button>
                    </div>
                </template> -->
                <template>
                    <Input class="account" prefix="ios-contact" v-model="userCode" placeholder="账户" />
                    <form>
                        <Input class="password" prefix="ios-key" v-model="passWord" type="password" password placeholder="密码6-10位" />
                    </form>
                    <div style="width: 100%;display: flex; margin-top: 20px;">
                        <Input v-model="code" placeholder="验证码" style="width: 80px;margin-left: 100px;float: left;" />
                        <s-identify :identifyCode="identifyCode" @click.native="refreshCode" @set-identifyCode="setIdentifyCode"></s-identify>
                    </div>
                    <div class="login_button">
                        <Button type="primary" @click="login" @keyup.enter="login">登录</Button>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <div class="footer">
        Copyright 2010-2020 深圳市宏煌网络科技有限公司 粤ICP备1111111111号
    </div>
</div>
</template>

<script>
const sIdentify = ()=>import("@components/public/sIdentify/sIdentify");
import tokenService from "@service/tokenService";
import {
    validateEmail,
    validatePassword
} from '@utils/vaildata'

export default {
    name: "Login",
    components: {
        SIdentify:sIdentify
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
            phoneVerificationCode: "",
            tenantCode: "",
            rUserCode: '',
            rPassWord: '',
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
                if (!this.userCode || !this.passWord) {
                    this.$Message.error("请输入用户名或密码");
                    return;
                }
                if (this.code) {
                    console.log(this.code.toUpperCase())
                    console.log(this.code.toLowerCase())
                    console.log(this.identifyCode)
                    if (this.code != this.identifyCode.toLowerCase()&&this.code != this.identifyCode.toUpperCase()) {
                        this.$Message.error("验证码出错");
                        return;
                    }
                } else {
                    this.$Message.error("验证码不能为空");
                    return;
                }
                params.userName = this.userCode;
                params.password = this.passWord;
            }
            this.$loading.show();
            var data = {
                token:'adfadsfdsf234234cxvz',
                name:'小竹熊管理员',
                userName:'admim',
                timestamp: +new Date()
            };
            tokenService.setToken(data);
            this.$router.push('index');
            // tokenService
            //     .pcLogin(params)
            //     .then(data => {

            //         var token = tokenService.getToken();
            //         if (token) {
            //             this.$router.push('index');
            //         }
            //     })
            //     .catch(err => {
            //         this.$loading.hide();
            //         this.$Message["error"]({
            //             background: true,
            //             content: '温馨提示：' + err.message
            //         });
            //         this.refreshCode();
            //     });
        },
        /**
         * @name: gaojiahao
         * @test: 注册
         * @msg:
         * @param {*}
         * @return {*}
         */
        async register() {
            let params = {};

            if (this.phoneNumber === '') {
                this.$Message.error('请正确填写邮箱');
                return;
            } else {
                if (this.phoneNumber !== '') {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (!reg.test(this.phoneNumber)) {
                        this.$Message.error('请输入有效的邮箱');
                        return;
                    }
                }
            }
            if (!this.rUserCode) {
                this.$Message.error("请输入用户名");
                return;
            }
            if (this.rPassWord === '') {
                this.$Message.error('请正确填写密码');
                return;
            } else {
                if (this.rPassWord !== '') {
                    var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
                    if (!passwordreg.test(this.rPassWord)) {
                        this.$Message.error('密码必须由数字、字母、特殊字符组合,请输入6-16位')
                        return;
                    }
                }
            }
            if (!this.tenantCode) {
                this.$Message.error("请输入商户号");
                return;
            }

            params.email = this.phoneNumber;
            params.verificationCode = this.phoneVerificationCode;
            params.userName = this.rUserCode;
            params.password = this.rPassWord;
            params.tenantCode = this.tenantCode;
            this.$loading.show();
            tokenService
                .register(params)
                .then(res => {
                    if (res.status == '200') {
                        this.$loading.hide();
                        this.$Message.info('注册成功');
                        this.type = 'login';
                    }
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
        alertError(message) {
            this.$Message.error({
                content: message
            });
            return;
        },
        /**
         * @name: gaojiahao
         * @test: 随机验证码
         * @msg:
         * @param {*}
         * @return {*}
         */
        generatedCode() {
            const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            ]
            let code = ''
            for (let i = 0; i < 4; i++) {
                let index = Math.floor(Math.random() * 62)
                code += random[index]
            }
            return code
        },
        /**
         * @name: gaojiahao
         * @test: 更改登录注册类型
         * @msg:
         * @param {*}
         * @return {*}
         */
        changeType(type) {
            this.type = type;
            this.initKeypress();
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCode, 4)
        },
        makeCode(o, l) {
            this.identifyCode = this.generatedCode();
        },
        send() {
            if (this.phoneNumber) {
                this.$Message.info({
                    content: '温馨提示：' + "发送成功！"
                });
            }
        },
        setIdentifyCode(value){
            this.identifyCode = value;
        },
        initEl() {
            var controls = document.getElementsByTagName('input');
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text') {
                    controls[i].focus();
                }
            }
        },
        initKeypress(){
            this.initEl();
            var inputGroup = document.getElementsByTagName("input");
            var inputGroupArr = Array.from(document.getElementsByTagName("input"));
            var iGlength = inputGroupArr.length;
            document.onkeypress = function (e) {
                var e = event || e;

                var idx = inputGroupArr.indexOf(e.srcElement);
                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    if (idx == iGlength - 1) { //表明已经是最后一个输入框
                        var a = document.getElementsByTagName("button")[0];
                        document.getElementsByTagName("button")[0].focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
            }
        }
    },
    created() {
        tokenService.clean();
    },
    mounted() {
        this.initKeypress();
    }
};
</script>

<style lang="less" scoped>
.login{
    .wrapper {
        width: 100%;
        color: #464c5b;
        background-image: url("~@assets/bg/bg.jpg");
        background-repeat:no-repeat;
        background-size: cover;
        background-position: center 0;
        height: 937px;
        .header{
            width: 100%;
            height: 70px;
            background: #fff;
            border-bottom: solid 1px #eee;
        }
        .container {
            width: 1170px;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
            .title{
                font-size: 48px;
            }
        }
        .container {
            width: 1170px;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
        }
        .login_wrapper{
            width: 1170px;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: 0;
            margin-top: 100px;
            margin-left: auto;
            .login_box {
                border-radius: 10px;
                width: 400px;
                margin: auto;
                height: auto;
                position: relative;
                top: 30%;
                background: rgba(255,255,255,0.6);
                box-shadow: 2px 2px 5px rgb(104,104,104);
                text-align: center;
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

                .login_button {
                    width: 200px;
                    display: inline-block;
                    position: relative;
                    vertical-align: middle;
                    line-height: normal;

                    .ivu-btn-primary {
                        width: 200px;
                        margin-bottom: 20px;
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
    }
    .footer {
        position: relative;
        width: 100%;
        text-align: center;
        line-height: 24px;
        margin-top: -70px;
        height: 70px;
        padding: 14px 15px 0 15px;
        color: #555;
        background: #f5f5f5;
        border-top: solid 1px #ddd;
        overflow: hidden;
    }
}
</style>
