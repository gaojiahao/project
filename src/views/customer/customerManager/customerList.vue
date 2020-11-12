<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-12 16:40:10
-->
<template>
<div class="storeManager-container">
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
            <Button type="primary" icon="md-add">添加</Button>
        </div>
    </div>
    <div>
        <Table border :columns="columns" :data="data" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="ios-search-outline" size="small" style="margin-right: 5px" @click="showPop(true)">查看</Button>
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
import config from "@views/customer/supplierManager/supplierListConfig";

export default {
    name: "CustomerList",
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
                    title: '客户编号',
                    key: 'storeName'
                },
                {
                    title: '客户名称',
                    key: 'name'
                },
                {
                    title: '联系电话',
                    key: 'storeCode'
                },
                {
                    title: '联系人',
                    key: 'account'
                },
                {
                    title: '地址',
                    key: 'LoginID'
                },
                {
                    title: 'email',
                    key: 'appKey'
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
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, {
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
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
