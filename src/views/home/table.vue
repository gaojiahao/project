<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 19:22:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-15 21:04:31
-->
<template>
<div>
    <Card style="margin: 0px 10px 10px 0px;width:100%;background-color: #ffffff; flex:1;">
        <div style="width: 200px;text-align: left;">表格统计</div>
        <Divider />
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
                <Select v-model="model2" style="width:200px" placeholder="变量二">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary" icon="ios-search">搜索</Button>
            </div>
        </div>
        <Table border :columns="columns1" :data="data1" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator show-sizer transfer></Page>
            </div>
        </div>
    </Card>
</div>
</template>

<script>
export default {
    name: 'XTable',
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
                    value: '1',
                    label: '遥控飞机'
                },
                {
                    value: '2',
                    label: '遥控飞机'
                },
                {
                    value: '3',
                    label: '遥控飞机'
                },
                {
                    value: '4',
                    label: '遥控飞机'
                },
                {
                    value: '5',
                    label: '遥控飞机'
                },
                {
                    value: '6',
                    label: '遥控飞机'
                }
            ],
            model1: '',
            model2: ''
        }
    },
    methods: {
        changePage(){}
    }
}
</script>
<style lang="less" scoped>
.ivu-divider-horizontal {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
