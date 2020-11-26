<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 18:42:18
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            
        </div>
        <div class="filter-search">
             <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
        </div>
    </div>
    <div>
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)" v-if="row.status='未派'">审核</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="goResearch(row)" v-else-if="row.status='已派'">查看</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
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
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import ImageModel from "@components/public/model/imageModel";
import config from "@views/basicinfo/productManager/productListConfig";

export default {
    name: "AppointStoreExamineList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        ModalForm,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            showModel: false,
            defaultImg: require("@assets/default/logo.png"),
            loading : true,
            showFilterModel:false,
            srcData:{},
            visible:false,
            columns: [{
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
                                },
                                on: {
                                    click:()=>{
                                        this.srcData = {
                                            imgName: '图片预览',
                                            src: params.img || require("@assets/default/logo.png")
                                        }
                                        this.visible = true;
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '名称',
                    key: 'name',
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        on:{
                            click:()=>{// 这里给了他一个打印事件，下面有展示图
                                this.goDetail(params.row.id)    
                            }
                        }
                        },params.row.name);//  展示的内容
                    }
                },
                {
                    title: '商品编号',
                    key: 'code'
                },
                {
                    title: '供应商',
                    key: 'supplier'
                },
                {
                    title: '开发人员',
                    key: 'developer'
                },
                {
                    title: '分类',
                    key: 'type'
                },
                {
                    title: '特性标签',
                    key: 'label'
                },
                {
                    title: '包装材料',
                    key: 'packingMaterial'
                },
                {
                    title: '平均成本',
                    key: 'averageCost'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: params.row.status=='已派' ? "#19be6b": "#ed4014"
                        },
                        },params.row.status);//  展示的内容
                    }
                }, 
                {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width:200
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
            data: [{
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已派",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "未派",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已派",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已派",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已派",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已派",
                createTime: "2020-11-06",
            }, {
                img: "",
                name: '积木',
                code: 'XFDSFDF1',
                supplier: "供应商1",
                developer: "李四",
                type: "玩具类",
                label: "普货",
                packingMaterial: '顺丰袋45*45',
                averageCost: '￥126.66',
                status: "已派",
                createTime: "2020-11-06",
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

        },
        goResearch(row){
            this.$router.push({path:'/sell/mainResearch/researchResult/researchResultList',query: {id:row.id||123}})
        },
        refresh() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        showFilter(flag) {
            this.showFilterModel = flag;
        },
        setFilter() {},
    },
    created(){
        setTimeout(() => {
            this.loading = false;
        }, 1000);
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
    // margin-top: 16px;

    .head {
        height: 30px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 30px;
        ;

        .filter-button {
            float: left;
            .marginRight{
                margin-right: 10px;
            }
        }

        .filter-search {
            float: right;
            display: flex;
            .marginRight{
                margin-right: 10px;
            }
        }
    }
}
</style>
