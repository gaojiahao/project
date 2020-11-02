<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-02 15:05:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-02 17:05:48
-->
<template>
<div class="x-select" :class="[isCheck ? 'ivu-form-item-error':'']" style="width:250px">
    <div class="ivu-input-wrapper" style="width: 200px; float: left;">
        <input type="text" :placeholder="[isCheck ? '':placeholder]" class="ivu-input ">
    </div>
    <Icon type="md-add-circle" style="color: green; font-size:24px;vertical-align: middle;" @click.native="showModel()" />
    <div class="ivu-form-item-error-tip" v-show="isCheck">请输入{{checkText}}</div>
    <Modal v-model="show" @on-ok="ok" @on-cancel="cancel" :fullscreen="fullscreen">
        <p slot="header" style="color:#999;">
            <span>{{titleText}}</span>
            <Icon type="ios-expand" @click.native="fullModel()" />
        </p>
        <Table border :columns="columns" :data="data" stripe style="margin-top:20px">
            <template slot-scope="{ row }" slot="number">
                <strong>{{ row.userName }}</strong>
            </template>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    Icon,
    Modal,
    Table,
    Page
} from "view-design";
export default {
    name: 'XSelect',
    components: {
        Icon,
        Modal,
        Table,
        Page
    },
    data() {
        return {
            isCheck: false,
            placeholder: '',
            checkText: '平台名称',
            columns: [{
                    title: '序号',
                    slot: 'number',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '用户名称',
                    key: 'userName'
                },
                {
                    title: '用户ID',
                    key: 'userId'
                },
            ],
            data: this.getData(),
            show: false,
            titleText: '',
            fullscreen: false,
        }
    },
    methods: {
        showModel() {
            this.show = true;
        },
        getData() {
            let data = [];
            for (let i = 0; i < 15; i++) {
                data.push({
                    userName: '用户' + Math.floor(Math.random() * 100 + 1),
                    userId: Math.floor(Math.random() * 3 + 1),
                })
            }
            return data;
        },
        ok() {},
        cancel() {

        },
        changePage() {
            this.data = this.getData();
        },
        fullModel() {
            this.fullscreen = this.fullscreen ? false : true;
        }
    }

}
</script>

<style lang="less" scoped>
.x-select {
    .ivu-form-item-error {
        .ivu-input-wrapper {
            .ivu-input-error {
                border: 1px solid #ed4014;
            }
        }
    }
}
</style><style scoped>
>>>.ivu-table th,
>>>.ivu-table td {
    height: 28px;
}
</style>
