<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 19:26:30
-->
<template>
<div class="customerList-container">
    <div class="filter">
        <div class="filter-button">
            <Button size="small" type="primary" icon="ios-add" @click.native="goAdd">添加客户</Button>
            <Button type="info" size="small" icon="ios-create-outline" @click="goEdit">编辑</Button>
            <Button type="error" size="small" icon="ios-close" @click="sureDeleteConfirm">删除</Button>
            <!--<Button type="error" size="small" icon="ios-close" @click="deletesData">批量删除</Button>-->
            <Button size="small" type="success" icon="md-refresh" @click="refresh">刷新</Button>
        </div>
        <div class="filter-search">
            <Button type="primary" size="small" icon="ios-funnel-outline" @click="showFilter(true)">高级筛选</Button>
            <AutoCompleteSearch :filtersConfig="filtersConfig"></AutoCompleteSearch>
        </div>
    </div>
    <div>
        <Table Table border :loading="loading" highlight-row :columns="columns" :data="data" stripe @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-current-change="onCurrentChange">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" icon="ios-search-outline" size="small" style="margin-right: 5px" @click="showPop(true)">查看</Button>
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
import config from "@views/basicinfo/supplierManager/supplierListConfig";
import list from "@mixins/list";

export default {
    name: "CustomerList",
    mixins: [config,list],
    data() {
        return {
            titleText: '',
            showModel: false,
            columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                }, {
                    title: '客户编号',
                    key: 'storeName'
                },
                {
                    title: '客户名称',
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
                    key: 'status'
                }, {
                    title: '创建时间',
                    key: 'createTime'
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            data: [{
                id:"fdsa",
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
                storeName: 'TOU16231321',
                name: '海辉玩具厂',
                storeCode: '18218413144',
                account: "李四",
                LoginID: "龙华新区",
                appKey: "131@qq.com",
                appSecret: "fdsfsdf",
                status: "已审核",
                createTime: "2020-11-06",
            }, ],
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
            this.$router.push({name:'AddSupplier',query: {id:this.selectedList[0].id}});
        },
        goDetail(id){
            console.log(id)
            this.$router.push({name:'AddSupplier',query: {id:id}});
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
.customerList-container {
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
        }

        .filter-search {
            float: right;
            display: flex;
        }
    }
}
</style>