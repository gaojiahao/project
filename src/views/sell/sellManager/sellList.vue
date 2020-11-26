<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:38:33
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <RadioGroup v-model="filter" type="button">
                <Radio label="large">全部</Radio>
                <Radio label="default">接受</Radio>
                <Radio label="small">不接受</Radio>
            </RadioGroup>
        </div>
        <div class="filter-search">
            关键词：
            <Input placeholder="关键词" style="width: 200px" />
            创建时间：
            <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            <Button type="primary" icon="ios-search">查询</Button>
            <Button type="primary" icon="md-add-circle">添加</Button>
        </div>
    </div>
    <div>
        <Table border :columns="columns" :data="data" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true)">开发</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="showPop2(true)">编辑</Button>
                <Button type="info" size="small" style="margin-right: 5px" @click="showPop2(true)">审核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="showPop(true)">调研</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <ModalForm :titleText="titleText2" :formValidate="formValidate2" :ruleValidate="ruleValidate2" :showModel='showModel2' :formConfig="formConfig2" @save="save" @show-pop="showPop2" @clear-form-data="clearFormData2"></ModalForm>
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
import ModalForm from "@components/public/form/modalForm";
import config from "@views/sell/sellManager/sellConfig";

export default {
    name: "SellList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ModalForm,
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
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
                    title: '分类',
                    key: 'type'
                },
                {
                    title: 'SKU',
                    key: 'sku'
                },
                {
                    title: '颜色',
                    key: 'color'
                },
                {
                    title: '产品名称',
                    key: 'productName'
                },
                {
                    title: '厂商',
                    key: 'supplier'
                },
                {
                    title: '厂商货号',
                    key: 'supplierNum'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width: 100
                },
                {
                    title: '推荐人员',
                    key: 'recommendingOfficer',
                    width: 100
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 100
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 300
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
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                }, {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                }, {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                }
            ],
            filter: "large"
        }
    },
    methods: {
        clearFormData() {

        },
        showPop(flag, row) {
            if (row && row.id) {
                this.formValidate['id'] = row.id;
                this.titleText = '编辑';
            } else {
                this.titleText = '开发';
            }
            this.showModel = flag;
        },
        showPop2(flag, row) {
            if (row && row.id) {
                this.formValidate2['id'] = row.id;
                this.titleText2 = '编辑';
            } else {
                this.titleText2 = '审核';
            }
            this.showModel2 = flag;
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
