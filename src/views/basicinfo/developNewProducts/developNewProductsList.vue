<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-09 17:17:47
-->
<template>
<div class="developNewProductsList-container">
    <div class="myTable">
        <Table border :loading="loading" height="695" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
                        <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
                        <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
                        <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
                        <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
                        <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
                        <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
                    </div>
                    <div class="filter-search">
                        <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
                    </div>
                </div>    
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="warning" size="small" style="margin-right: 5px" @click="showResearchModel()">调研</Button>
            </template>
            <template slot="footer">
                <div class="footer_page">
                    <div class="footer_page_right">
                        <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </template>
        </Table>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible" @show-image-model="showImageModel"></ImageModel>
</div>
</template>

<script>
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";
import list from "@mixins/list";
import {
    GetPrepGoodsPage,
    DelPrepGoods
} from "@service/basicinfoService"

export default {
    name: "DevelopNewProductsList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
            showResearh: false,
            columns: this.getTableColumn(),
            data: [
                // {
                //     id:'fds',
                //     img: '',
                //     type: '玩具',
                //     sku: 'PD00026',
                //     color: "蓝色",
                //     productName: "积木",
                //     supplier: "厂商1",
                //     supplierNum: "0001",
                //     createTime: "2020-11-06",
                //     recommendingOfficer: '李四',
                //     status: "接受",
                //     modifyTime:"2020-11-06",
                //     modifyer:"李四",
                //     creater:"王五"
                // },
                // {
                //     id:1,
                //     img: '',
                //     type: '玩具',
                //     sku: 'PD00026',
                //     color: "蓝色",
                //     productName: "积木",
                //     supplier: "厂商1",
                //     supplierNum: "0001",
                //     createTime: "2020-11-06",
                //     recommendingOfficer: '李四',
                //     status: "不接受",
                //     modifyTime:"2020-11-06",
                //     modifyer:"李四",
                //     creater:"王五"
                // },
                // {
                //     id:2,
                //     img: '',
                //     type: '玩具',
                //     sku: 'PD00026',
                //     color: "蓝色",
                //     productName: "积木",
                //     supplier: "厂商1",
                //     supplierNum: "0001",
                //     createTime: "2020-11-06",
                //     recommendingOfficer: '李四',
                //     status: "接受",
                //     modifyTime:"2020-11-06",
                //     modifyer:"李四",
                //     creater:"王五"
                // },
                // {
                //     id:3,
                //     img: '',
                //     type: '玩具',
                //     sku: 'PD00026',
                //     color: "蓝色",
                //     productName: "积木",
                //     supplier: "厂商1",
                //     supplierNum: "0001",
                //     createTime: "2020-11-06",
                //     recommendingOfficer: '李四',
                //     status: "接受",
                //     modifyTime:"2020-11-06",
                //     modifyer:"李四",
                //     creater:"王五"
                // },
                // {
                //     id:4,
                //     img: '',
                //     type: '玩具',
                //     sku: 'PD00026',
                //     color: "蓝色",
                //     productName: "积木",
                //     supplier: "厂商1",
                //     supplierNum: "0001",
                //     createTime: "2020-11-06",
                //     recommendingOfficer: '李四',
                //     status: "接受",
                //     modifyTime:"2020-11-06",
                //     modifyer:"李四",
                //     creater:"王五"
                // }, 
                // {
                //     id:5,
                //     img: '',
                //     type: '玩具',
                //     sku: 'PD00026',
                //     color: "蓝色",
                //     productName: "积木",
                //     supplier: "厂商1",
                //     supplierNum: "0001",
                //     createTime: "2020-11-06",
                //     recommendingOfficer: '李四',
                //     status: "接受",
                //     modifyTime:"2020-11-06",
                //     modifyer:"李四",
                //     creater:"王五"
                // },
            ],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
        }
    },
    methods: {
        GetPrepGoodsPage() {
            return new Promise((resolve, reject) => {
                GetPrepGoodsPage(this.pageData).then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.totalPage = res.result.item.totalCount;
                            this.data = res.result.item.items;
                            this.loading = false;
                        });
                    }
                });
            });
        },
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
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetPrepGoodsPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.GetPrepGoodsPage();
        },
        clearFormData2() {},
        goAdd(){
            this.$router.push({name:'AddNewProduct'});
        },
        goEdit(){
            if(this.activatedRow.id){
                this.$router.push({name:'editNewProduct',query: {id:this.activatedRow.id}});
            }
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'ViewNewProduct',query: {id:id}});
        },
        showResearchModel(flag){
            this.$router.push({name:'ResearchDevelopNewProducts'}); 
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            data.forEach(col => {
                for(var i=0;i<columns.length;i++){
                    if(col == columns[i].key){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetPrepGoodsPage();
        },
        getTableColumn(){
            var columns2 = [
            {
                type: 'index',
                width: 80,
                align: 'center',
                title: '序号'
            },
            {
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
                                width: '30px',
                                height: '30px'
                            },
                            on: {
                                click:()=>{
                                    this.srcData = {
                                        imgName: '图片预览',
                                        src: params.img || require("@assets/default/logo.png")
                                    }
                                    this.showImageModel(true);
                                }
                            }
                        }),
                    ]);
                }
            },
            {
                title: '产品编号',
                key: 'code'
            },
            {
                title: '产品名称',
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
                title: '分类',
                key: 'categoryId'
            },
            {
                title:'商户ID',
                key: 'merchantId'
            },
            {
                title:'平台名称',
                key: 'platformName'
            },
            {
                title:'门店ID',
                key: 'storeId'
            },
            {
                title:'品牌名称',
                key: 'brandName'
            },
            {
                title: '状态',
                key: 'status',
                render: (h, params) => {
                    return h("span", {
                    style: {
                        display: "inline-block",
                        color: params.row.status=='接受' ? "#19be6b": "#ed4014"
                    },
                    },params.row.status);
                }
            },
            {
                title: '创建时间',
                key: 'createdOn',
            },
            {
                title: '创建者',
                key: 'createdBy',
            },
            {
                title: '修改时间',
                key: 'modifyOn',
            },
            {
                title: '修改者',
                key: 'modifyBy',
            },
            {
                title: '操作',
                slot: 'action',
                align: 'center',
                width: 150
            }
        ];
            return columns2;
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelPrepGoods({id:this.activatedRow.id}).then(res => {
                        if (res.result.code == 200) {
                            for(var i=0;i<this.selectedList.length;i++){
                                for(var j=0;j<this.data.length;j++){
                                    if(this.selectedList[i].id==this.data[j].id){
                                        this.data.splice(j, 1);   
                                    }
                                }
                            }
                            this.$Message.info('温馨提示：删除成功！');
                            if(this.data.length<1){
                                this.pageData.skipCount-1;
                            }
                            this.GetPrepGoodsPage();
                            this.activatedRow = {};
                            this.loading = false;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
                            });
                            this.loading = false;
                        }
                    });
                });
            } 
        },
        setFilter(value){
            this.pageData = {
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:value,
                pageSizeOpts:[15,50,200],
            },
            this.GetPrepGoodsPage(); 
        }
        
    },
    created(){
        this.GetPrepGoodsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
