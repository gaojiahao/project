<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:19:33
-->
<template>
<router-view></router-view>
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
import ModalForm from "@components/public/form/modalForm";
import config from "@views/settings/storeManager/storeManagerConfig";

export default {
    name: "StoreManager",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ModalForm,
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '店铺名称',
                    key: 'storeName'
                },
                {
                    title: '负责人',
                    key: 'name'
                },
                {
                    title: '店铺代码',
                    key: 'storeCode'
                },
                {
                    title: '账号名称',
                    key: 'account'
                },
                {
                    title: 'LoginID',
                    key: 'LoginID'
                },
                {
                    title: 'appKey',
                    key: 'appKey'
                },
                {
                    title: 'appSecret',
                    key: 'appSecret'
                },
                {
                    title: '状态',
                    key: 'status'
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            dataConfig: {
                'filterList': [{
                    name: '待上架',
                    value: 'all',
                }, {
                    name: '预期',
                    value: 'all',
                }, {
                    name: '已上架',
                    value: 'all',
                }]
            },
            data: [{
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, {
                storeName: '亚马孙积木',
                name: '婉儿',
                storeCode: 'XFDSFDF1',
                account: "12321312",
                LoginID: "dsfdsf",
                appKey: "fdsfsd",
                appSecret: "fdsfsdf",
                status: "已启用",
                createTime: "2020-11-06",
            }, ],
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
                this.titleText = '新建';
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
.storeManager-container {
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
