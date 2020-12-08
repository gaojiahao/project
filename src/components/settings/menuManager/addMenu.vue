<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-08 14:30:59
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="800">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <template v-for="(item, index) in formValidate">
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='text'">
                <Input v-model="formValidate[index]" :style="{width:'200px',float: 'left'}"></Input>
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
export default {
    name: 'AddMenu',
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
        showModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: {},
            show: false
        }
    },
    watch: {
        formConfig: {
            handler(val) {

            }
        },
        showModel: {
            handler(val) {
                this.show = val
                this.initEL('input');
            }
        },
        formValidate: {
            handler(val) {

            }
        }
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
                    this.$emit('clear-form-data');
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text') { //第一个输入框获取焦点
                    setTimeout(() => {
                        controls[0].focus();
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
                var idx = inputGroupArr.indexOf(e.srcElement);

                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    if (idx == iGlength - 1) { //表明已经是最后一个输入框
                        buttonGroup.focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
            }
        }
    },
    mounted() {
        this.initClick();
    }
}
</script>