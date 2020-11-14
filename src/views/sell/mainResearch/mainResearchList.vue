<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:36:24
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <RadioGroup v-model="filter" type="button">
                <Radio label="large">全部</Radio>
                <Radio label="default">已调研</Radio>
                <Radio label="small">未调研</Radio>
            </RadioGroup>
        </div>
        <div class="filter-search">
            关键词：
            <Input placeholder="关键词" style="width: 200px" />
            创建时间：
            <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            <Button type="primary" icon="ios-search">查询</Button>
        </div>
    </div>
    <div>
        <Table border :columns="columns" :data="data" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="showPop(true)">比价</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="showPop2()">调研</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
    <ResearchModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ResearchModalForm>
</div>
</template>

<script>
import {
    Table,
    Page,
    RadioGroup,
    Radio,
    Select,
    Option,
    DatePicker
} from "view-design";
import ResearchModalForm from "@components/sell/mainResearch/researchModalForm";
import config from "@views/sell/mainResearch/researchConfig";

export default {
    name: "MainResearchList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ResearchModalForm,
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
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
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 200
                }
            ],
            dataConfig: {
                'filterList': [{
                    name: '全部',
                    value: 'all',
                }, {
                    name: '已审核',
                    value: 'all',
                }, {
                    name: '待审核',
                    value: 'all',
                }]
            },
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
            filter: "large"
        }
    },
    methods: {
        clearFormData() {

        },
        showPop(flag, row) {
            this.titleText = '参考比价';
            this.showModel = flag;
        },
        showPop2(id) {
            this.$router.push({
                name: 'Research',
                params: {
                    id: id || '123'
                }
            })
        },
        save() {

        },
        changePage() {

        },
        clearFormData2() {}
    }
}
</script>

<style lang="less" scoped>
.storeManager-container {
    margin-top: 16px;

    .head {
        height: 38px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 38px;
        ;

        .filter-button {
            float: left;
        }

        .filter-search {
            float: right;
        }
    }
}
</style>
