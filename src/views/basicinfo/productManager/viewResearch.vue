<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-23 16:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 16:02:12
-->
<template>
<div class="viewResearch">
    <div class="top-title">
        商品信息
    </div>
    <div class="top">
        <div class="top-box">
            <div class="item">
                <label>商品编号：</label>
                <Input v-model="formData['productCode']" :style="{width:'200px'}" disabled></Input>
            </div>
            <div class="item">
                <label>商品名称：</label>
                <Input v-model="formData['productName']" :style="{width:'200px'}" disabled></Input>
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
        </div>
    </div>
    <div class="research-container">
        <div class="research-container-item">
            <div class="title">
                销售比价
            </div>
            <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" height="300">
            </Table> 
        </div>
        <div class="research-container-item2">
            <div class="title">
                开发比价
            </div>
            <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" height="300">
            </Table> 
        </div>
    </div>
    <div class="research-container">
        <div class="research-container-item3">
            <div style="height:30px">
                <div class="title" style="float:left">
                    审核价格
                </div>
                <div style="float:right">
                    <Button size="small" type="primary" @click.native="">保存</Button>
                </div>
            </div>
            <Table border :loading="loading" highlight-row :columns="examineDataColumns" :data="examineData" stripe ref="selection" height="300">
            </Table> 
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:"ViewResearch",
    data() {
        return {
            loading:true,
            formData: {
                productCode: 'TX23423',
                productType: '积木',
                brand: '森宝',
                isPacking: 'true',
                productName: '地方撒快乐'
            },
            logisticsModeList:[
                {
                    name:'深圳挂号',
                    value:"001"
                },
                {
                    name:'香港挂号',
                    value:"002"
                }
            ],
            columns: [
                {
                    title: '目的地',
                    key: 'destination',
                },
                {
                    title: '物流方式',
                    key: 'logisticsMode',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                display: "inline-block",
                                color: "#2db7f5"
                            },
                        }, [params.row.logisticsMode,
                            h('span', {
                                style: {
                                    marginLeft: '1px',
                                    marginTop: '8px'
                                }
                            })
                        ]);
                        
                    }
                },
                {
                    title: '保底价',
                    key: 'basePirce',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','保底价格'),
                            h('div','(USD)'),
                        ])
                    }
                },
                {
                    title: '建议价',
                    key: 'proposalPrice',
                    key: 'basePirce',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','建议价'),
                            h('div','(USD)'),
                        ])
                    }
                },
                {
                    title: '利润率',
                    key: 'profitMargin',
                },
                {
                    title: '销售价',
                    key: 'sellPrice',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','销售价'),
                            h('div','(USD)'),
                        ])
                    }
                },
            ],
            data: [
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:10,
                    profitMargin:10,
                    sellPrice: 10
                },
            ],
            examineDataColumns:[
                {
                    title: '目的地',
                    key: 'destination'
                },
                {
                    title: '物流方式',
                    key: 'logisticsMode',
                    render: (h, params) => {
                        return h('Select',{
                                props:{
                                    value: params.row.logisticsMode,
                                },
                                on: {
                                    'on-change':(event) => {
                                        this.examineData[params.index].logisticsMode = event;
                                    }
                                },
                            },
                            this.logisticsModeList.map((item) =>{
                                return h('Option', {
                                    props: {
                                        value: item.value,
                                        label: item.name
                                    },
                                    value: params.row.logisticsMode
                                })
                            })
                        )
                    }
                },
                {
                    key: 'smallPackagePrice',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','小包运费'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    key: 'guaranteedPrice',
                    renderHeader:(h,params)=>{
                        return h('div',[
                            h('div','保底价格'),
                            h('div','(CNY)'),
                        ])
                    }
                },
                {
                    key: 'originalPrice',
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
            ],
            examineData:[
                {
                    destination: 'France',
                    logisticsMode: '001',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                }, 
                {
                    destination: 'France',
                    logisticsMode: '002',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                }, 
                {
                    destination: 'France',
                    logisticsMode: '001',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                }, 
                {
                    destination: 'France',
                    logisticsMode: '001',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                }, 
                {
                    destination: 'France',
                    logisticsMode: '001',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                }, 
                {
                    destination: 'France',
                    logisticsMode: '001',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                }, 
                {
                    destination: 'France',
                    logisticsMode: '001',
                    smallPackagePrice: 80.64,
                    guaranteedPrice: 58.64,
                    originalPrice: 60.64,
                    storeDiscount: 10,
                    areaPrice: 5,
                    proposalPrice: 16.99,
                    floatNum: 5,
                    sellPrice: 25,
                    profitMargin: 12,
                },    
            ]
        }
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }

}
</script>
<style scoped>
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
>>>.ivu-select {
    color: #2db7f5;
}
</style>
<style lang="less" scoped>
.viewResearch{
    .top {
        // flex: 1;
        background-color: #ffffff;
        border: 1px solid #dcdee2;
        border-color: #e8eaec;
        transition: all 0.2s ease-in-out;
        padding: 5px;

        .top-box {
            width: 100%;
            height: auto;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;

            .item {
                margin-right: 10px;
                line-height: 32px;
                height: 32px;
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
    .top-title {
        background: linear-gradient(to top, #d2effd, #ffffff);
        border: 1px solid #dcdee2;
        border-color: #e8eaec;
        transition: all 0.2s ease-in-out;
        text-align: left;
        padding: 5px;
    }
    .research-container {
        width: 100%;
        margin-top: 10px;
        display: flex;
        .research-container-item  {
            width: 50%;
            float: left;
            .title {
                background: linear-gradient(to top, #d2effd, #ffffff);
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                text-align: center;
                width: 100px;
            }
        }
        .research-container-item {
            width: 49%;
            margin-right: 1%;
            float: left;
            .title {
                background: linear-gradient(to top, #d2effd, #ffffff);
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                text-align: center;
                width: 100px;
                height: 30px;
                line-height:30px
            }
        }
        .research-container-item2 {
            width: 49%;
            margin-left: 1%;
            .title {
                background: linear-gradient(to top, #d2effd, #ffffff);
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                text-align: center;
                width: 100px;
                height: 30px;
                line-height:30px
            }
        }
        .research-container-item3 {
            width: 100%;
            .title {
                background: linear-gradient(to top, #d2effd, #ffffff);
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                text-align: center;
                width: 100px;
                height: 30px;
                line-height:30px
            }
        }
    }
}
</style>