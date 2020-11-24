<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 19:18:31
-->
<template>
<div>
    <div style="margin: 10px 0;overflow: hidden">
        <div style="float: left;">
            <Input search enter-button placeholder="角色..." />
        </div>
        <div style="float: right;">
            <Button type="info" @click.native="showPop(true)">新建角色</Button>
        </div>
    </div>
    <Table border :columns="columns" :data="list" stripe>
        <template slot-scope="{ row }" slot="number">
            <strong>{{ row.number }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" style="margin-right: 5px" @click="setUserAuthority(index)">分配权限</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="showPop(true,row)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
    <ModalForm :titleText="titleText" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel='showModel' :formConfig="formConfig" @save="save" @show-pop="showPop" @clear-form-data="clearFormData"></ModalForm>
    <Modal v-model="modal1" title="分配权限" @on-ok="ok" @on-cancel="cancel" width="800">
        <XTreeAdd></XTreeAdd>
    </Modal>
</div>
</template>

<script>
import {
    Table,
    Button,
    Page,
    Input,
    Modal
} from "view-design";
import XTreeAdd from "@components/public/tree/xTreeAdd"
import ModalForm from "@components/public/form/modalForm"
import config from '@views/settings/roleManager/roleManagerConfig.js'
export default {
    name: 'RoleManager',
    components: {
        Table,
        Button,
        Page,
        Input,
        Modal,
        XTreeAdd,
        ModalForm
    },
    computed: {

    },
    mixins: [config],
    data() {
        return {
            list: this.mockTableData1(),
            titleText: '',
            columns: [{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'roleName'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    render: (h, params) => {
                        return h('div', this.formatDate(this.list[params.index].createTime));
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 120,
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 3 ? 'primary' : row.status === 1 ? 'success' : 'error';
                        const text = row.status === 3 ? '默认' : row.status === 1 ? '启用' : '禁用';

                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: color
                            }
                        }, text);
                    }
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
            modal1: false,
            showModel: false,
            titleText: '',
        }
    },
    methods: {
        setUserAuthority(userId) {
            this.titleText = '正在编辑' + this.userId + "的权限";
            this.userId = this.list[userId].roleName;
            this.modal1 = true;
        },
        // show(index) {
        //     this.$Modal.info({
        //         title: 'User Info',
        //         content: `number：${this.list[index].roleName}`
        //     })
        // },
        remove(index) {
            this.list.splice(index, 1);
        },
        mockTableData1() {
            let data = [];
            for (let i = 0; i < 15; i++) {
                data.push({
                    roleName: '角色' + Math.floor(Math.random() * 100 + 1),
                    status: Math.floor(Math.random() * 3 + 1),
                    createTime: new Date(),
                    id: Math.floor(Math.random() * 10000 + 1)
                })
            }
            return data;
        },
        formatDate(date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        changePage() {
            this.list = this.mockTableData1();
        },
        ok() {
            this.$Message.info('温馨提示：分配权限成功！');
        },
        cancel() {
            this.$Message.info('温馨提示：您取消了分配权限！');
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
        clearFormData() {}
    },
    created() {}
}
</script>

<style scoped>
>>>.ivu-table th,
>>>.ivu-table td {
    height: 28px;
}

>>>.ivu-modal-footer {
    border-top: 0;
    padding: 12px 18px 12px 18px;
    text-align: right;
}
</style>
