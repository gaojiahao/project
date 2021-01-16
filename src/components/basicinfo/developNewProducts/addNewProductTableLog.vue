<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 17:56:15
-->
<template>
<div class="addNewProductTable-container">
    <div>
        <Table border :columns="columns" :data="data" :loading="loading" stripe>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageData.totalPagePruch" :transfer="true" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/basicinfo/productManager/productListConfig";

export default {
    name: "AddNewProductTableLog",
    props:{
        data: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type: Boolean,
            default: true,
        },
        pageData:{
            type: Object,
            default () {
                return {}
            }
        },
    },
    mixins: [config],
    data() {
        return {
            columns: [{
                    title: '操作动作',
                    key: 'behavior'
                },
                {
                    title: '操作人',
                    key: 'createdBy'
                },
                {
                    title: '操作时间',
                    key: 'createdOn'
                },
            ],
        }
    },
    methods: {
        changePage(page){
            this.$emit('change-page-log',page);
        },
        onPageSizeChange(pagesize){
            this.$emit('on-page-size-change-log',pagesize);
        },
    }
}
</script>

<style lang="less" scoped>
.addNewProductTable-container {
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
