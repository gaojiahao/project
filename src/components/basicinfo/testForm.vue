<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-22 15:07:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-23 19:15:15
-->
<template>
<div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="姓名:" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name" :style="{width:'200px',float: 'left'}"></Input>
        </FormItem>
        <FormItem label="邮箱:" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail" :style="{width:'200px',float: 'left'}"></Input>
        </FormItem>
        <FormItem label="城市:" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city" :style="{width:'100px',float: 'left'}">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="日期:">
            <Row :style="{width:'200px',float: 'left'}">
                <Col span="11">
                <FormItem prop="date">
                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                <FormItem prop="time">
                    <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别:" prop="gender">
            <RadioGroup v-model="formValidate.gender" :style="{width:'200px',float: 'left'}">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="爱好:" prop="interest">
            <CheckboxGroup v-model="formValidate.interest" :style="{width:'300px',float: 'left'}">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="备注:" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <div style="width:100%">
                <Button type="primary" @click="handleSubmit('formValidate')" style="float:left">提交</Button>
                <Button @click="handleReset('formValidate')" style="float:left; margin-left: 8px">取消</Button>
            </div>
        </FormItem>
    </Form>
</div>
</template>

<script>
import {
    Form,
    FormItem,
    Input,
    Button,
    CheckboxGroup,
    Checkbox,
    Row,
    Col,
    DatePicker,
    TimePicker,
    Select,
    Option,
    RadioGroup,
    Radio,
    Slider
} from "view-design";
export default {
    name: "TestForm",
    components: {
        Form,
        FormItem,
        Input,
        Button,
        CheckboxGroup,
        Checkbox,
        Row,
        Col,
        DatePicker,
        TimePicker,
        Select,
        Option,
        RadioGroup,
        Radio,
        Slider
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
};
</script>
