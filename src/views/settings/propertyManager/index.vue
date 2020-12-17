<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-17 15:30:36
-->
<template>
<div class="propertyManager-container">
    <div class="propertyManager-container-panel">
        <div class="left">
            <PropertyManagerList :list="list" @select-item="selectItem" :loading="listLoading" @show-add="showAdd" @edit="edit" @del="sureDeleteConfirm"></PropertyManagerList>
        </div>
        <div class="right" v-show="isShowAdd">
            <Divider orientation="left" size="small">{{title}}</Divider>
            <div class="right-top">
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
</div>
</template>

<script>
import PropertyManagerList from "@components/settings/propertyManager/propertyManagerList";
import config from "@views/settings/propertyManager/propertyManagerConfig.js";
import XForm from "@components/public/form/xForm";
import {
    addEcommercePlatform,
    getEcommercePlatformList
} from "@service/basicinfoService"

export default {
    name: "PropertyManager",
    mixins: [config],
    components: {
        PropertyManagerList,
        XForm,
    },
    data() {
        return {
            list: [],
            selectPBind: {},
            selectSBind: {},
            listLoading: true,
            title:'',
            isShowAdd:false
        }
    },
    methods: {
        getEcommercePlatformList() {
            return new Promise((resolve, reject) => {
                getEcommercePlatformList().then(res => {
                    this.$nextTick(() => {
                        this.list = res.data.items;
                    });
                });
            });
        },
        save() {
            var params = this.formValidate;
            if (!this.formValidate.id) {
                return new Promise((resolve, reject) => {
                    this.$Message.info('温馨提示：成功');
                    this.$refs['form'].$refs['formValidate'].resetFields();
                    this.$refs['form'].initEL('input');
                });
            } else {
                return new Promise((resolve, reject) => {
                    this.$Message.info('更新成功');
                });
            }
        },
        clearFormData() {
            this.isShowAdd = false;
            this.$refs['form'].$refs['formValidate'].resetFields();
        },
        selectItem(index) {
            this.formValidate = this.list[index];
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
        setTimeout(() => {
            this.listLoading = false;
        }, 500);
    }
}
</script>

<style lang="less" scoped>
.propertyManager-container {
    .propertyManager-container-panel {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;

        .left {
            margin: 10px 10px;
            width: 350px;
            background-color: #f5fffa;
            height: 750px;
            border: 1px solid #dcdee2;
            border-color: #e8eaec;
            transition: all 0.2s ease-in-out;
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;

            .right-top {
                flex: 1;
                margin: 10px 10px;
                background-color: #f5fffa;
                border: 1px solid #dcdee2;
                border-color: #e8eaec;
                transition: all 0.2s ease-in-out;
                max-height: 300px;
            }

            .right-bottom {
                flex: 1;
                margin: 10px 10px;
                transition: all 0.2s ease-in-out;
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
}
</style>
