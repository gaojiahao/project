<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-22 15:07:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-23 14:54:21
-->
<template>
<div>
    <Form :model="formItem" :label-width="120">
        <FormItem label="平台名称">
            <Input v-model="formItem.input" placeholder="Enter something..." style="width:300px;display:block;"></Input>
        </FormItem>
        <FormItem label="平台负责人">
            <Select v-model="formItem.select" style="width:200px;display:block;">
                <Option value="beijing">张三</Option>
                <Option value="shanghai">李四</Option>
                <Option value="shenzhen">王五</Option>
            </Select>
        </FormItem>
        <FormItem label="创建时间">
            <Row style="width:300px;display:block;">
                <Col span="11">
                <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别" style="width:300px;display:block;">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="平台">
            <CheckboxGroup v-model="formItem.checkbox" style="width:300px;display:block;">
                <Checkbox label="全平台"></Checkbox>
                <Checkbox label="亚马逊"></Checkbox>
                <Checkbox label="速卖通"></Checkbox>
                <Checkbox label="eBay"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="开关">
            <Switch v-model="formItem.switch" size="large">
                <span slot="open">开</span>
                <span slot="close">关</span>
            </Switch>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." style="width:300px;display:block;"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">提交</Button>
            <Button style="margin-left: 8px">取消</Button>
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
    Slider,
} from 'view-design';
export default {
    name: 'TestForm',
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
        Slider,
    },
    data() {
        return {
            formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
            }
        }
    },
}
</script>
