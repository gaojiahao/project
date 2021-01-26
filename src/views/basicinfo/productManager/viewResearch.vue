<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-23 16:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-26 10:15:43
-->
<template>
<div class="viewResearch">
    <div class="top">
        <Divider orientation="left" size="small">商品信息</Divider>
        <div class="top_tabale">
            <div class="top-box">
                <div class="item">
                    <label>商品编号：</label>
                    <Input v-model="formData['code']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>商品名称：</label>
                    <Input v-model="formData['name']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>商品分类：</label>
                    <Input v-model="formData['categoryName']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>品牌：</label>
                    <Input v-model="formData['brandName']" :style="{width:'200px'}" disabled></Input>
                </div>
                <div class="item">
                    <label>是否带包装：</label>
                    <RadioGroup v-model="formData['isPackage']">
                        <Radio :label="true" disabled>
                            是
                        </Radio>
                        <Radio :label="false" disabled>
                            否
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
        </div>
    </div>
    <div class="research-container">
        <div class="research-container-item">
            <div class="title">
                销售比价
            </div>
            <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" height="300" @on-current-change="onCurrentChange">
            </Table> 
        </div>
        <div class="research-container-item2">
            <div class="title">
                开发比价
            </div>
            <Table border :loading="loading" highlight-row :columns="columns" :data="data2" stripe ref="selection" height="300" @on-current-change="onCurrentChange2">
            </Table> 
        </div>
    </div>
    <Card class="card-style">
        <div class="siggle-chart" id="myChart"></div>
    </Card>
    <div class="research-container">
        <div class="research-container-item3">
            <div style="height:30px">
                <div class="title" style="float:left">
                    审核价格
                </div>
                <div style="float:right">
                   <ButtonGroup size="small">
                        <Button>引用开发</Button>
                        <Button>引用销售</Button>
                        <Button>引用最低</Button>
                    </ButtonGroup>
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
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import {
    BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';
echarts.use(
    [DatasetComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]
);
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import { ButtonGroup } from "view-design";

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
                    proposalPrice:12,
                    profitMargin:14,
                    sellPrice: 16
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:20,
                    proposalPrice:22,
                    profitMargin:24,
                    sellPrice: 25
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:16,
                    proposalPrice:17,
                    profitMargin:18,
                    sellPrice: 18
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:11,
                    proposalPrice:12,
                    profitMargin:14,
                    sellPrice: 16
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:10,
                    proposalPrice:11,
                    profitMargin:12,
                    sellPrice: 13
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:11,
                    profitMargin:15,
                    sellPrice: 16
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:16,
                    proposalPrice:17,
                    profitMargin:18,
                    sellPrice: 18
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:12,
                    proposalPrice:13,
                    profitMargin:11,
                    sellPrice: 15
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:13,
                    proposalPrice:17,
                    profitMargin:18,
                    sellPrice: 20
                },
            ],
            data2: [
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:20,
                    profitMargin:20,
                    sellPrice: 10
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:9,
                    proposalPrice:12,
                    profitMargin:14,
                    sellPrice: 15
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:10,
                    proposalPrice:20,
                    profitMargin:16,
                    sellPrice: 18
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:11,
                    proposalPrice:13,
                    profitMargin:10,
                    sellPrice: 9
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:15,
                    proposalPrice:20,
                    profitMargin:23,
                    sellPrice: 24
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:13,
                    profitMargin:20,
                    sellPrice: 15
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:6,
                    proposalPrice:10,
                    profitMargin:11,
                    sellPrice: 12
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:9,
                    proposalPrice:14,
                    profitMargin:16,
                    sellPrice: 16
                },
                {
                    id:'fds',
                    destination: 'France',
                    logisticsMode: "深圳挂号",
                    basePirce:8,
                    proposalPrice:15,
                    profitMargin:15,
                    sellPrice: 17
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
                                    transfer:true
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
            ],
            Xdata:[],
            Ydata:[],
            buttonSize: '',
        }
    },
    components:{ButtonGroup},
    watch:{
        Ydata:{
            handler(val){
                this.drawLine();
            }
        },
        Xdata:{
            handler(val){
                this.drawLine();
            }
        }
    },
    methods:{
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPrepGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formData = {
                                id: res.result.item.id,
                                code:res.result.item.code,
                                name: res.result.item.name,
                                categoryName: res.result.item.categoryName,
                                brandName:res.result.item.brandName,
                                isPackage: res.result.item.isPackage,
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        drawLine(){
            var app = {};

            var chartDom = document.getElementById('myChart');
            var myChart = echarts.init(chartDom);
            var option;

            var posList = [
                'left', 'right', 'top', 'bottom',
                'inside',
                'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
            ];

            app.configParameters = {
                rotate: {
                    min: -90,
                    max: 90
                },
                align: {
                    options: {
                        left: 'left',
                        center: 'center',
                        right: 'right'
                    }
                },
                verticalAlign: {
                    options: {
                        top: 'top',
                        middle: 'middle',
                        bottom: 'bottom'
                    }
                },
                position: {
                    options: posList.reduce(function (map, pos) {
                        map[pos] = pos;
                        return map;
                    }, {})
                },
                distance: {
                    min: 0,
                    max: 100
                }
            };

            app.config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function () {
                    var labelOption = {
                        normal: {
                            rotate: app.config.rotate,
                            align: app.config.align,
                            verticalAlign: app.config.verticalAlign,
                            position: app.config.position,
                            distance: app.config.distance
                        }
                    };
                    myChart.setOption({
                        series: [{
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }]
                    });
                }
            };


            var labelOption = {
                show: true,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                    }
                }
            };

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['销售', '开发']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['保底价', '建议价', '利润率', '销售价']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '销售',
                        type: 'bar',
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.Xdata
                    },
                    {
                        name: '开发',
                        type: 'bar',
                        barGap: 0,
                        label: labelOption,
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.Ydata
                    },
                ]
            };
            option && myChart.setOption(option);
        },
        onCurrentChange(currentRow,oldCurrentRow){
            var obj = [];
            obj[0] = currentRow.basePirce;
            obj[1] = currentRow.proposalPrice;
            obj[2] = currentRow.profitMargin;
            obj[3] = currentRow.sellPrice;
            this.Xdata = obj; 
        },
        onCurrentChange2(currentRow,oldCurrentRow){
            var obj = [];
            obj[0] = currentRow.basePirce;
            obj[1] = currentRow.proposalPrice;
            obj[2] = currentRow.profitMargin;
            obj[3] = currentRow.sellPrice;
            this.Ydata = obj; 
        },
    },
    mounted(){
        this.drawLine();
    },
    created(){
        this.getFormData();
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
@import  "~@less/form.less";
.viewResearch{
    .top {
        // flex: 1;
        // background-color: #ffffff;
        // border: 1px solid #dcdee2;
        // border-color: #e8eaec;
        // transition: all 0.2s ease-in-out;
        // padding: 5px;

        .top-box {
            width: 100%;
            height: 55px;
            padding: 10px;
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
    background: #ffffff;
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
            background: #ffffff;
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
            background: #ffffff;
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
            background: #ffffff;
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
            background: #ffffff;
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
    .card-style {
    height: 600px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    }
    .siggle-chart {
    width: 1100px;
    height: 520px;
    margin: auto;
    }
}
</style>