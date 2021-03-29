<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 14:47:20
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
                        <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
                        <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
                        <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
                        <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
                        <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
                        <!-- <Select v-model="sumAreaCode" style="width:250px" clearable filterable :label-in-value='true' @on-select="">
                            <Option v-for="item in areaList" :value="item.sumCode" :key="item.id">{{ item.sumName }}</Option>
                        </Select> -->
                        <Button type="primary" size="small" icon="ios-cloud-upload-outline" @click="downLoad" :loading="exportLoading" class="marginRight">导出</Button>
                        <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="formats" :max-size="10240000" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-progress="handleProgress"  :on-error="onError" :action="'//'+`${uploadUrl}`+'/api/ImportAliExpressOrder'" :headers="headers"  style="display: inline-block;width:50px; margin-right: 10px;">
                            <Button type="primary" size="small" icon="ios-cloud-download-outline" :loading="importLoading" class="marginRight">导入</Button>
                        </Upload>
                        <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
                    </div>
                    <div class="filter-search">
                        <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
                    </div>
                </div>    
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="goNewProduct(row.id)" v-if="row.isDeveloped!=1&&row.status==1">开发</Button>
                <!-- <Button type="warning" size="small" style="margin-right: 5px" @click="goApproval(row.id)" v-if="row.status==0">审核</Button> -->
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
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <UploadProgress :showProgress="showProgress" :percent="percentage"></UploadProgress>
</div>
</template>

<script>
import {
    Upload,
    Progress,
} from "view-design";
import UploadProgress from '@components/public/upload/uploadProgress';
import ModalForm from "@components/public/form/modalForm";
import config from "@views/sell/sellManager/sellConfig";
import list from "@mixins/list";
import tokenService from "@service/tokenService";
import {
    AliExpressOrderPage,
    ExportAliExpressOrder,
    DeleteAliExpressOrder
} from "@service/sellService";
import {
    TransportFormulaList
} from "@service/settingsService"

