<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-19 11:08:40
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="800">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <div class="firstItem">
            <label class="" style="width: 120px;font-size: 16px;font-weight: 600;">基本信息：</label>
        </div>
        <FormItem label="商品名称：">
            {{data.name}}
        </FormItem>
        <FormItem label="选取状态：" prop="isSelect">
            <RadioGroup v-model="formValidate.isSelect">
                <Radio :label="true">
                    是
                </Radio>
                <Radio :label="false">
                    否
                </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="是否主推：" prop="isMain">
            <RadioGroup v-model="formValidate.isMain">
                <Radio :label="true">
                    是
                </Radio>
                <Radio :label="false">
                    否
                </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="备注：" prop="remark">
            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :style="{width:'400px'}" />
        </FormItem>
    </Form>
    <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </div>
</Modal>
</template>

<script>
import config from "@views/sell/selectionManager/selectionResultListConfig";
export default {
    name: 'ModalForm',
    mixins: [config],
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
        showModel: {
            type: Boolean,
            default: false,
        },
        data:{
            type:Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            show: false
        }
    },
    watch: {
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
                    this.$emit('save',this.formValidate);
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
<style lang="less" scoped>
.firstItem{
        margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
}
</style>
