<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-18 20:07:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-04 10:10:41
-->
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 11:05:46
-->
<template>
<div>
    <Spin fix v-if="showLoading">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
    <div class="top" v-else>
        <div style="height:48px;line-height: 48px;">
            <div style="float:right">
                <Button size="small" @click.native="showPop(true)">添加</Button>
                <Button size="small" type="info" @click.native="submit()">确认</Button>
            </div>
        </div>
        <Divider orientation="left" size="small">表单设置</Divider>
        <div class="top_tabale">
            <div class="myTable">
                <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe ref="selection" @on-current-change="onCurrentChange">
                    <template slot-scope="{ row, index }" slot="action">
                        <div v-if="!row.isEdit">
                            <Button type="primary" icon="md-create" size="small" style="margin-right: 5px" @click="edit(true,row)">修改</Button>
                            <Button type="error" icon="md-create" size="small" style="margin-right: 5px" @click="del(row)">删除</Button>
                        </div>
                        <div style="color:#ed4014;" v-else>
                            禁止
                        </div>
                    </template>
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="totalPage" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm";
import config from "@views/settings/bpmManager/flowManager/addFieldConfig";
import {
    CreateClauseDataItem,
    UpdateClauseDataItem,
    DelClauseDataItem,
    GetClauseDataItemPage,
    GetClauseDataItemById
} from "@service/settingsService";

export default {
    name: 'FieldList',
    components: {
        ModalForm,
    },
    mixins: [config],
    data(){
        return{
            columns: [
                {
                    title: '字段名称',
                    key: 'displayName',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.displayName);
                    }
                },
                {
                    title: '字段值',
                    key: 'columnName',
                },
                {
                    title: '字段类型',
                    key: 'logicType',
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 200
                }
            ],
            data: [
                // {
                //     fId:1,
                //     columnName: '姓名',
                //     displayName: "name",
                //     type: '文本',
                //     isEditable: false,
                //     isVisible:false,
                //     required:false
                // },
                // {
                //     fId:2,
                //     columnName: '性别',
                //     displayName: "sex",
                //     type: '文本',
                //     isEditable: false,
                //     isVisible:false,
                //     required:false
                // },
                // {
                //     fId:3,
                //     columnName: '年龄',
                //     displayName: "age",
                //     type: '文本',
                //     isEditable: false,
                //     isVisible:false,
                //     required:false
                // },
            ],
            loading: true,
            showModel: false,
            titleText: '',
            selectIndex: null,
            showLoading: false,
            pageData:{
                skipCount: 1,
                skipTotal: 15,
                maxResultCount: 15,
                keyword:'',
                pageSizeOpts:[15,50,200],
            },
            totalPage:0,
            activatedRow:{}
        }
    },
    methods: {
        changePage() {},
        clearFormData() {
            this.$delete(this.formValidate,'id')
            this.formValidate = {
                clauseId:'',
                columnName:'',
                displayName: '',
                logicType:'',
                columnLength:'',
            };
        },
        showPop(flag, row) {
            if (row && row.id) {
                this.titleText = '编辑';
            } else {
                this.titleText = '新建';
                this.$delete(this.formValidate,'id');
            }
            this.showModel = flag;
        },
        save() {
            var params = this.formValidate;
            params.clauseId = this.$parent.$parent.$parent.id;
            if (!params.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateClauseDataItem(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
                            this.showPop(false);
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                            this.loading = true;
                            this.GetClauseDataItemPage();
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
                    UpdateClauseDataItem({...params,id:this.activatedRow.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：更新成功！');
                            this.showPop(false);
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                            this.loading = true;
                            this.GetClauseDataItemPage();
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
        edit(flag,row){
            if (row && row.id) {
                this.titleText = '编辑';
                this.formValidate = {
                    id:row.id,
                    clauseId:row.clauseId,
                    columnName:row.columnName,
                    displayName: row.displayName,
                    logicType:row.logicType,
                    columnLength:row.columnLength,
                };
            } else {
                this.titleText = '新建';
            }
            this.showModel = flag;        
        },
        submit(){
            this.showLoading = true;
            setTimeout(() => {
                this.showLoading = false;
                this.$Message.info('温馨提示：成功');
                this.$emit('save',this.data);
                this.$emit('show','ShowPanel',false);
            }, 500);
        },
        GetClauseDataItemPage() {
            GetClauseDataItemPage({...this.pageData,clauseId:this.$parent.$parent.$parent.id}).then(res => {
                if(res.result.code==200){
                    this.$nextTick(() => {
                        this.totalPage = res.result.item.totalCount;
                        this.data = res.result.item.items;
                        this.loading = false;
                    });
                }
            });
        },
        changePage(page) {
            this.pageData.skipCount = page;
            this.GetClauseDataItemPage();
        },
        onPageSizeChange(pagesize){
            this.pageData.maxResultCount = pagesize;
            this.GetClauseDataItemPage();
        },
        del(row){
            if(row.id){
                this.loading = true;
                return new Promise((resolve, reject) => {
                    DelClauseDataItem({id:row.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$Message.info('温馨提示：删除成功！');
                            this.GetClauseDataItemPage();
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
        onCurrentChange(currentRow,oldCurrentRow){
            this.activatedRow = currentRow;    
        },
    },
    created() {
        this.GetClauseDataItemPage();
    }
}
</script>
<style scoped>
>>>.ivu-form-item-content {
    flex-direction: column;
}
</style>
<style lang="less" scoped>
@import  "~@less/form.less";
.myTable{
    padding:10px;
}
</style>
