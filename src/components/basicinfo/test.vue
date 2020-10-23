<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-22 17:30:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-23 15:32:44
-->
<template>
  <div>
    <Form :model="formItem" :label-width="120">
      <FormItem label="平台名称">
        <Input
          v-model="formItem.input"
          placeholder="Enter something..."
          style="width:300px;display:block;"
        ></Input>
      </FormItem>
      <FormItem label="平台负责人">
        <Select v-model="formItem.select" style="width:200px;display:block;">
          <Option value="beijing">张三</Option>
          <Option value="shanghai">李四</Option>
          <Option value="shenzhen">王五</Option>
        </Select>
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
  name: "Test",
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
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      }
    };
  }
};
</script>
