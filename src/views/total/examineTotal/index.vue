<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-02-20 11:04:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-20 17:51:09
-->
<template>
    <div class="total">
        <Row>
            <Col span="4">
                <Card style="margin:0 10px 10px 0">
                    <div>请选择时间段</div>
                    <div>
                        <Row>
                            <CheckboxGroup v-model="selectTime" @on-change="onChangeTime">
                                <template v-for="(item,index) in timeData">
                                    <Col span="24">
                                        <Checkbox :label="item.value">{{item.name}}</Checkbox>
                                    </Col>
                                </template>
                            </CheckboxGroup>
                        </Row>
                    </div>    
                </Card>
                <Card style="margin:0 10px 10px 0">
                    <div>请选择状态</div>
                    <div>
                        <Row>
                            <CheckboxGroup v-model="selectType" @on-change="onChangeType">
                                <template v-for="(item,index) in typeData">
                                    <Col span="24">
                                        <Checkbox :label="item.value">{{item.name}}</Checkbox>
                                    </Col>
                                </template>
                                <Col span="24">
                                    <!-- <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox> -->
                                    <Button size="small" type="primary">生成</Button>
                                </Col>
                            </CheckboxGroup>
                        </Row>
                    </div>    
                </Card>
            </Col>
            <Col span="20">
                <Card style="margin:0 0 10px 0">
                    <RadioGroup v-model="filter" type="button" size="small">
                        <Radio label="line">折线图</Radio>
                        <!-- <Radio label="bigLine">大面积折线图</Radio> -->
                        <Radio label="bar">柱状图</Radio>
                        <Radio label="pie">饼图</Radio>
                    </RadioGroup>
                    <template v-if="filter=='line'">
                        <LineChart></LineChart>
                        <Divider></Divider>
                    </template>
                    <template v-else-if="filter=='pie'">
                        <PieChart></PieChart>
                        <Divider></Divider>
                    </template>
                    <template v-else-if="filter=='bigLine'">
                        <MonthLineChart></MonthLineChart>
                        <Divider></Divider>
                    </template>
                    <template v-else-if="filter=='bar'">
                        <BarChart></BarChart>
                    </template>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import {
    Row,
    Col
} from "view-design";
import LineChart from "@components/total/lineChart";
import MonthLineChart from "@components/total/monthLineChart";
import PieChart from "@components/total/pieChart";
import BarChart from "@components/total/barChart";
import { ButtonGroup } from "view-design";

export default {
    name:"ExamineTotal",
    data() {
        return {
            timeData:[
                {
                    name:'近三天',
                    value:'threeDays'
                },
                {
                    name:'本周',
                    value:'week'
                },
                {
                    name:'本月',
                    value:'month'
                },
                {
                    name:'近三个月',
                    value:'threeMonths'
                },
                {
                    name:'近六个月',
                    value:'sixMonths'
                },
                {
                    name:'本年',
                    value:'year'
                }
            ],
            typeData:[
                {
                    name:'所有',
                    value:'all',
                },
                {
                    name:'已开发',
                    value:'1'
                },
                {
                    name:'未开发',
                    value:'0'
                },
                {
                    name:'审核中',
                    value:'2'
                }
            ],
            selectTime:[],
            selectType:[],
            indeterminate: false,
            checkAll: false,
            checkAllGroup: [],
            filter:'line'
        }
    },
    components:{ButtonGroup,Row,Col,LineChart,PieChart,MonthLineChart,BarChart},
    methods:{
        onChangeTime(data) {
            if (data.length > 1) {
                this.selectTime = [];
                let i=String(data.length-1);
                this.selectTime = [data[i]];
            }
        },
        onChangeType(data){
            if (data.length > 1) {
                this.selectType = [];
                let i=String(data.length-1);
                this.selectType = [data[i]];
            }    
        },
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;
            if (this.checkAll) {
                this.typeData.forEach(col => {
                    this.checkAllGroup.push(col.value);
                });
            } else {
                this.checkAllGroup = [];
            }
        }, 
    },
}
</script>
<style lang="less" scoped>
@import  "~@less/form.less";
.total{
    .top {
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