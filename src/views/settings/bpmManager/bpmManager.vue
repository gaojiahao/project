<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 15:01:34
-->
<template>
<div>
    <div style="margin: 10px 0;overflow: hidden">
        <div style="float: left;">
            <Input search enter-button placeholder="流程..." />
        </div>
        <div style="float: right;">
            <Button type="info" @click.native="goAdd()">新建流程</Button>
            <!--<Button type="primary">更改状态</Button>
            <Button type="error">删除</Button>-->
        </div>
    </div>
    <Table row-key="id" border :columns="columns" :data="list" stripe>
        <template slot-scope="{ row }" slot="number">
            <strong>{{ row.number }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="goUpdata(row.id)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </div>
</div>
</template>

<script>
import {
    Table,
    Button,
    Page,
    Input,
} from "view-design";
import list from './nodeList'
import {
    addMenu
} from '@service/authority'

export default {
    name: 'BpmManager',
    components: {
        Table,
        Button,
        Page,
        Input,
    },
    computed: {

    },
    mixins: [list],
    data() {
        return {
            // list: this.mockTableData1(),
            titleText: '',
            showModel: false,
            columns: [{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '流程名称',
                    key: 'name',
                },
                {
                    title: 'value',
                    key: 'value'
                },
                // {
                //     title: '创建时间',
                //     key: 'createTime',
                //     render: (h, params) => {
                //         return h('div', this.formatDate(this.list[params.index].createTime));
                //     }
                // },
                {
                    title: '状态',
                    key: 'status',
                    width: 120,
                    render: (h, params) => {
                        const row = params.row;
                        const color = row.status === 1 ? 'success' : 'error';
                        const text = row.status === 1 ? '启用' : '禁用';

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
        goAdd() {
            this.$router.push({
                name: 'SaveBpm'
            });
        },
        goUpdata(index) {
            this.$router.push({
                name: 'UpdataBpm',
                query: {
                    id: index
                }
            });
        },
        remove(index) {
            this.list.splice(index, 1);
        },
        changePage() {

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

>>>.ivu-modal-footer {
    border-top: 0;
    padding: 12px 18px 12px 18px;
    text-align: right;
}
</style>
