<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 19:22:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-27 12:22:59
-->
<template>
<div>
    <div style="    width: 200px;text-align: left;">表格统计</div>
    <div></div>
    <Table border :columns="columns1" :data="data1" :row-class-name="rowClassName"></Table>
</div>
</template>

<script>
import {
    Table
} from "view-design";
export default {
    name: 'XTable',
    components: {
        Table,
    },
    data() {
        return {
            columns1: [{
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [{
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
        }
    },
    methods: {
        // rowClassName(row, index) {
        //     console.log(index % 2)
        //     if (index % 2 == 0) {
        //         return 'demo-table-info-row';
        //     }
        // },
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
</style>
