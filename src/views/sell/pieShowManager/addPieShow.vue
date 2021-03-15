<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 09:56:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 18:35:58
-->
<template>
<div>
    <div class="top">
        <Divider orientation="left" size="small">派店信息</Divider>
        <div class="top_tabale">
            <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="form">
                <template slot="button">
                    <div style="width:100%">
                        
                    </div>
                </template>
            </ViewForm>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">选品人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="selectionPeopleColumns" :data="selectionPeopleData" height="300" width="820">

                        </Table>
                        <span style="margin-left: 10px;"></span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
                <div class="ivu-form-item">
                    <label class="ivu-form-item-label" style="width: 120px;">未选人员:</label> 
                    <div class="ivu-form-item-content" style="margin-left: 120px;">
                        <Table :columns="selectionPeopleColumns" :data="selectionPeopleData" height="300" width="820">

                        </Table>
                        <span style="margin-left: 10px;"></span>
                    </div>
                </div>
            </div>
            <div class="ivu-form ivu-form-label-right" style="    padding: 10px 10px 10px 10px;">
            <div class="ivu-form-item">
                <label class="ivu-form-item-label" style="width: 120px;">不选人员:</label> 
                <div class="ivu-form-item-content" style="margin-left: 120px;">
                    <Table :columns="appointStoreColumns" :data="appointStorePeopleData" height="300" width="820">

                    </Table>
                    <span style="margin-left: 10px;"></span>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="top">
        <Divider orientation="left" size="small">审核信息</Divider>
        <div class="top_tabale">
            <XForm :formValidate="formValidate2" :ruleValidate="ruleValidate2" :formConfig="formConfig2" ref="examine">
                <template slot="button">
                    <FormItem>
                        <div style="width:100%">
                            <Button type="primary" @click="save(true)" style="float: left;">保存</Button>
                            <!-- <Button @click="save(false)" style="float: left; margin-left:10px">不同意</Button> -->
                            <Button @click="goReturn" style="float: left; margin-left:10px">返回</Button>   
                        </div>
                    </FormItem>
                </template>
            </XForm>
        </div>
    </div>
</div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import XForm from "@components/public/form/xForm";
import config from "@views/examine/appointStoreExamine/viewProductConfig";
import config2 from "@views/examine/appointStoreExamine/productAppointStoreConfig";
import {
    GetPrepGoodsById,
} from "@service/basicinfoService";
import {
    CreateReviewAction
} from "@service/tortExamineService";

import {
    Tabs,
    TabPane,
} from "view-design";
export default {
    name: 'AddPieShow',
    components: {
        Tabs,
        TabPane,
        ViewForm,
        XForm,
    },
    mixins: [config,config2],
    data(){
        return{
            selectionPeopleColumns: [
                {
                    title: '派店',
                    key: 'isCheck',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                single: false,
                                value:  this.selectionPeopleData[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectionPeopleData[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'title',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'store',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'user',
                    width:120
                },
                // {
                //     title: '对应类目',
                //     key: 'name'
                // },
                {
                    title: '选品时间',
                    key: 'date',
                    width:160
                },
                {
                    title: '意见',
                    key: 'address',
                }
            ],
            selectionPeopleData: [
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao",
                    isCheck:true
                },
            ],
            appointStoreColumns: [
                 {
                    title: '派店',
                    key: 'isCheck',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                single: false,
                                value:  this.appointStorePeopleData[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.appointStorePeopleData[params.index][params.column.key] = event;
                                }
                            }
                        });
                    }
                },
                {
                    title: '平台',
                    key: 'title',
                    width:120
                },
                {
                    title: '店铺',
                    key: 'store',
                    width:120
                },
                 {
                    title: '选品人',
                    key: 'user',
                    width:120
                },
                // {
                //     title: '对应类目',
                //     key: 'name'
                // },
                {
                    title: '选品时间',
                    key: 'date',
                    width:160
                },
                {
                    title: '意见',
                    key: 'address',
                }
            ],
            appointStorePeopleData: [
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao"
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao"
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao"
                },
                {
                    title: "速卖通",
                    address: '无',
                    date: '2016-10-03',
                    store:'亚马孙',
                    user:"gaojiahao"
                },
            ],
        }
    },
    methods: {
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    GetPrepGoodsById({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                code:res.result.item.code,
                                name: res.result.item.name,
                                categoryId: res.result.item.categoryId,
                                remark:res.result.item.remark,
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
        goReturn(){
            this.$router.go(-1);
        },
        save(status){
            var pieShopId = this.$route.query.pieShopId;
            var params = this.formValidate2;
            params = {
                ...params,
                relatedId: pieShopId,
                reviewResult:0,
                reviewBefore: this.formValidate.status,
                isPass: status
            }
            this.$refs['examine'].$refs['formValidate'].validate((valid) => {
                if (valid) {
                    if (params.relatedId) {
                        return new Promise((resolve, reject) => {
                            this.$FromLoading.show();
                            CreateReviewAction(params).then(res => {
                                if (res.result.code == 200) {
                                    this.$FromLoading.hide();
                                    this.$Message.info('温馨提示：审核成功！');
                                    this.goReturn();
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
                } else {
                    this.$Message.error('保存失败');
                }
            })
        }
    },
    created() {
        this.getFormData();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>
