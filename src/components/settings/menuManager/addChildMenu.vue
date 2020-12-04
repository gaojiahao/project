<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 15:43:52
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
                        <Radio :label="ditem.value">{{ditem.name}}</Radio>
                    </template>
                </RadioGroup>
            </FormItem>
        </template>
    </Form>
    <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </div>
</Modal>
</template>

<script>
export default {
    name: 'AddChildMenu',
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
        showChildModel: {
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
                console.log(val)
            }
        },
        showChildModel: {
            handler(val) {
                console.log(val)
                this.show = val
            }
        }
    },
    methods: {
        ok() {

        },
        cancel() {
            this.$emit('clear-form-data');
            this.$emit('show-child-pop', false);
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('save');
                    this.$emit('show-child-pop', false);
                    this.$emit('clear-form-data');
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
    }
}
</script>
