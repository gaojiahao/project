<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 14:42:28
-->
<template>
<div class="researchResultLog-container">
    <div>
        <Table border :columns="columns" :data="data" stripe>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
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
    name: "HistroyPriceComparison",
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
                    title: '参考价',
                    key: 'referencePrice'
                },
                {
                    title: '参考利润',
                    key: 'referenceProfit',
                },
                {
                    title: '参考网址',
                    key: 'referenceUrl',
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
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
                datetime: '2020-11-16',
                actioner: '李四',
            }, {
                referencePrice: 10.55,
                referenceProfit: 15,
                referenceUrl: 'www.baidu.com',
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
