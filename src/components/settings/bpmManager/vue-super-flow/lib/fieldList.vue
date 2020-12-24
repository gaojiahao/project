<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-18 20:07:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-22 20:21:25
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
                        <div v-if="row.isEdit">
                            <Button type="primary" icon="md-create" size="small" style="margin-right: 5px" @click="edit(true,row,index)">修改</Button>
                            <Button type="error" icon="md-create" size="small" style="margin-right: 5px" @click="del(index)">删除</Button>
                        </div>
                        <div style="color:#ed4014;" v-else>
                            禁止
                        </div>
                    </template>
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
                    </div>
                </div>
            </div>
        </div>
        <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData" ref="form"></ModalForm>
    </div>
</div>
</template>

<script>
import ModalForm from "@components/public/form/modalForm";
import config from "@views/settings/bpmManager/flowManager/addFieldConfig"

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
                    key: 'fieldName',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.fieldName);
                    }
                },
                {
                    title: '字段值',
                    key: 'fieldCode',
                },
                {
                    title: '字段类型',
                    key: 'type',
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                    width: 200
                }
            ],
            data: [
                {
                    id:'fds',
                    fieldName: '姓名',
                    fieldCode: "name",
                    type: '文本',
                    isEdit: false
                },
                {
                    id:'fds2',
                    fieldName: '性别',
                    fieldCode: "sex",
                    type: '文本',
                    isEdit: false
                },
                {
                    id:'fds3',
                    fieldName: '年龄',
                    fieldCode: "age",
                    type: '文本',
                    isEdit: false
                },
            ],
            loading: true,
            showModel: false,
            titleText: '',
            selectIndex: null,
            showLoading: false,
        }
    },
    methods: {
        changePage() {},
        onCurrentChange(currentRow,oldCurrentRow){
            this.formValidate['id'] = currentRow.id;   
        },
        clearFormData() {
            this.formValidate = {
                id: '',
                fieldCode:'',
                fieldName: '',
                type:'',
            }
        },
        showPop(flag, row) {
            if (row && row.containerCode) {
                this.titleText = '编辑';
            } else {
                this.titleText = '新建';
            }
            this.showModel = flag;
        },
        save(data) {
            if(this.formValidate.id){
                this.data[this.selectIndex] = this.formValidate;
                this.selectIndex = null;    
            } else {
                this.data.push({
                    id:'111',
                    ...this.formValidate,
                    isEdit: true
                });
            }
            this.loading = true;
            this.clearFormData();
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        edit(flag,data,index){
            if (data && data.id) {
                this.titleText = '编辑';
            } else {
                this.titleText = '新建';
            }
            this.selectIndex = index;
            this.formValidate = data;
            this.showModel = flag;        
        },
        del(index){
            this.data.splice(index, 1); 
        },
        submit(){
            this.showLoading = true;
            setTimeout(() => {
                this.showLoading = false;
                this.$Message.info('温馨提示：成功');
                this.$emit('save',this.data);
                this.$emit('show','ShowPanel',false);
            }, 500);
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 1000);
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
