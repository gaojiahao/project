<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-29 18:59:51
-->
<template>
<div>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Input search enter-button placeholder="角色..." />
        </div>
    </div>
    <Table border :columns="columns12" :data="tableData1" stripe>
        <template slot-scope="{ row }" slot="number">
            <strong>{{ row.number }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" style="margin-right: 5px" @click="show(index)">分配权限</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">更改状态</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
    <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
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
export default {
    name: 'authority',
    components: {
        Table,
        Button,
        Page,
        Input,
        Modal
    },
    data() {
        return {
            tableData1: this.mockTableData1(),
            columns12: [{
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
                        return h('div', this.formatDate(this.tableData1[params.index].createTime));
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
            modal1: false
        }
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: 'User Info',
                content: `number：${this.tableData1[index].roleName}`
            })
        },
        remove(index) {
            this.tableData1.splice(index, 1);
        },
        mockTableData1() {
            let data = [];
            for (let i = 0; i < 15; i++) {
                data.push({
                    roleName: '角色' + Math.floor(Math.random() * 100 + 1),
                    status: Math.floor(Math.random() * 3 + 1),
                    createTime: new Date()
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
            this.tableData1 = this.mockTableData1();
        }
    },
    created() {}
}
</script>

<style scoped>
>>>.ivu-table th,
>>>.ivu-table td {
    height: 28px;
}
</style>
