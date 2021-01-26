<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-12 19:54:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-25 18:04:29
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
                    <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    CreatePriceComparison,
    GetPriceComparisonPage
} from "@service/basicinfoService";

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
                    key: 'logisticsName'
                },
                {
                    key: 'freight',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','小包运费'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    key: 'guaranteed',
                    width:100,
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','保底价格'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    key: 'original_Price',
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
                    key: 'store_discount',
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
                                    value: params.row.store_discount,
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
                    key: 'area_discount',
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
                                    value: params.row.area_discount,
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
                    key: 'suggested_price',
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
                    key: 'float_value',
                    width:100,
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.float_value,
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
                    key: 'sale_price',
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
                                value: params.row.sale_price,
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
                    key: 'profit_margin',
                    width:100,
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.profit_margin,
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
                    key: 'reference_price',
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
                                value: params.row.reference_price,
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
                    key: 'reference_profit',
                    width:100,
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                            }
                        }, [
                            h('Input', {
                                props: {
                                    value: params.row.reference_profit,
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
                    key: 'price_difference',
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
                            color: params.row.sale_price - params.row.reference_price > 0  ? "#ed4014":"#19be6b"
                        },
                        },params.row.sale_price - params.row.reference_price);
                    }
                },
                {
                    title: '利润差',
                    key: 'profit_difference',
                    width:100,
                    className: 'demo-table-info-column',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                display: "inline-block",
                                color: params.row.profit_margin - params.row.reference_profit > 0  ? "#ed4014":"#19be6b"
                            },
                        }, [params.row.profit_margin - params.row.reference_profit,
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
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                },
                {
                    destination: 'France',
                    logisticsName: '美国e邮宝',
                    freight: 80.64,
                    guaranteed: 58.64,
                    original_Price: 60.64,
                    store_discount: 10,
                    area_discount: 5,
                    suggested_price: 16.99,
                    float_value: 5,
                    sale_price: 25,
                    profit_margin: 12,
                    reference_price: 20,
                    reference_profit: 10,
                    url: 'www.baidu.com',
                    price_difference:0,
                    profit_difference:0
                }
            ],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
        }
    },
    methods: {
        showPop() {},
        setResearchData(){
            for(var i=0;i<this.data.length;i++){
                this.data[i]['float_value'] = this.inputData['floatingQuota'];
                this.data[i]['profit_margin'] = this.inputData['pricingProfit'];
            }
        },
        save(){
            for(var i=0;i<this.data.length;i++){
                var params = {};
                params = {
                    goodsCode: this.$parent.formData.code,
                    destination: this.data[i].destination,
                    logisticsName: this.data[i].logisticsName,
                    freight: this.data[i].freight,
                    guaranteed: this.data[i].guaranteed,
                    original_Price: this.data[i].original_Price,
                    store_discount: this.data[i].store_discount,
                    area_discount: this.data[i].area_discount,
                    suggested_price: this.data[i].suggested_price,
                    float_value: this.data[i].float_value,
                    sale_price: this.data[i].sale_price,
                    profit_margin: this.data[i].profit_margin,
                    reference_price: this.data[i].reference_price,
                    reference_profit: this.data[i].reference_profit,
                    price_difference: this.data[i].price_difference,
                    profit_difference: this.data[i].profit_difference,
                };
                if (params.goodsCode) {
                    return new Promise((resolve, reject) => {
                        this.$FromLoading.show();
                        CreatePriceComparison(params).then(res => {
                            if (res.result.code == 200) {
                                this.$FromLoading.hide();
                                this.$Message.info({content:'温馨提示：保存成功'});
                            } else if (res.result.code == 400) {
                                this.$Message.error({
                                    background: true,
                                    content: res.result.msg
                                });
                                this.$FromLoading.hide();
                            }
                        });
                    });
                } else {
                    this.$Message.error('保存失败');
                }
            }
        },
        GetPriceComparisonPage() {
            return new Promise((resolve, reject) => {
                GetPriceComparisonPage(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.totalPage = res.result.item.totalCount;
                            this.data = res.result.item.items;
                            this.loading = false;
                        });
                    }
                });
            });
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetPriceComparisonPage();
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetPriceComparisonPage();
        },
    },
    created(){
        //this.GetPriceComparisonPage();
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
