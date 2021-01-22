<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-21 10:02:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 19:17:54
-->
<template>
    <Modal
        v-model="visble"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        draggable >
        <Table border :loading="loading" highlight-row :columns="columns" :data="selectDataAddButton" stripe ref="selection" @on-current-change="onCurrentChange">
        </Table>
    </Modal>   
</template>
<script>
export default {
    name: 'AddButton',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '添加操作按钮'
        },
        selectDataAddButton:{
            type:Array,
            default () {
                return []
            }           
        },
    },
    watch:{
        show:{
            handler(val){
                this.visble = val;
            }
        },
    },
    data () {
        return {
            visble: false,
            loading: true,
            columns: [
                {
                    title: '按钮',
                    key: 'name',
                    render: (h, params) => {
                        return h("span", {
                        style: {
                            display: "inline-block",
                            color: "#2d8cf0"
                        },
                        },params.row.name);
                    }
                },
                {
                    title: '按钮值',
                    key: 'value',
                },
                {
                    title: '操作（是否）',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value: this.selectDataAddButton[params.index][params.column.key]
                            },
                            on: {
                                'on-change': (event) => {
                                    this.selectDataAddButton[params.index][params.column.key] = event; //获取编辑行的inde和编辑字段名，对表格数据进行重新赋值
                                }
                            }
                        });
                    }
                },
            ],
            data: [
                {
                    name: '同意',
                    value: "agree",
                    action: false
                },
                {
                    name: '拒绝',
                    value: "disagree",
                    action: false
                },
                {
                    name: '撤回',
                    value: "recall",
                    action: false
                },
                {
                    name: '终止',
                    value: "stop",
                    action: false
                },
                {
                    name: '转办',
                    value: "transfer",
                    action: false
                },
            ],
        }
    },
    methods:{
        cancel(){
            this.visble = false;
            this.$emit('show','AddButtonModal',false);
        },
        ok(){
            this.$emit('save',this.selectDataAddButton);
            this.$emit('show','AddButtonModal',false);
        },
        onCurrentChange(){}
    },
    created() {
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
</script>
