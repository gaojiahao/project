<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-12 19:54:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 16:40:26
-->
<template>
<div>
    <div class="bottom-title">
        商品信息
    </div>
    <div class="top">
        <div class="top-box">
            <div class="item">
                <label>商品编号：</label>
                <Input v-model="formData['productCode']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>商品分类：</label>
                <Input v-model="formData['productType']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>品牌：</label>
                <Input v-model="formData['brand']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>是否带包装：</label>
                <RadioGroup v-model="formData['isPacking']">
                    <Radio label="true" disabled>
                        是
                    </Radio>
                    <Radio label="false" disabled>
                        否
                    </Radio>
                </RadioGroup>
            </div>
            <div class="item">
                <label>商品名称：</label>
                <Input v-model="formData['productName']" :style="{width:'400px'}" disabled></Input>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="content-box">
            <div class="content-item">
                <span style="margin-right:10px">采购价</span><Input v-model="inputData.purchasePrice" placeholder="" style="width: 100px" /><span style="margin-left:10px">CNY</span>
            </div>
            <div class="content-item">
                <span style="margin-right:10px">重量</span><Input v-model="inputData.weight" placeholder="" style="width: 100px" /><span style="margin-left:10px">KG</span>
            </div>
            <div class="content-item">
                <span style="margin-right:10px">浮动额度</span><Input v-model="inputData.floatingQuota" placeholder="" style="width: 100px" /><span style="margin-left:10px">CNY</span>
            </div>
            <div class="content-item">
                <span style="margin-right:10px">定价利润</span><Input v-model="inputData.pricingProfit" placeholder="" style="width: 100px" /><span style="margin-left:10px">CNY</span>
            </div>
            <div class="content-item">
                <Button type="primary">确认</Button>
            </div>
        </div>
    </div>
    <div class="table-content">
        <div>
            <Table border :columns="columns" :data="data" stripe>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true)">查看</Button>
                </template>
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Input,
    Select,
    Option,
    RadioGroup,
    Radio,
    Table,
    Page
} from "view-design";
export default {
    name: 'Research',
    components: {
        Input,
        Select,
        Option,
        RadioGroup,
        Radio,
        Table,
        Page
    },
    data() {
        return {
            formData: {
                productCode: 'TX23423',
                productType: '积木',
                brand: '森宝',
                isPacking: 'true',
                productName: '地方撒快乐'
            },
            inputData: {
                purchasePrice: '',
                weight: '',
                floatingQuota: '',
                pricingProfit: '',
            },
            columns: [{
                    title: '目的地',
                    key: 'destination'
                },
                {
                    title: '物流方式',
                    key: 'logisticsMode'
                },
                {
                    title: '小包运费（CNY）',
                    key: 'smallPackagePrice'
                },
                {
                    title: '保底价格（CNY）',
                    key: 'guaranteedPrice'
                },
                {
                    title: '原挂单价（CNY）',
                    key: 'originalPrice'
                },
                {
                    title: '店铺打折',
                    key: 'storeDiscount',
                    className: 'red-color',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.storeDiscount,
                                },
                                on: {
                                    'on-change': (event) => {
                                        this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                    }
                                }
                            }),
                            h('div', {
                                style: {
                                    margin: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '区域定价折扣',
                    key: 'areaPrice',
                    className: 'oranger-color',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.areaPrice,
                                },
                                on: {
                                    'on-change': (event) => {
                                        this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                    }
                                }
                            }),
                            h('div', {
                                style: {
                                    margin: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '建议价格（USD）',
                    key: 'proposalPrice'
                },
                {
                    title: '浮动值',
                    key: 'floatNum',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.floatNum,
                                },
                                on: {
                                    'on-change': (event) => {
                                        this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                    }
                                }
                            }),
                            h('div', {
                                style: {
                                    margin: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '销售价（USD）',
                    key: 'sellPrice',
                    className: 'blue-color',
                    render: (h, params) => {
                        return h('Input', {
                            props: {
                                value: params.row.sellPrice,
                            },
                            on: {
                                'on-change': (event) => {
                                    this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                },
                {
                    title: '利润率',
                    key: 'profitMargin',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.profitMargin,
                                },
                                on: {
                                    'on-change': (event) => {
                                        this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                    }
                                }
                            }),
                            h('div', {
                                style: {
                                    margin: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '参考价（USD）',
                    key: 'referencePrice',
                    render: (h, params) => {
                        return h('Input', {
                            props: {
                                value: params.row.referencePrice,
                            },
                            on: {
                                'on-change': (event) => {
                                    this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                },
                {
                    title: '参考利润',
                    key: 'referenceProfit',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.referenceProfit,
                                },
                                on: {
                                    'on-change': (event) => {
                                        this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                    }
                                }
                            }),
                            h('div', {
                                style: {
                                    margin: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '比价网址',
                    key: 'url',
                    render: (h, params) => {
                        return h('Input', {
                            props: {
                                value: params.row.url,
                            },
                            on: {
                                'on-change': (event) => {
                                    this.data[params.index][params.column.key] = event.currentTarget.value; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                },
                {
                    title: '历史记录',
                    slot: 'action',
                    align: 'center',
                    width: 100
                }
            ],
            data: [{
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                },
                {
                    destination: 'France',
                    logisticsMode: '美国e邮宝',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 10,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com'
                }
            ],
        }
    },
    methods: {
        changePage() {},
        showPop() {}
    }
}
</script>

<style lang="less" scoped>
.top {
    // flex: 1;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    padding: 10px 10px 10px 20px;

    .top-box {
        width: 100%;
        height: auto;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;

        .item {
            margin-right: 100px;
            line-height: 38px;
            margin-top: 10px;
            // width: 33.3333%;
            height: 38px;
        }
    }
}

.content {
    margin: 10px;

    .content-box {
        display: flex;

        .content-item {
            display: inline-block;
            overflow: hidden;
            position: relative;
            margin-right: 10px;
        }
    }
}

.bottom-title {
    background: linear-gradient(to top, #d2effd, #ffffff);
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    transition: all 0.2s ease-in-out;
    text-align: left;
    padding: 10px 20px;
}

.bottom {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
}
</style><style scoped>
>>>.ivu-table td.red-color {
    color: #ed4014;
}

>>>.ivu-table th.red-color {
    color: #ed4014;
}

>>>.ivu-table td.oranger-color {
    color: #ff9900;
}

>>>.ivu-table th.oranger-color {
    color: #ff9900;
}

>>>.ivu-table td.blue-color {
    color: #5cadff;
}

>>>.ivu-table th.blue-color {
    color: #5cadff;
}

>>>.ivu-input {
    color: unset;
}

>>>.ivu-form-item-error-tip {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 9px;
    color: #ed4014;
    padding-left: 9px;
}

>>>.ivu-form-item-content {
    display: flex;
}

>>>.ivu-table-cell {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
}
</style>
