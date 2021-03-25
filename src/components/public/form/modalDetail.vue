<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-24 18:11:48
-->
<template>
    <Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="1200" class="modalDetail">
        <Table border :columns="columns" :data="data" stripe :loading="loading" highlight-row ref="selection">
            <div slot="footer">
                <div class="footer_page">
                    <div class="footer_page_right">
                        <Page :total="total" :current="pageData.skipCount" @on-change="changePage" show-elevator show-total show-sizer :page-size-opts="pageData.pageSizeOpts" :page-size="pageData.skipTotal" @on-page-size-change="onPageSizeChange" :transfer="true"></Page>
                    </div>
                </div>
            </div>
        </Table>
        <div slot="footer">
            <Button size="small" @click="cancel">关闭</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    name: 'ModalDetail',
    components: {

    },
    props: {
        showModelDetail: {
            type: Boolean,
            default: false,
        },
        titleText: {
            type: String,
            default: '明细',
        },
        columns:{
            type: Array,
            default () {
                return []
            }
        },
        data:{
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type: Boolean,
            default: true,
        },
        total:{
            type: Number,
            default:null
        },
        pageData:{
            type: Object,
            default () {
                return {}
            }
        },
    },
    data() {
        return {
            show: false
        }
    },
    watch: {
        showModelDetail: {
            handler(val) {
                this.show = val;
            }
        },
    },
    methods: {
        ok(){

        },
        cancel(){
            this.$emit('show-modal-detail', false);    
        },
        changePage(){

        },
        onPageSizeChange(){

        }
    },
    mounted() {

    },
    created(){
          
    }
}
</script>
<style lang="less" scoped>
.modalDetail  /deep/ .ivu-modal-close /deep/ .ivu-icon-ios-close {
    color: #fff; 
}
.modalDetail /deep/ .ivu-modal /deep/ .ivu-modal-header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
    background: #6cf;
    border-radius: 6px 6px 0px 0px;

    .ivu-modal-header-inner{
        color: #fff;
    }
}
.modalDetail .footer_page{
    margin: 0 10px 10px 10px;
    overflow: hidden;
    .footer_page_right{
        float: right;
    }
}
</style>

