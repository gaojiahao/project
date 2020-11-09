<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-09 10:05:01
-->
<template>
<div class="content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <template v-for="(item, index) in formValidate">
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='text'">
                <Input v-model="formValidate[index]" :style="{width:'200px'}"></Input>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='radio'">
                <RadioGroup v-model="formValidate[index]">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value" :key="ditem.value">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='select'">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable>
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </template>
        <FormItem>
            <div style="width:100%">
                <Button type="primary" @click="handleSubmit('formValidate')" style="    float: left;">保存</Button>
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
    Select,
    Option,
    RadioGroup,
    Radio
} from "view-design";
import XSelect from '@components/public/xSelect/xSelect'
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
        XSelect
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
            data: {},
        }
    },
    watch: {
        formConfig: {
            handler(val) {
                console.log(val)
            }
        },
        showModel: {
            handler(val) {
                console.log(val)
                this.show = val
            }
        },
    },
    methods: {
        ok() {

        },
        cancel() {
            this.$emit('clear-form-data');
            this.$emit('show-pop', false);
            this.$refs['formValidate'].resetFields();
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('save');
                    this.$emit('show-pop', false);
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text' && !controls[i].value) { //第一个输入框获取焦点
                    setTimeout(() => {
                        controls[0].focus();
                        console.log(controls[0].value);
                    }, 1000);
                }
            }
        },
        initClick() {
            this.initEL('input');
            var inputGroup = this.$el.getElementsByTagName("input");
            var inputGroupArr = Array.from(this.$el.getElementsByTagName("input"));
            var buttonGroup = this.$el.getElementsByTagName("button")[0];
            var iGlength = inputGroupArr.length;
            document.onkeypress = function (e) {
                var e = event || e;
                console.log(inputGroupArr.indexOf(e.srcElement));
                var idx = inputGroupArr.indexOf(e.srcElement);
                console.log(e, e.keyCode, e.srcElement, e.which);
                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    console.log(idx)
                    if (idx == iGlength - 1) { //表明已经是最后一个输入框
                        buttonGroup.focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
                console.log(e, e.keyCode, e.srcElement, e.which);
            }
        }
    },
    mounted() {
        this.initClick();
    },
    created() {

    }
}
</script>

<style scoped>
.content {
    padding: 40px 10px 10px 10px;
}

>>>.ivu-form-item-error-tip {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 9px;
    color: #ed4014;
    padding-left: 9px;
}

>>>.ivu-form-item-content {
    display: flex;
}
</style>
