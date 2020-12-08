<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-08 14:29:30
-->
<template>
<Modal v-model="show" title="高级筛选" @on-ok="ok" @on-cancel="cancel" width="800">
    <Form ref="formValidate" :model="formValidate" :label-width="120">
        <template v-for="(item, index) in formConfig">
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
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTime'">
                <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker> - 
                <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            </FormItem>
        </template>
    </Form>
    <div slot="footer">
        <Button @click="clearData">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')">筛选</Button>
    </div>
</Modal>
</template>

<script>
export default {
    name: 'SeniorFilter',
    props: {
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        showFilterModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: {},
            show: false,
            formValidate:{}
        }
    },
    watch: {
        showFilterModel: {
            handler(val) {
                this.show = val
                this.initEL('input');
            }
        },
    },
    methods: {
        ok() {

        },
        cancel() {
            this.$emit('show-filter', false);
        },
        clearData(){
            this.formValidate={};
        },
        handleSubmit() {
            this.$emit('set-filter', this.formValidate);
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

