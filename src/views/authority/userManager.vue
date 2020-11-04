<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-03 20:52:40
-->
<template>
<div>
    <div style="margin: 10px 0;overflow: hidden">
        <div style="float: left;">
            <Input search enter-button placeholder="用户..." />
        </div>
        <div style="float: right;">
            <Button type="info" @click.native="showPop">新增</Button>
            <!--<Button type="primary">更改状态</Button>
            <Button type="error">删除</Button>-->
        </div>
    </div>
    <Table row-key="id" border :columns="columns12" :data="tableData1" stripe>
        <template slot-scope="{ row }" slot="number">
            <strong>{{ row.number }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
    <AddMenu titleText="新建用户" :formValidate="formValidate" :ruleValidate="ruleValidate" :showModel="showModel" :formConfig="formConfig" @save="saveMenu"></AddMenu>
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
import AddMenu from "@components/authority/addMenu"
import config from '@views/authority/menuManagerConfig.js'
import {
    addMenu
} from '@service/authority'

export default {
    name: 'UserManager',
    components: {
        Table,
        Button,
        Page,
        Input,
        Modal,
        AddMenu
    },
    computed: {

    },
    mixins: [config],
    data() {
        return {
            tableData1: this.mockTableData1(),
            titleText: '',
            showModel: false,
            columns12: [{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '用户名称',
                    key: 'menuName',
                },
                {
                    title: '角色',
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
        setUserAuthority(userId) {
            debugger
            this.titleText = '正在编辑' + this.userId + "的权限";
            this.userId = this.tableData1[userId].roleName;
            this.modal1 = true;
        },
        remove(index) {
            this.tableData1.splice(index, 1);
        },
        mockTableData1() {
            let data = [];
            for (let i = 0; i < 15; i++) {
                data.push({
                    menuName: '用户' + Math.floor(Math.random() * 100 + 1),
                    status: Math.floor(Math.random() * 3 + 1),
                    roleName: '角色' + Math.floor(Math.random() * 100 + 1),
                    createTime: new Date(),
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
        },
        ok() {
            this.$Message.info('温馨提示：分配权限成功！');
        },
        cancel() {
            this.$Message.info('温馨提示：您取消了分配权限！');
        },
        showPop() {
            debugger
            this.showModel = true;
        },
        saveMenu() {
            var params = this.formValidate;
            return new Promise((resolve, reject) => {
                addMenu(params).then(res => {
                    if (res.status == 200) {
                        this.$Message.info(res.data.message);
                    } else if (res.status == 403) {
                        this.$Message.error({
                            background: true,
                            content: res.message
                        });
                    }
                });
            });
        },
        show() {

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
