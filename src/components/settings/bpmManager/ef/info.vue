<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-30 16:41:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-30 17:24:08
-->
<template>
    <Modal title="流程数据信息" v-model="dialogVisible" width="70%">
        <Alert show-icon closable>
            使用说明
            <Icon type="ios-bulb-outline" slot="icon"></Icon>
            <template slot="desc">以下流程信息可以被存储起来，方便下一次流程加载</template>
        </Alert>
        <br/>
        <!--一个高亮显示的插件-->
        <codemirror
                :value="flowJsonData"
                :options="options"
                class="code"
        ></codemirror>
    </Modal>
</template>

<script>
    import {
        Modal,
        Alert,
    } from "view-design";
    import 'codemirror/lib/codemirror.css'
    import { codemirror } from 'vue-codemirror'

    require("codemirror/mode/javascript/javascript.js")

    export default {
        props: {
            data: Object,
        },
        data() {
            return {
                dialogVisible: false,
                flowJsonData: '',
                options: {
                    mode: {name: "javascript", json: true},
                    lineNumbers: true
                }
            }
        },
        components: {
            codemirror,Modal,Alert,
        },
        methods: {
            init() {
                this.dialogVisible = true
                this.flowJsonData = JSON.stringify(this.data, null, 4).toString()
            }
        }
    }
</script>
