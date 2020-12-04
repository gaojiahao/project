<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 16:29:09
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="800">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <div class="firstItem">
            <label class="" style="width: 120px;font-size: 16px;font-weight: 600;">基本信息：</label>
        </div>
        <FormItem label="商品名称：" prop="productName" >
            {{formValidate.productName}}
        </FormItem>
        <FormItem label="选取状态：" prop="status">
            <RadioGroup v-model="formValidate.status">
                <Radio label="true">
                    是
                </Radio>
                <Radio label="false">
                    否
                </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="备注：" prop="comment">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :style="{width:'400px'}" />
            </FormItem>
    </Form>
    <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">确认提交</Button>
    </div>
</Modal>
</template>

<script>
export default {
    name: 'ModalForm',
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
                        console.log(controls[0]);
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
    }
}
</script>
<style lang="less" scoped>
.firstItem{
        margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
}
</style>
