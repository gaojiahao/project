<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 10:38:26
-->
<template>
<div class="addTemplateTable-container">
    <div class="myTable">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange" :draggable="true">
            <template slot="header">
                <div class="filter">
                    <div class="filter-button">
                        <Button size="small" type="primary" icon="ios-add" @click.native="showPop(true)" class="marginRight">新建</Button>
                        <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
                        <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm(false)" class="marginRight">删除</Button>
                        <AutoCompleteSearch :filtersConfig="filtersConfig" @set-filter="setFilter"></AutoCompleteSearch>
                        <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
                        <!--<Button size="small" icon="ios-close" @click="sureDeleteConfirm(true)">批量删除</Button>-->
                    </div>
                    <div class="filter-search">
                        <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
                    </div>
                </div>    
            </template>
            <template slot="footer">
                <div class="footer_page">
                    <div class="footer_page_right">
                        <Page :total="pageData.totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </template>
        </Table>
        <ModalForm :titleText="title" :formValidate="formValidate2" :ruleValidate="ruleValidate2" :showModel='showModel' :formConfig="formConfig2" @save="saveMenu" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
    </div>
</div>
</template>
<script>
import ModalForm from "@components/public/form/modalForm";
import list from "@mixins/listTable";
import config from "@views/settings/logisticsManager/editTemplate";
import {
    CreateFreightTemplate,
    UpdateFreightTemplate,
    DelFreightTemplate
} from "@service/settingsService"

export default {
    name: "AddTemplateTable",
    mixins: [list,config],
    components: {
        ModalForm,
    },
    props:{
        data: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type: Boolean,
            default: true,
        },
        pageData:{
            type: Object,
            default () {
                return {}
            }
        },
        formValidate:{
            type: Object,
            default () {
                return {}
            }    
        }
    },
    computed:{
        title(){
            return this.formValidate2.id ? '编辑':'新建'
        }
    },
    watch:{
        formValidate:{
            handler(val){
                this.formValidate2.logisticsId = val.id;
                this.formValidate2.logisticsName = val.name;
            }
        }
    },
    data() {
        return {
            columns: [{
                    title: '模板名称',
                    key: 'name'
                },
                {
                    title: '物流名称',
                    key: 'logisticsName'
                },
                {
                    title: '国家',
                    key: 'country'
                },
                {
                    title: '首重',
                    key: 'weightStart'
                },
                {
                    title: '截止重量',
                    key: 'weightEnd'
                },
                {
                    title: '计费模式',
                    key: 'billingModel'
                },
                {
                    title: '收费标准',
                    key: 'charges'
                },
                {
                    title: '最低计费重量',
                    key: 'minWeight'
                },
                {
                    title: '配送费',
                    key: 'feliveryFee'
                },
                {
                    title: '包装费',
                    key: 'packageFee'
                },
                {
                    title: '挂号费',
                    key: 'registrationFee'
                },
                {
                    title: '状态',
                    key: 'status'
                },
            ],
            showModel: false,
        }
    },
    methods: {
        clearFormData() {

        },
        showPop(flag, row) {
            this.showModel = flag;
        },
        saveMenu() {
            var params = this.formValidate2;
            if (!this.formValidate2.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateFreightTemplate(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
                            this.$parent.GetFreightTemplatePage();
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    UpdateFreightTemplate({...params,id:this.activatedRow.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：更新成功！');
                            this.$parent.GetFreightTemplatePage();
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        goEdit(){
            if(this.activatedRow.id){
                this.formValidate2 = {
                    id:this.activatedRow.id,
                    name: this.activatedRow.name,
                    logisticsId: this.activatedRow.logisticsId,
                    logisticsName: this.activatedRow.logisticsName,
                    country: this.activatedRow.country,
                    weightStart: this.activatedRow.weightStart,
                    weightEnd: this.activatedRow.weightEnd,
                    billingModel: this.activatedRow.billingModel,
                    charges: this.activatedRow.charges,
                    minWeight: this.activatedRow.minWeight,
                    feliveryFee: this.activatedRow.feliveryFee,
                    packageFee: this.activatedRow.packageFee,
                    registrationFee: this.activatedRow.registrationFee,
                    status: this.activatedRow.status,
                },
                this.showModel = true;
            }
        },
        changePage(page){
            this.$emit('change-page',page);
        },
        onPageSizeChange(pagesize){
            this.$emit('on-page-size-change',pagesize);
        },
        deleteData(){
            if(this.activatedRow.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelFreightTemplate({id:this.activatedRow.id}).then(res => {
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
                            this.$parent.GetFreightTemplatePage();
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
           this.$emit('set-filter',value);
        },
        refresh(){},
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
        checkALl(){
            this.$nextTick(function () {
                this.columns = this.getTableColumn();
            })
        },
        refresh(){
            this.loading = true;
            this.$parent.GetFreightTemplatePage();
        },
    }
}
</script>
<style lang="less" scoped>
.addTemplateTable-container {
    padding: 15px;
    .head {
        height: 30px;

        .select-type {
            float: left;
        }
    }

    .filter {
        height: 48px;
        margin: 0 12px;
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
    .footer_page{
        margin: 0 10px 10px 10px;
        overflow: hidden;
        .footer_page_right{
            float: right;
        }
    }
}
</style>
