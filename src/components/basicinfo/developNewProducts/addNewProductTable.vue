<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-12 14:12:25
-->
<template>
<div class="addNewProductTable-container">
    <div>
        <Table border :columns="columns" :data="data" :loading="loading" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)">参考比价</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageData.totalPagePruch" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange"></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm";
import config from "@views/basicinfo/productManager/productListConfig";

export default {
    name: "AddNewProductTable",
    components: {
        ModalForm,
    },
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
            titleText: '',
            showModel: false,
            defaultImg: require("@assets/default/logo.png"),
            columns: [{
                    title: '供应商名称',
                    key: 'supplierName'
                },
                {
                    title: '最小采购量',
                    key: 'minQuantity'
                },
                {
                    title: '采购单价',
                    key: 'purchasePrices'
                },
                {
                    title: '链接地址',
                    key: 'url'
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
        }
    },
    methods: {
        clearFormData() {

        },
        showPop(flag, row) {
            
        },
        save() {

        },
        changePage(page){
            this.$emit('change-page',page);
        },
        onPageSizeChange(pagesize){
            this.$emit('on-page-size-change',pagesize);
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
