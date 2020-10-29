<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 19:22:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 19:45:20
-->
<template>
<div>
    <div style="width: 200px;text-align: left;">表格统计</div>
    <Divider />
    <!--<Table border :columns="columns1" :data="data1" :row-class-name="rowClassName"></Table>-->
    <div style="width:100%; margin-bottom:15px;display:flex;margin-top: 15px;justify-content: space-between;">
        <div style="">
            <RadioGroup v-model="buttonSize" type="button">
                <Radio label="large">全部产品</Radio>
                <Radio label="default">待上架</Radio>
                <Radio label="small">预期</Radio>
                <Radio label="big">已上架</Radio>
            </RadioGroup>
        </div>
        <div style="">
            <Select v-model="model1" style="width:200px" placeholder="变量一">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model1" style="width:200px" placeholder="变量二">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary" icon="ios-search">搜索</Button>
        </div>
    </div>
    <Table border :columns="columns1" :data="data1" stripe></Table>
    <div style="display: flex; margin:10px;">
        <Page :total="100" show-total />
    </div>
</div>
</template>

<script>
import {
    Table,
    Divider,
    Tag,
    RadioGroup,
    Radio,
    Select,
    Option,
    Button,
    Page
} from "view-design";
export default {
    name: 'XTable',
    components: {
        Table,
        Divider,
        Tag,
        RadioGroup,
        Radio,
        Select,
        Option,
        Button,
        Page
    },
    data() {
        return {
            columns1: [{
                    title: '时间',
                    key: 'time'
                },
                {
                    title: '商品',
                    key: 'name'
                },
                {
                    title: 'SKU',
                    key: 'sku'
                },
                {
                    title: '产商',
                    key: 'producer'
                },
                {
                    title: '产商货号',
                    key: 'producerGoodsNum'
                },
                {
                    title: '状态',
                    key: 'status'
                }
            ],
            dataConfig: {
                'filterList': [{
                    name: '全部产品',
                    value: 'all',
                }, {
                    name: '待上架',
                    value: 'all',
                }, {
                    name: '预期',
                    value: 'all',
                }, {
                    name: '已上架',
                    value: 'all',
                }]
            },
            data1: [{
                    time: '2020-09-17',
                    name: '遥控飞机',
                    sku: 'pd12345',
                    producer: '供应商1',
                    producerGoodsNum: 'LG008',
                    status: 'yishangJia'
                },
                {
                    time: '2020-09-17',
                    name: '遥控飞机',
                    sku: 'pd12345',
                    producer: '供应商1',
                    producerGoodsNum: 'LG008',
                    status: 'yishangJia'
                },
                {
                    time: '2020-09-17',
                    name: '遥控飞机',
                    sku: 'pd12345',
                    producer: '供应商1',
                    producerGoodsNum: 'LG008',
                    status: 'yishangJia'
                },
                {
                    time: '2020-09-17',
                    name: '遥控飞机',
                    sku: 'pd12345',
                    producer: '供应商1',
                    producerGoodsNum: 'LG008',
                    status: 'yishangJia'
                },
                {
                    time: '2020-09-17',
                    name: '遥控飞机',
                    sku: 'pd12345',
                    producer: '供应商1',
                    producerGoodsNum: 'LG008',
                    status: 'yishangJia'
                },
            ],
            buttonSize: 'large',
            cityList: [{
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: ''
        }
    },
    methods: {
        rowClassName(row, index) {
            if (index % 2 == 1) {
                return 'demo-table-info-row';
            }
            return '';
        }
    }
}
</script>

<style>
.ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color: #fff;
}

.ivu-table td.demo-table-info-column {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
}

.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}

.ivu-card ivu-card-bordered .ivu-card-body {
    padding: 0 16px;
}
</style><style lang="less" scoped>
.ivu-divider-horizontal {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
