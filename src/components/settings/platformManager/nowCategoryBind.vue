<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-19 16:50:15
-->
<template>
<div class="content">
    <div class="head">
        <span class="text">已绑定类目</span>
    </div>
    <div class="list">
        <Table height="410" :columns="columns" :data="data" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" icon="ios-close" size="small" style="margin-right: 5px" @click="del(row.id)"></Button>
            </template>
        </Table>
    </div>
</div>
</template>

<script>
export default {
    name: 'NowCategoryBind',
    props:{
        data:{
            type:Array,
            default () {
                return []
            }           
        },
        loading:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            columns: [
                {
                    type: 'index',
                    align: 'center',
                    title: '序号'
                },
                {
                    title: '平台类目',
                    key: 'eCategotyName',
                    align: 'center'
                },
                {
                    title: '系统类目',
                    key: 'categoryName',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    align: 'center'
                }
            ],
        }
    },
    methods: {
        onSearch(value){
            this.$emit('set-filter',value);
        },
        onCler(){
            this.$emit('set-filter','');
        },
        del(id){
            this.$emit('del',id);
        }
    }
}
</script>
<style lang="less" scoped>
.content {
    margin: 0 0 0 0;
    background-color: #ffffff;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    border-radius: 3px;
    .head {
        width: 100%;
        height: 30px;
        background:#d2effd;
        line-height: 30px;
        border-radius: 3px 3px 0 0;
        .text {
            margin-left: 10px;
        }
    }
    .list{
        overflow: hidden;
        height: 410px;
        position: relative;    
    }
}
</style>
