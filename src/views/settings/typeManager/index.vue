<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-26 12:35:56
-->
<template>
<div class="platformManager-container">
    <div class="platformManager-container-panel">
        <div class="left">
            <TypeManagerList :list="list" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @edit="edit" @del="sureDeleteConfirm"></TypeManagerList>
        </div>
        <div class="right">
            <div class="item" v-show="isShowAdd">
                <div class="top">
                    <Divider orientation="left" size="small">{{title}}</Divider>
                    <div class="top_tabale">
                        <XForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" @save="save" @clear-form-data="clearFormData" ref="form">
                            <template slot="button">
                                <FormItem>
                                    <div style="width:100%">
                                        <Button type="primary" @click="save" style="float: left;">保存</Button>
                                        <Button @click="clearFormData" style="float: left; margin-left:10px">取消</Button>
                                    </div>
                                </FormItem>
                            </template>
                        </XForm>
                    </div>
                </div>
            </div>
            <div class="item"  v-show="isShowBind">
                <div class="top">
                    <Divider orientation="left" size="small">分类属性</Divider>
                    <TypeManagerTab></TypeManagerTab>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import config from "@views/settings/typeManager/typeManagerConfig";
import TypeManagerList from "@components/settings/typeManager/typeManagerList";
import TypeManagerTab from "@components/settings/typeManager/typeManagerTab";
import XForm from "@components/public/form/xForm";
import {
    GetCategoryList,
    CreateCategory,
    UpdateCategory
} from "@service/basicinfoService"

export default {
    name: "TypeManager",
    mixins: [config],
    components: {
        TypeManagerList,
        XForm,
        TypeManagerTab,
    },
    data() {
        return {
            list: [],
            selectPBind: {},
            selectSBind: {},
            isShowAdd: false,
            isShowBind:false,
            listLoading: true,
            title:''
        }
    },
    methods: {
        GetCategoryList() {
            return new Promise((resolve, reject) => {
                GetCategoryList().then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.list = res.result.item;
                            this.listLoading = false;
                        });
                    }
                });
            });
        },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    CreateCategory(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：新建成功！');
                            this.GetCategoryList();
                            this.$refs['form'].$refs['formValidate'].resetFields();
                            this.$refs['form'].initEL('input');
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$FromLoading.show();
                    UpdateCategory(params).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.$Message.info('温馨提示：更新成功！');
                            this.GetCategoryList();
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.message
                            });
                            this.$FromLoading.hide();
                        }
                    });
                });
            }
        },
        selectItem(index) {
            this.isShowBind = true;
        },
        selectPlatformBind(data) {
            this.selectPBind = data;
        },
        //选择系统类目后的处理
        selectSystemBind(data) {
            this.selectSBind = data;
            if (this.selectPBind && this.selectSBind) {
                this.$Message.info('温馨提示：绑定成功');
                setTimeout(() => {
                    this.$refs.selectPlatformBind.removeSelect();
                    this.$refs.selectSystemBind.removeSelect();
                }, 1000);
            }
        },
        showAdd(id) {
            this.title = '新建';
            this.$refs['form'].$refs['formValidate'].resetFields();
            this.isShowAdd = true;
            this.isShowBind = false;
            if(id){
                this.formValidate.parentId = id;
            }
            this.$refs['form'].initEL('input');
        },
        clearFormData() {
            this.isShowAdd = false;
            this.isShowBind = false;
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        edit(data){
            this.title = '编辑';
            this.formValidate = {
                parentId: data.parentId,
                name: data.title,
                code: data.code,
                url: data.parentId,
                id: data.id, 
            };
            this.isShowAdd = true;
            this.isShowBind = true;
        },
        sureDeleteConfirm (root, node, data,flag) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '数据删除后将无法恢复！',
                onCancel: () => {
                    this.$Message.info('取消');
                },
                onOk: () => {
                    flag ? this.deletesData() : this.deleteData(root, node, data);
                    this.$Message.info({
                        content: '删除成功',
                        duration: 2
                    });
                },
            });
        },
        deleteData(root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        }
    },
    created() {
        this.GetCategoryList();
    }
}
</script>

<style lang="less" scoped>
.platformManager-container {
    .platformManager-container-panel {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
        .left {
            width: 350px;
            background-color: #f5fffa;
            height: 750px;
            border: 1px solid #dcdee2;
            border-color: #e8eaec;
            transition: all 0.2s ease-in-out;
        }
        .right {
            flex: 1;
            .top {
                flex: 1;
                transition: all 0.2s ease-in-out;
                margin: 0 0 10px 10px;
                .top_tabale{
                    background-color: #f5fffa;
                    border: 1px solid #dcdee2;
                    border-color: #e8eaec;    
                }
                .top_tabale_white{
                    border: 1px solid #dcdee2;
                    border-top:0;
                    border-color: #e8eaec;    
                }
            }
            .right-bottom {
                flex: 1;
                margin: 10px 10px;
                transition: all 0.2s ease-in-out;
            }
        }
    }
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-center, 
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-left, 
    .ivu-divider-horizontal.ivu-divider-small.ivu-divider-with-text-right
    {
        margin: 8px 0 0 0;
        font-weight: 600;
        color: #515a6e;
    }
}
</style>
