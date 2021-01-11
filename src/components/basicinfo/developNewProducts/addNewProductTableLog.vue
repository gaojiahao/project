<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-10 20:31:22
-->
<template>
<div class="addNewProductTable-container">
    <div>
        <Table border :columns="columns" :data="data" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)">参考比价</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
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
    name: "AddNewProductTableLog",
    components: {
        ModalForm,
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
            defaultImg: require("@assets/default/logo.png"),
            columns: [{
                    title: '操作动作',
                    key: 'name'
                },
                {
                    title: '操作人',
                    key: 'code'
                },
                {
                    title: '操作时间',
                    key: 'supplier'
                },
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
            data: [{
                name: '上传商品图',
                code: '李四',
                supplier: "2020-05-21",
            }, {
                name: '上传商品图',
                code: '李四',
                supplier: "2020-05-21",
            }, {
                name: '上传商品图',
                code: '李四',
                supplier: "2020-05-21",
            }],
            filter: "large"
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
