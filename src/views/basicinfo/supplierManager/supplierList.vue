<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-26 17:27:33
-->
<template>
<div class="storeManager-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd" class="marginRight">添加供应商</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit" class="marginRight">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm" class="marginRight">删除</Button>
            <!--<Button type="error" size="small" icon="ios-close" @click="deletesData">批量删除</Button>-->
            <Checkbox v-model="isAlibaba">1688供应商</Checkbox>
        </div>
        <div class="filter-search">
            <Button size="small" type="success" icon="md-refresh" @click="refresh" class="marginRight">刷新</Button>
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)" class="marginRight">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
            <CustomColumns :columns="columns" @change-coulmns="changeCoulmns" @check-all="checkALl" ref="customColumns"></CustomColumns>
        </div>
    </div>
    <div>
        <Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="success" icon="md-create" size="small" style="margin-right: 5px" @click="showPop(true)">审核</Button>
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
    DatePicker,
    Checkbox
} from "view-design";
import config from "@views/basicinfo/supplierManager/supplierListConfig";
import list from "@mixins/list";

export default {
    name: "SupplierList",
    components: {
        Table,
        Page,
        RadioGroup,
        Radio,
        Select,
        Option,
        DatePicker,
        Checkbox
    },
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: this.getTableColumn(),
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
            data: this.getData(),
            filter: "large",
            isAlibaba:false
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

        },
        goAdd(){
            this.$router.push({name:'AddSupplier'});
        },
        goEdit(){
            if(this.activatedRow.id)
            this.$router.push({name:'AddSupplier',query: {id:this.activatedRow.id}});
        },
        goDetail(id){
            if(id)
            this.$router.push({name:'ViewSupplier',query: {id:id}});
        },
        changeCoulmns(data){
            let datas = [];
            let columns = this.getTableColumn();
            datas.push(columns[0]);
            datas.push(columns[1]);
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
        getTableColumn(){
            var columns = [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '供应商编号',
                    key: 'storeName'
                },
                {
                    title: '供应商名称',
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
                    key: 'status',
                    render: (h, params) => {
                        return h("span", {// 创建的标签名
                        // 执行的一些列样式或者事件等操作
                        style: {
                            display: "inline-block",
                            color: params.row.status=='已审核' ? "#19be6b": "#ed4014"
                        },
                        },params.row.status);//  展示的内容
                    }
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ];
            return columns;
        },
        getData(){
            var data = [{
                id:'fds',
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
                isAlibaba:true,
            }, {
                id:1,
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
                isAlibaba:true,
            }, {
                id:2,
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
                isAlibaba:true, 
            }, {
                id:3,
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
                id:4,
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "未审核",
                createTime: "2020-11-06",
            }, {
                id:5,
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
                id:6,
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, ]
            if(this.isAlibaba){

            }
            return data;
        }
    },
    created(){

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
>>>.ivu-table-row-highlight td {
    background-color: #B8D9FD;
}
>>>.ivu-table-stripe .ivu-table-body tr.ivu-table-row-hover td{
    background-color: #B8D9FD;
}
>>>.ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td{
    background-color: #B8D9FD;
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

