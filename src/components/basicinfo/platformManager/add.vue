<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 11:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-31 12:06:38
-->
<template>
<div class="base-platfrom-add">
    <div class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <FormItem label="平台名称:" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name" :style="{width:'200px',float: 'left'}"></Input>
            </FormItem>
            <FormItem label="平台URL:" prop="mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail" :style="{width:'400px',float: 'left'}"></Input>
            </FormItem>
            <FormItem label="平台负责人:" prop="city">
                <Select v-model="formValidate.city" placeholder="Select your city" :style="{width:'200px',float: 'left'}">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
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
export default {
    name: 'Add',
    components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
    },
    data() {
        return {
            formValidate: {
                name: '',
                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [{
                    required: true,
                    message: 'The name cannot be empty',
                    trigger: 'blur'
                }],
                mail: [{
                        required: true,
                        message: 'Mailbox cannot be empty',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: 'Incorrect email format',
                        trigger: 'blur'
                    }
                ],
                city: [{
                    required: true,
                    message: 'Please select the city',
                    trigger: 'change'
                }],
                gender: [{
                    required: true,
                    message: 'Please select gender',
                    trigger: 'change'
                }],
                interest: [{
                        required: true,
                        type: 'array',
                        min: 1,
                        message: 'Choose at least one hobby',
                        trigger: 'change'
                    },
                    {
                        type: 'array',
                        max: 2,
                        message: 'Choose two hobbies at best',
                        trigger: 'change'
                    }
                ],
                date: [{
                    required: true,
                    type: 'date',
                    message: 'Please select the date',
                    trigger: 'change'
                }],
                time: [{
                    required: true,
                    type: 'string',
                    message: 'Please select time',
                    trigger: 'change'
                }],
                desc: [{
                        required: true,
                        message: 'Please enter a personal introduction',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 20,
                        message: 'Introduce no less than 20 words',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
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
