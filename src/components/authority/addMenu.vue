<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-03 21:06:56
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="800">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <template v-for="(item, index) in formValidate">
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]['type']=='text'">
                <Input v-model="formValidate[index]" :style="{width:'200px',float: 'left'}"></Input>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]['type']=='radio'">
                <RadioGroup v-model="formValidate[index]">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value">{{ditem.name}}</Radio>
                    </template>
                </RadioGroup>
            </FormItem>
        </template>
        <!--<FormItem label="平台负责人1:" prop="chargeUserId">
            <Select v-model="formValidate.chargeUserId" :style="{width:'200px',float: 'left'}" clearable multiple filterable>
                <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="平台负责人:" prop="chargeUserId">
            <XSelect></XSelect>
        </FormItem>-->
    </Form>
    <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </div>
</Modal>
</template>

<script>
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Modal,
    RadioGroup,
    Radio
} from "view-design";
export default {
    name: 'AddMenu',
    components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        Modal,
        RadioGroup,
        Radio
    },
    props: {
        titleText: {
            type: String,
            default: '',
        },
        formValidate: {
            type: Object,
            default () {
                return {}
            }
        },
        ruleValidate: {
            type: Object,
            default () {
                return {}
            }
        },
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        show: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            data: {}
        }
    },
    watch: {
        formConfig: {
            handler(val) {
                console.log(val)
            }
        },
        show: {
            handler(val) {
                this.show = val
            }
        }
    },
    methods: {
        ok() {

        },
        cancel() {

        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    debugger
                    this.$emit('save');
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
    }
}
</script>

<style scoped>
>>>.ivu-form-item-error-tip {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 9px;
    color: #ed4014;
    padding-left: 9px;
}
</style>
