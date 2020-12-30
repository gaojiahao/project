<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-12 19:54:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-30 17:02:37
-->
<style>
    .ivu-table th.demo-table-info-column{
        background-color: #C0C0C0 !important;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #C0C0C0 !important;
    }
</style>
<template>
<div>
    <div class="content">
        <div class="content-box">
            <div class="content-item">
                <span style="margin-right:10px">采购价</span><Input v-model="inputData.purchasePrice" placeholder="" style="width: 100px" disabled /><span style="margin-left:10px">CNY</span>
            </div>
            <div class="content-item">
                <span style="margin-right:10px">重量</span><Input v-model="inputData.weight" placeholder="" style="width: 100px" disabled /><span style="margin-left:10px">KG</span>
            </div>
            <div class="content-item">
                <span style="margin-right:10px">浮动额度</span><Input v-model="inputData.floatingQuota" placeholder="" style="width: 100px" /><span style="margin-left:10px">%</span>
            </div>
            <div class="content-item">
                <span style="margin-right:10px">定价利润</span><Input v-model="inputData.pricingProfit" placeholder="" style="width: 100px" /><span style="margin-left:10px">%</span>
            </div>
            <div class="content-item">
                <Button type="primary" @click="setResearchData">确认</Button>
            </div>
        </div>
         <div class="content-box">
            <Button type="primary" @click="save">保存调研</Button>
        </div>
    </div>
    <div class="table-content">
        <div>
            <Table border :columns="columns" :data="data" :loading="loading" highlight-row stripe>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true)">查看</Button>
                </template>
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Research',
    data() {
        return {
            inputData: {
                purchasePrice: '10.55',
                weight: '12',
                floatingQuota: 0,
                pricingProfit: 0,
            },
            loading: true,
            columns: [
                {
                    title: '目的地',
                    key: 'destination'
                },
                {
                    title: '物流方式',
                    key: 'logisticsMode'
                },
                {
                    key: 'smallPackagePrice',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','小包运费'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    key: 'guaranteedPrice',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','保底价格'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    key: 'originalPrice',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','原挂单价'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    title: '店铺打折',
                    key: 'storeDiscount',
                    className: 'red-color',
                    width: 100,
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
                                },
                                style:{
                                    width: '50px'
                                }
                            }),
                            h('div', {
                                style: {
                                    marginLeft: '8px',
                                    marginTop: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '区域定价折扣',
                    key: 'areaPrice',
                    className: 'oranger-color',
                    width: 100,
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
                                },
                                style:{
                                    width: '50px'
                                }
                            }),
                            h('div', {
                                style: {
                                    marginLeft: '8px',
                                    marginTop: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    key: 'proposalPrice',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','建议价格'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    title: '浮动值',
                    key: 'floatNum',
                    width:100,
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
                                },
                                style:{
                                    width: '50px'
                                }
                            }),
                            h('div', {
                                style: {
                                    marginLeft: '8px',
                                    marginTop: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    key: 'sellPrice',
                    className: 'blue-color',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','销售价'),
                            h('div','(USD)'),
                        ])
                    },
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
                    width:100,
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
                                },
                                style:{
                                    width: '50px'
                                }
                            }),
                            h('div', {
                                style: {
                                    marginLeft: '8px',
                                    marginTop: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    key: 'referencePrice',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','参考价'),
                            h('div','(USD)'),
                        ])
                    },
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
                    width:100,
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
                                },
                                style:{
                                    width: '50px'
                                }
                            }),
                            h('div', {
                                style: {
                                    marginLeft: '8px',
                                    marginTop: '8px'
                                }
                            }, '%')
                        ]);
                    }
                },
                {
                    title: '价格差',
                    key: 'priceDifference',
                    width:100,
                    className: 'demo-table-info-column',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','价格差'),
                            h('div','(USD)'),
                        ])
                    },
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: params.row.sellPrice - params.row.referencePrice > 0  ? "#ed4014":"#19be6b"
                        },
                        },params.row.sellPrice - params.row.referencePrice);
                    }
                },
                {
                    title: '利润差',
                    key: 'profitDifference',
                    width:100,
                    className: 'demo-table-info-column',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                display: "inline-block",
                                color: params.row.profitMargin - params.row.referenceProfit > 0  ? "#ed4014":"#19be6b"
                            },
                        }, [params.row.profitMargin - params.row.referenceProfit,
                            h('span', {
                                style: {
                                    marginLeft: '1px',
                                    marginTop: '8px'
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
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
                    profitMargin: 12,
                    referencePrice: 20,
                    referenceProfit: 10,
                    url: 'www.baidu.com',
                    priceDifference:0,
                    profitDifference:0
                }
            ],
        }
    },
    methods: {
        changePage() {},
        showPop() {},
        setResearchData(){
            for(var i=0;i<this.data.length;i++){
                this.data[i]['floatNum'] = this.inputData['floatingQuota'];
                this.data[i]['profitMargin'] = this.inputData['pricingProfit'];
            }
        },
        save(){
            this.loading = true;
            this.$Message.info({content:'温馨提示：保存成功'});
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>

<style lang="less" scoped>
.top {
    // flex: 1;
    background-color: #ffffff;
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
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
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
background: #ffffff;
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
>>>.ivu-table td {
    height: 38px;
}

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
>>>.ivu-form-item-content {
    display: flex;
}

>>>.ivu-table-cell {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
}
</style>
