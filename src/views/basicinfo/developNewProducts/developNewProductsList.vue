<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-08 12:18:44
-->
<template>
<div class="erp_table_container">
    <div class="myTable">
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">新建</Button>
                        <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
                        <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
                        <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
                        <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
                        <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
                        <Button type="warning" size="small" @click="goCopy" class="marginRight"><Icon type="ios-copy-outline"></Icon>复制</Button>
                        <Button type="primary" size="small" @click="downLoad" :loading="exportLoading" class="marginRight"><Icon type="ios-cloud-upload-outline"></Icon>导出</Button>
                        <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="formats" :max-size="10240000" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-progress="handleProgress"  :on-error="onError" :action="'//'+`${uploadUrl}`+'/api/ImportPrepGoods'" :headers="headers"  style="display: inline-block;width:50px; margin-right: 10px;">
                            <Button type="primary" size="small" :loading="importLoading" class="marginRight"><Icon type="ios-cloud-download-outline"></Icon>导入</Button>
                        </Upload>
                        <a type="primary" size="small" :href="baseUrl + 'File/excel/Template.xlsx'" target="_blank" class="marginRight"><Icon type="ios-cloud-download"></Icon>导入模板下载</a>
                        <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
                    </div>
                    <div class="filter-search">
                        <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
                    </div>
                </div>    
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <!-- <Button type="info" size="small" style="margin-right: 5px" @click="goTortExamine(row)" v-if="row.saleStatus==0">审核</Button> -->
                <Button type="warning" size="small" style="margin-right: 5px" @click="showResearchModel(row)">调研</Button>
            </template>
            <template slot="footer">
                <div class="footer_page">
                    <Button size="small" style="margin-right: 5px" @click.native="openMult">多选</Button>
                    <Button size="small" style="margin-right: 5px" @click.native="exportData(true)" v-if="isMult&&selectedList.length">导出</Button>
                    <Button size="small" style="margin-right: 5px" @click.native="sureDeleteConfirm(true)" v-if="isMult&&selectedList.length">删除</Button>
                    <div class="footer_page_right">
                        <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </template>
        </Table>
    </div>
    <!-- <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm> -->
    <SeniorFilter :showFilterModel='showFilterModel' :formConfig="filtersConfig" @set-filter="setFilter" @show-filter="showFilter"></SeniorFilter>
    <ImageModel :srcData="srcData" :visible="visible" @show-image-model="showImageModel"></ImageModel>
    <UploadProgress :showProgress="showProgress" :percent="percentage"></UploadProgress>
</div>
</template>

<script>
import {
    Upload,
    Progress,
} from "view-design";
import UploadProgress from '@components/public/upload/uploadProgress';
import config from "@views/basicinfo/developNewProducts/addNewProductConfig";
import list from "@mixins/list";
import {
    GetPrepGoodsPage,
    DelPrepGoods,
    GetPrepGoodsList,
    ExportPrepGoods,
    BatchDelPrepGoods
} from "@service/basicinfoService";
import table2excel from 'js-table2excel';
import tokenService from "@service/tokenService";

