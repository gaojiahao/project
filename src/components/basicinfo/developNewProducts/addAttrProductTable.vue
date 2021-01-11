<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 09:14:39
-->
<template>
<div class="addAttrProductTable-container">
    <div class="display:block;">
        <div style="margin-bottom: 10px; padding:10px"  v-for="(item,index) in data">
            <div style="position: relative;line-height: 32px;font-size: 14px;">
                <label style="text-align: right;vertical-align: middle;float: left;font-size: 14px;color: #515a6e;line-height: 1;padding: 10px 12px 10px 0;box-sizing: border-box;width: 120px;">{{ item.attributeName }}</label>
                <Select style="width:200px">
                    <Option v-for="(dItem,k) in item.valueList" :value="dItem.valueId" :key="dItem.valueId">{{ dItem.valueName }}</Option>
                </Select>
            </div>
        </div>
        <div style="margin-bottom: 10px; padding:10px;display: inline-block;">
            <div style="position: relative;line-height: 48px;font-size: 14px;margin-left:120px">
                <Button @click="clearFormData" style="float: right;">取消</Button>
                <Button type="primary" @click="save" style="float: right; margin-right:10px">保存</Button>
            </div>
        </div>
    </div>
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
            dataConfig: {
                'filterList': [{
                    name: '全部',
                    value: 'all',
                }, {
                    name: '已审核',
                    value: 'all',
                }, {
                    name: '待审核',
                    value: 'all',
                }]
            },
            formValue:{
                
            }
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
    }
}
</script>
<style lang="less" scoped>
.addAttrProductTable-container {
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
