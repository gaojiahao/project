<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 14:32:03
-->
<template>
<div class="researchResultLog-container">
    <div>
        <Table border :columns="columns" :data="data" stripe>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
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
import config from "@views/basicinfo/productManager/productListConfig";

export default {
    name: "ResearchResultLog",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
            defaultImg: require("@assets/default/logo.png"),
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
                },
                {
                    title: '区域定价折扣',
                    key: 'areaPrice',
                    className: 'oranger-color',
                },
                {
                    title: '建议价格（USD）',
                    key: 'proposalPrice'
                },
                {
                    title: '浮动值',
                    key: 'floatNum',
                },
                {
                    title: '销售价（USD）',
                    key: 'sellPrice',
                    className: 'blue-color',
                },
                {
                    title: '操作时间',
                    key: 'datetime'
                },
                {
                    title: '操作员',
                    key: 'actioner'
                },
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
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
                datetime: '2020-11-16',
                actioner: '李四',
            }, ],
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

        }
    }
}
</script>

<style scoped>
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

>>>.ivu-table-cell {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
}
</style><style lang="less" scoped>
.researchResultLog-container {
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
