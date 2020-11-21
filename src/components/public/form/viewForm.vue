<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 19:49:02
-->
<template>
<div class="content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" label-colon>
        <template v-for="(item, index) in formValidate">
            <!--文本框-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='text'">
                <Input v-model="formValidate[index]" :style="{width:'200px'}" disabled v-show="!formConfig[index]['hidden']"></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--数值控件-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='number'">
                <InputNumber v-model="formValidate[index]" :style="{width:'200px'}" editable :precision="formConfig[index]['precision']" v-show="!formConfig[index]['hidden']"></InputNumber><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--单选框-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='radio'">
                <RadioGroup v-model="formValidate[index]" v-show="!formConfig[index]['hidden']">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value" :key="ditem.value" disabled>
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <!--formConfig[index]['dataSource']['multiple']控制选择器是否多选，单选-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='select'">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable disabled v-show="!formConfig[index]['hidden']">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <!--图片上传-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='uploadImage'">
                <UploadImg v-model="formValidate[index]" disabled v-show="!formConfig[index]['hidden']"></UploadImg>
            </FormItem>
            <!--文本域-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='textarea'">
                <Input v-model="formValidate[index]" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :style="{width:'400px'}" disabled />
            </FormItem>
            <!--添加多个input-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='texts'">
                <Texts v-model="formValidate[index]" disabled v-show="!formConfig[index]['hidden']"></Texts>
            </FormItem>
            <!--商品体积-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='size'">
                <Size v-model="formValidate[index]" disabled v-show="!formConfig[index]['hidden']"></Size>
            </FormItem>
        </template>
        <FormItem>
            <slot name='button'>
                <div style="width:100%">
                    
                </div>
            </slot>
        </FormItem>
    </Form>
</div>
</template>

<script>
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    RadioGroup,
    Radio,
    InputNumber
} from "view-design";
import UploadImg from '@components/public/upload/uploadImg';
import Texts from '@components/public/input/texts';
import Size from '@components/public/input/size'
export default {
    name: 'XForm',
    components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        RadioGroup,
        Radio,
        InputNumber,
        UploadImg,
        Texts,
        Size
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
    },
    data() {
        return {
        }
    },
    created() {

    }
}
</script>

<style scoped>
.content {
    padding: 10px 10px 10px 10px;
}

>>>.ivu-form-item-content {
    display: flex;
}
</style>
