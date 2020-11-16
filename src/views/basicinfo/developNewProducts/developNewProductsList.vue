<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-14 13:11:15
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add">添加商品</Button>
            <Button type="primary" size="small" icon="md-refresh" @click="refresh">刷新</Button>
            <Button type="primary" size="small" icon="ios-create-outline" @click="refresh">编辑</Button>
            <Button type="primary" size="small" icon="ios-close" @click="deleteData">删除</Button>
        </div>
        <div class="filter-search">
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)">高级筛选</Button>
            <Input placeholder="关键词" style="width: 200px" />
            <Button size="small" type="primary">搜索</Button>
        </div>
    </div>
    <div>
        <Table border :columns="columns" :data="data" stripe ref="selection">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true)">开发</Button>
                <Button type="info" size="small" style="margin-right: 5px" @click="showPop2(true)">审核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="showPop(true)">调研</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>

    <SeniorFilter :formValidate="formValidate" :ruleValidate="ruleValidate" :showFilterModel='showFilterModel' :formConfig="formConfig" @setFilter="setFilter" @show-filter="showFilter"></SeniorFilter>
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
import SeniorFilter from "@components/public/filter/seniorFilter";
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";

export default {
    name: "DevelopNewProductsList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ModalForm,
        SeniorFilter
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
            showFilterModel: false,
            columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '图片',
                    key: 'img',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                attrs: {
                                    src: params.img || require("@assets/default/logo.png")
                                },
                                style: {
                                    width: '40px',
                                    height: '40px'
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '分类',
                    key: 'type'
                },
                {
                    title: 'SKU',
                    key: 'sku'
                },
                {
                    title: '颜色',
                    key: 'color'
                },
                {
                    title: '产品名称',
                    key: 'productName'
                },
                {
                    title: '厂商',
                    key: 'supplier'
                },
                {
                    title: '厂商货号',
                    key: 'supplierNum'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width: 100
                },
                {
                    title: '推荐人员',
                    key: 'recommendingOfficer',
                    width: 100
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 100
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 300
                }
            ],
            data: [{
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                }, {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                }, {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                },
                {
                    img: '',
                    type: '玩具',
                    sku: 'PD00026',
                    color: "蓝色",
                    productName: "积木",
                    supplier: "厂商1",
                    supplierNum: "0001",
                    createTime: "2020-11-06",
                    recommendingOfficer: '李四',
                    status: "接受",
                }
            ],
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
                this.titleText = '开发';
            }
            this.showModel = flag;
        },
        showPop2(flag, row) {
            if (row && row.id) {
                this.formValidate2['id'] = row.id;
                this.titleText2 = '编辑';
            } else {
                this.titleText2 = '审核';
            }
            this.showModel2 = flag;
        },
        save() {

        },
        changePage() {

        },
        clearFormData2() {},
        setFilter() {},
        showFilter(flag) {
            this.showFilterModel = flag;
        },
        refresh() {

        },
        deleteData() {}
    }
}
</script>

<style scoped>
>>>.ivu-input {
    height: 26px;
}

>>>.ivu-btn-small span {
    font-size: 12px;
}
</style><style lang="less" scoped>
.storeManager-container {
    margin-top: 16px;

    .head {
        height: 30px;

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
