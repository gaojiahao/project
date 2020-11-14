<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 15:42:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-09 19:59:03
-->
<template>
<router-view></router-view>
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
    name: 'Bpm',
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
            this.$router.push('/bpm/save');
        },
        goUpdata() {

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