export default {
    name: "orderManagerList",
    components: {
        ModalForm,
        Upload,
        Progress,
        UploadProgress
    },
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            titleText2: '',
            showModel: false,
            showModel2: false,
            columns: this.getTableColumn(),
            data: [],
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            exportLoading:false,
            importLoading:false,
            formats:[],
            uploadUrl:'',
            headers:{},
            showProgress:false,
            percentage:0,
            sumAreaCode:'',
            areaList:[]
        }
    },
    methods: {
        AliExpressOrderPage() {
            this.pageData['status'] = -1;
            return new Promise((resolve, reject) => {
                AliExpressOrderPage(this.pageData).then(res => {
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
        save() {
            this.showPop(false);
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.AliExpressOrderPage();
        },
        refresh(){
            this.loading = true;
            this.pageData.skipCount=1;
            this.AliExpressOrderPage();
        },
        clearFormData2() {},
        goAdd(){
            // this.$router.push({name:'addFinishProduct'});
        },
        goEdit(){
            // if(this.activatedRow.id){
            //     this.$router.push({name:'editFinishProduct',query: {id:this.activatedRow.id}});
            // }
        },
        goDetail(id){
            if(id)
                this.$router.push({name:'viewOrder',query: {id:id}});
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            data.forEach(col => {
                for(var i=0;i<columns.length;i++){
                    if(columns[i].key&&(col == columns[i].key)){
                        datas.push(columns[i]);
                    }
                     if(columns[i].slot&&(col == columns[i].slot)){
                        datas.push(columns[i]);
                    }
                }
            });
            this.columns = datas;
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.AliExpressOrderPage();
        },
        getTableColumn(){
            var columns2 = [
            {
                type: 'index',
                width: 60,
                align: 'center',
                title: '序号',
                resizable: true,
            },
            {
                title: '订单号',
                key: 'orderCode',
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
                    },params.row.orderCode);//  展示的内容
                },
                width: 200,
                resizable: true,
            },
            {
                title: '仓库',
                key: 'warehouse',
                resizable: true,
                width: 100,
            },
            {
                title: '买家姓名',
                key: 'buyerName',
                width: 200,
                resizable: true,
            },
            {
                title: '国家/地区',
                key: 'country',
                resizable: true,
                width: 100
            },
            {
                title: '邮寄方式',
                key: 'shippingMethod',
                resizable: true,
                width: 150
            },
            {
                title:'城市',
                key: 'city',
                resizable: true,
                width: 148
            },
            {
                title: '产品金额',
                key: 'productPrice',
                width: 110,
                resizable: true,
            },
            {
                title: '产品金额币种',
                key: 'productCurrency',
                width: 120,
                resizable: true,
            },
            {
                title: '物流商',
                key: 'logisticsName',
                width: 100,
                resizable: true,
            },
            {
                title: '运费',
                key: 'freight',
                width: 80,
                resizable: true,
            },
            {
                title: '运费币种',
                key: 'freightCurrency',
                width: 100,
                resizable: true,
            },
            {
                title: '订单金额',
                key: 'orderAmount',
                resizable: true,
                width: 100,
            },
            {
                title: '订单金额币种',
                key: 'orderCurrency',
                resizable: true,
                width: 180,
            },
            {
                title: '实付金额',
                key: 'paidAmout',
                resizable: true,
                width: 100,
            },
            {
                title: '实付币别',
                key: 'paidCurrency',
                resizable: true,
                width: 180,
            },
            {
                title: '付款日期',
                key: 'paidDate',
                resizable: true,
                width: 180,
            },
            {
                title: '状态',
                key: 'orderStatus',
                resizable: true,
                width: 180,
            },
            {
                title: '包裹号',
                key: 'packageNumber',
                resizable: true,
                width: 180,
            },
            {
                title: '通途sku',
                key: 'tongtuSku',
                resizable: true,
                width: 180,
            },
            {
                title: '平台sku',
                key: 'platformSku',
                resizable: true,
                width: 180,
            },
            {
                title: '创建者',
                key: 'createdName',
                resizable: true,
                width: 80,
            },
            {
                title: '创建时间',
                key: 'createdOn',
                resizable: true,
                width: 180,
            },
            {
                title: '修改者',
                key: 'modifyName',
                resizable: true,
                width: 80,
            },
            {
                title: '修改时间',
                key: 'modifyOn',
                resizable: true,
                width: 180,
            },
        ];
            return columns2;
        },
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        sureDeleteConfirm(flag) {
            if(flag){
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '数据删除后将无法恢复！',
                    onCancel: () => {
                        this.$Message.info('取消');
                    },
                    onOk: () => {
                        flag ? this.deletesData() : this.deleteData();
                    },
                });
            } else {
                if(this.activatedRow.id&&this.activatedRow.status==0){
                    this.$Modal.confirm({
                        title: '温馨提示',
                        content: '数据删除后将无法恢复！',
                        onCancel: () => {
                            this.$Message.info('取消');
                        },
                        onOk: () => {
                            flag ? this.deletesData() : this.deleteData();
                        },
                    });
                } else {
                    this.$Message.error('温馨提示：该数据无法删除！');
                }   
            }
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DeleteAliExpressOrder({id:this.activatedRow.id}).then(res => {
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
                            this.AliExpressOrderPage();
                            this.activatedRow = {};
                            this.loading = false;
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.loading = false;
                        }
                    });
                });
            } 
        },
        setFilter(value){
            this.pageData['sumAreaCode'] = value.sumAreaCode;
            this.pageData.keyword=value;
            this.pageData.skipCount = 1;
            this.AliExpressOrderPage(); 
        },
        exportData(){
             this.$refs.selection.exportCsv({
                filename: 'Custom data',
                columns: this.columns,
                data: this.data,
            });    
        },
        handleSuccess(res, file) {
            if(res.result.code==200){
                this.$Notice.success({
                    title: '导入成功',
                    desc: ''
                });
                this.importLoading = false;
                this.AliExpressOrderPage();
                this.showProgress = false;
                this.percentage = 0;
            } else {
                this.$Notice.error({
                    title: '导入失败',
                    desc: res.result.msg
                });
                this.importLoading = false;    
            }
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '上传文件格式错误',
                desc: '文件 ' + file.name + '不是表格格式'
            });
            this.importLoading = false;
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件上传大小',
                desc: '文件  ' + file.name + '超过100M'
            });
            this.importLoading = false;
        },
        handleProgress(event, file, fileList){
            this.importLoading = true;
            event.target.onprogress = (event) => {
                let uploadPercent = parseFloat(((event.loaded / event.total) * 100).toFixed(2))
                this.showProgress = true
                this.percentage = uploadPercent
            }
        },
        onError(error, file, fileList){
            this.$Notice.error({
                title: '导入失败',
                desc: error
            });
            this.importLoading = false;
        },
        downLoad(){
            if(this.pageData['sumAreaCode']){
                this.exportLoading= true;
                return new Promise((resolve, reject) => {
                    ExportAliExpressOrder({sumAreaCode:this.pageData['sumAreaCode']}).then(res => {
                        const time = new Date().getTime();
                        const fileName = '订单管理' + "_" + time + ".xls";
                        const blob = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            // 兼容IE
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        } else {
                            // 兼容Google及fireFox
                            const link = document.createElement("a");
                            link.style.display = "none";
                            link.download = fileName;
                            link.href = URL.createObjectURL(blob);
                            document.body.appendChild(link);
                            link.click();
                            URL.revokeObjectURL(link.href); // 释放URL 对象
                            document.body.removeChild(link);
                            this.exportLoading=false;
                        }
                    }).catch(e=>{
                        this.$Message.error({
                            background: true,
                            content: '导出接口出错！'
                        });    
                    });
                });
            } else {
                this.$Message.error({
                    background: true,
                    content: '请选择筛选条件'
                });    
            }
        },
        dataURLtoBlob(base64Str) {
            var bstr = atob(base64Str),
            n = bstr.length,
            u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: "application/vnd.ms-excel" });
        },
        TransportFormulaList(){
            return new Promise((resolve, reject) => {
                TransportFormulaList().then(res => {
                    if(res.result.code==200){
                        this.areaList = res.result.item;
                    }
                });
            });
        }
    },
    created(){
        this.uploadUrl = this.$upload_url?this.$upload_url:'localhost:8080';
        this.headers['Utoken'] =  tokenService.getToken();
        this.baseUrl = this.$base_url;
        this.AliExpressOrderPage();
        this.TransportFormulaList();
    },
    activated() {
        if(this.data.length)
            this.AliExpressOrderPage();
    },
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
// .ivu-select-default.ivu-select-multiple .ivu-select-selection {
//     min-height: 24px;
//     height: 24px;
// }
</style>
