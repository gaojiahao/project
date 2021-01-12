<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 20:30:46
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" icon="md-refresh" @click="refresh">刷新</Button>
        </div>
        <div class="filter-search">
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
        </div>
    </div>
    <div>
        <Table border :columns="columns" :data="data" stripe ref="selection" :loading="loading" >
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="showPop(true)">选品</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="showPop(true)">审核</Button>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current=1 @on-change="changePage"></Page>
            </div>
        </div>
    </div>
    <SelectionModel :titleText="titleText" :formValidate="formValidate" :showModel='showModel' @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></SelectionModel>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible"></ImageModel>
</div>
</template>

<script>
import SelectionModel from "@components/sell/selectionManager/selectionModel";
import SeniorFilter from "@components/public/filter/seniorFilter";
import AutoCompleteSearch from "@components/public/search/autoCompleteSearch";
import ImageModel from "@components/public/model/imageModel";
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";

export default {
    name: "SelectionManagerList",
    components: {
        SelectionModel,
        SeniorFilter,
        AutoCompleteSearch,
        ImageModel
    },
    mixins: [config],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
            loading : false,
            showFilterModel:false,
            srcData:{},
            visible:false,
            columns: [
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
                    title: '产品名称',
                    key: 'productName',
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
                        },params.row.productName);//  展示的内容
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
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'success' : 'error';
                        const text = row.status === 1 ? '已选' : '未选';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
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
                    status: 1,
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
                    status: 1,
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
                    status: 0,
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
                    status: 1,
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
                    status: 1,
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
                    status: 1,
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
                    status: 1,
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
                    status: 1,
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
                    status: 1,
                }
            ],
            filter: "large",
            formValidate:{
                productNum:'商品1',
                productName:'商品名称',
                status:'',
                comment:''
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
                this.titleText = '是否选品';
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
        deleteData() {},
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
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>