export default {
    name: "DevelopNewProductsList",
    components: {
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
            showResearh: false,
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
            newsList:[],
	        pageNum:1,
	        pageSize:3,
            formats:['xlsx'],
            uploadUrl:'',
            headers:{},
            showProgress:false,
            percentage:0
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
                            this.selectedList = [];
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
            if(this.activatedRow.id&&this.activatedRow.status==0){
                this.$router.push({name:'editNewProduct',query: {id:this.activatedRow.id}});
            }
        },
        goCopy(){
            if(this.activatedRow.id){
                this.$router.push({name:'copyNewProduct',query: {id:this.activatedRow.id}});
            }
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'ViewNewProduct',query: {id:id}});
        },
        goTortExamine(row) {
            this.$router.push({name:'examineNewProduct',query: {id:row.id}});    
        },
        showResearchModel(row){
            this.$router.push({name:'ResearchDevelopNewProducts',query: {id:row.id}}); 
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
            this.GetPrepGoodsPage();
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
                    title: '图片',
                    key: 'img',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', 
                        [
                            h('Poptip',{
                                props: {
                                    trigger:'hover',
                                    content:"content",
                                    placement:"right",
                                    transfer:true,
                                },
                            },[
                                h('img', {
                                    attrs: {
                                        src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                    },
                                    style: {
                                        width: '30px',
                                        height: '30px'
                                    },
                                    on: {
                                        click:()=>{
                                            this.srcData = {
                                                imgName: '图片预览',
                                                src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                            }
                                            this.showImageModel(true);
                                        }
                                    }
                                }),
                                h('img',{
                                    slot:"content",
                                    attrs: {
                                        src: (params.row.imgOne ?this.$base_url+params.row.imgOne:'') || require("@assets/default/logo.png")
                                    },
                                    style: {
                                        width: '300px',
                                        height: '300px'
                                    },
                                    class:'api'
                                })
                            ])    
                        ]);
                    },
                    width: 80,
                    resizable: true,
                },
                {
                    title: '产品编码',
                    key: 'code',
                    resizable: true,
                    width: 220,
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
                    },
                    width: 220,
                    resizable: true,
                },
                {
                    title: '类目',
                    key: 'categoryName',
                    resizable: true,
                    width: 120,
                },
                {
                    title:'品牌名称',
                    key: 'brandName',
                    resizable: true,
                    width: 138,
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: params.row.status==1 ? "#19be6b": "#ed4014"
                        },
                        },params.row.status?"已审核":"未审核");
                    },
                    resizable: true,
                    width: 100,
                },
                {
                    title: '销售状态',
                    key: 'saleStatus',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: params.row.saleStatus==1 ? "#19be6b":  params.row.saleStatus==2 ?"#ed4014" : "#ff9900"
                        },
                        },params.row.saleStatus==1 ? "通过": params.row.saleStatus==2 ? "未通过" : "未审核");
                    },
                    resizable: true,
                    width: 110,
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
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 150,
                    resizable: true,
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
                                content: res.result.msg
                            });
                            this.loading = false;
                        }
                    });
                });
            } 
        },
        setFilter(value){
            this.pageData.keyword = value
            this.GetPrepGoodsPage(); 
        },
        exportData(flag){
            if(flag){
                var columns = this.getTableColumn();
                columns.map((e,index)=>{
                    if(e['title']=="序号"){
                        e['key']='index'
                    }
                    if(e['key']=='img'){
                        e['type'] = 'image';
                    } else {
                        e['type'] = 'text';
                    }
                    return e;
                });
                var data = this.selectedList.map((e,index)=>{
                    e['index'] = index;
                    e['img'] = 'https://avatar.csdnimg.cn/9/8/3/2_xiaoxiaojie12321.jpg';
                    e['status'] = e.statusName;
                    e['saleStatus'] = e.saleStatusName;
                    return e;
                });
                table2excel(columns, data, "新品开发"+new Date().getTime()+".xls");        
            } else {
                this.exportLoading = true;
                return new Promise((resolve, reject) => {
                    GetPrepGoodsList().then(res => {
                        if(res.result.code==200){
                            var columns = this.getTableColumn();
                            columns.map((e,index)=>{
                                if(e['title']=="序号"){
                                    e['key']='index'
                                }
                                if(e['key']=='img'){
                                    e['type'] = 'image';
                                } else {
                                    e['type'] = 'text';
                                }
                                return e;
                            });
                            var data = res.result.item.map((e,index)=>{
                                e['index'] = index;
                                e['img'] = 'https://avatar.csdnimg.cn/9/8/3/2_xiaoxiaojie12321.jpg';
                                e['status'] = e.statusName;
                                e['saleStatus'] = e.saleStatusName;
                                return e;
                            });
                            table2excel(columns, data, "新品开发"+new Date().getTime()+".xls");
                            this.exportLoading=false;
                        }
                    });
                });
            }
        },
        handleSuccess(res, file) {
            if(res.result.code==200){
                this.$Notice.success({
                    title: '导入成功',
                    desc: ''
                });
                this.importLoading = false;
                this.GetPrepGoodsPage();
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
            debugger
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
            this.exportLoading= true;
            return new Promise((resolve, reject) => {
                ExportPrepGoods().then(res => {
                    if (res.result.code == 200) {
                        var blob = this.dataURLtoBlob(res.result.item);
                        var downloadUrl = window.URL.createObjectURL(blob);
                        var anchor = document.createElement("a");
                        anchor.href = downloadUrl;
                        anchor.setAttribute("download", '新品开发'+new Date().getTime()+'.xls');
                        this.exportLoading=false;
                        // anchor.download = decodeURI("");
                        anchor.click();
                    } else {
                        this.$Message.error({
                            background: true,
                            content: res.result.msg
                        });
                        this.exportLoading=false;
                    }
                });
            });  
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
        deletesData(){
            var data = [];
            for(var i=0;i<this.selectedList.length;i++){
                data.push(this.selectedList[i]['id']);
            }
            data = data.toString();
            this.loading = true;
                return new Promise((resolve, reject) => {
                    BatchDelPrepGoods({IdList:data}).then(res => {
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
                        } else {
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
    created(){
        this.uploadUrl = this.$upload_url?this.$upload_url:'localhost:8080';
        this.headers['Utoken'] =  tokenService.getToken();
        this.baseUrl = this.$base_url;
        this.GetPrepGoodsPage();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/list/index.less";
</style>
