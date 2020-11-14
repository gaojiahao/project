<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:19:51
-->
<template>
<div class="storeManager-container">
    <div class="head">
        <div class="select-type">
            渠道：
            <Button type="primary">亚马逊</Button>
            <Button type="primary" ghost>速卖通</Button>
            <Button type="primary" ghost>eBay</Button>
        </div>
    </div>
    <div class="filter">
        <div class="filter-button">
            <RadioGroup v-model="filter" type="button">
                <Radio label="large">全部</Radio>
                <Radio label="default">已启用</Radio>
                <Radio label="small">已停用</Radio>
            </RadioGroup>
        </div>
        <div class="filter-search">
            关键词：
            <Input placeholder="关键词" style="width: 200px" />
            创建时间：
            <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker>
            <Button type="primary" icon="ios-search">搜索</Button>
        </div>
    </div>
    <div>
        <Table border :columns="columns" :data="data" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)">编辑</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
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
import ModalForm from "@components/public/form/modalForm";
import config from "@views/settings/storeManager/storeManagerConfig";

export default {
    name: "StoreList",
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
