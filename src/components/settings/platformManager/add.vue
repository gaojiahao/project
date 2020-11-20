<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 11:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 16:10:47
-->
<template>
<div class="base-platfrom-add">
    <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="平台名称:" prop="name">
                <Input v-model="formValidate.name" :style="{width:'200px',float: 'left'}"></Input>
            </FormItem>
            <FormItem label="平台唯一code:" prop="code">
                <Input v-model="formValidate.code" :style="{width:'200px',float: 'left'}"></Input>
            </FormItem>
            <FormItem label="平台URL:" prop="url">
                <Input v-model="formValidate.url" :style="{width:'400px',float: 'left'}"></Input>
            </FormItem>
            <FormItem label="平台负责人1:" prop="chargeUserId">
                <Select v-model="formValidate.chargeUserId" :style="{width:'200px',float: 'left'}" clearable multiple filterable>
                    <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="平台负责人:" prop="chargeUserId">
                <!--<Select v-model="formValidate.chargeUserId" :style="{width:'200px',float: 'left'}" clearable multiple filterable>
                    <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>-->
                <XSelect></XSelect>
            </FormItem>
            <FormItem>
                <div style="width:100%">
                    <Button type="primary" @click="handleSubmit('formValidate')" style="float:left">保存</Button>
                    <!--<Button @click="handleReset('formValidate')" style="float:left; margin-left: 8px">取消</Button>-->
                </div>
            </FormItem>
        </Form>
    </div>
</div>
</template>

<script>
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
} from "view-design";
import XSelect from '@components/public/xSelect/xSelect'
export default {
    name: 'Add',
    components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        XSelect
    },
    data() {
        const validateChargeUserId = (rule, value, callback) => {
            if (value && value.length) {
                callback();
            } else {
                callback(new Error('请选择平台负责人'));
            }
        };
        return {
            formValidate: {
                name: '',
                code: '',
                chargeUserId: '',
                url: '',
            },
            ruleValidate: {
                name: [{
                    required: true,
                    message: '请输入平台名称',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    type: 'string',
                    message: '请输入平台唯一code',
                    trigger: 'blur'
                }],
                // date: [{
                //     required: true,
                //     type: 'date',
                //     message: 'Please select the date',
                //     trigger: 'change'
                // }],
                url: [{
                    required: true,
                    type: 'string',
                    message: '请输入平台url',
                    trigger: 'blur'
                }],
                chargeUserId: [{
                    required: true,
                    validator: validateChargeUserId,
                    trigger: 'change'
                }],
            },
            userList: [{
                    value: '001',
                    label: '王二'
                },
                {
                    value: '002',
                    label: '李四'
                },
                {
                    value: '003',
                    label: '马六'
                },
            ]
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
.base-platfrom-add {
    width: 100%;

    .content {
        padding: 40px 10px 10px 10px;
    }
}
</style>
