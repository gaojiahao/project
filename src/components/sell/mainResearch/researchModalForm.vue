<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 20:56:11
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="1300">
    <div>提示：请输入采购价格与包裹重量，然后在进行比价</div>
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
            <Button type="primary" @click="handleSubmit('formValidate')">比价</Button>
        </FormItem>
    </Form>
    <Table border :columns="columns" :data="data" stripe>
    </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
    <div slot="footer">
    </div>
</Modal>
</template>

<script>
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Modal,
    RadioGroup,
    Radio,
    Table,
    Page
} from "view-design";
export default {
    name: 'ResearchModalForm',
    components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        Modal,
        RadioGroup,
        Radio,
        Table,
        Page
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
        showModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: {},
            show: false,
            columns: [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '图片',
                    key: 'img',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.img || require("@assets/default/logo.png")
                                },
                                style: {
                                    width: '40px',
                                    height: '40px'
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '名称',
                    key: 'type'
                },
                {
                    title: '商品编号',
                    key: 'sku'
                },
                {
                    title: '供应商',
                    key: 'color'
                },
                {
                    title: '开发人员',
                    key: 'productName'
                },
                {
                    title: '分类',
                    key: 'supplier'
                },
                {
                    title: '特性标签',
                    key: 'supplierNum'
                },
                {
                    title: '包装材料',
                    key: 'createTime',
                },
                {
                    title: '平均成本',
                    key: 'recommendingOfficer',
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 100
                },
                {
                    title: '创建时间',
                    key: 'createTime1',
                },
            ],
            data: [{
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                }, {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                }, {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
                {
                    img: '',
                    type: '惯性积木玩具',
                    sku: 'PD00026',
                    color: "供应商1",
                    productName: "李四",
                    supplier: "玩具类",
                    supplierNum: "普货",
                    createTime: "顺丰45*45",
                    recommendingOfficer: '12.699',
                    status: "已调研",
                    createTime1: '2020-11-06'
                },
            ],
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
        },
        changePage() {}
    },
    mounted() {
        this.initClick();
    }
}
</script>

<style scoped>
>>>.ivu-form-item-error-tip {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 9px;
    color: #ed4014;
    padding-left: 9px;
}
</style>
