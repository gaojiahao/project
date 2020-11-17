<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 19:28:03
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <RadioGroup v-model="filter" type="button">
                <Radio label="large">全部</Radio>
                <Radio label="default">已审核</Radio>
                <Radio label="small">待审核</Radio>
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
                <Button type="success" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)">审核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="goResearch(row)">查看调研</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
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
import config from "@views/basicinfo/productManager/productListConfig";

export default {
    name: "StoreList",
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
            showModel: false,
            defaultImg: require("@assets/default/logo.png"),
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
                    key: 'name'
                },
                {
                    title: '商品编号',
                    key: 'code'
                },
                {
                    title: '供应商',
                    key: 'supplier'
                },
                {
                    title: '开发人员',
                    key: 'developer'
                },
                {
                    title: '分类',
                    key: 'type'
                },
                {
                    title: '特性标签',
                    key: 'label'
                },
                {
                    title: '包装材料',
                    key: 'packingMaterial'
                },
                {
                    title: '平均成本',
                    key: 'averageCost'
                },
                {
                    title: '状态',
                    key: 'status'
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width:200
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
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已选",
                createTime: "2020-11-06",
            }],
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
                this.titleText = '审核';
            }
            this.showModel = flag;
        },
        save() {

        },
        changePage() {

        },
        goResearch(row){
            this.$router.push({path:'/sell/mainResearch/researchResult/researchResultList',query: {id:row.id||123}})
        }
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
