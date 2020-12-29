<template>
<div class="base-platfrom-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">{{config.containerName}}</span>
        </div>
        <div class="right">
            <Button type="primary" icon="md-add" size="small" @click.native="add">新建字段
            </Button>
            <Button type="primary" icon="md-add" size="small" @click.native="del()">删除
            </Button>
        </div>
    </div>
    <div class="content">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <template v-else>
            <template v-if="config.fields.length">
                <List :border="false" :split="false" v-for="(item,index) in config.fields" :key="index">
                    <ListItem>
                        <div style="padding:0 10px 0 28px; width: 100%; text-align: left;" :class="[selectIndex!=null&&selectIndex==index ? 'active':'']" @click="select(index,item)">
                            <span>{{item.fieldName}}</span>&nbsp|&nbsp<span>{{item.fieldCode}}</span>
                            <span style="float:right">
                                <Icon type="md-close" @click.native="delField(index)" />
                            </span>
                        </div>
                    </ListItem>
                </List>
            </template>
            <template v-else>
                暂无数据
            </template>
        </template>
    </div>
</div>
</template>

<script>
import {
    Scroll,
    List,
    ListItem,
} from "view-design";
import {
    getEcommercePlatformList
} from "@service/settingsService"
export default {
    name: 'Container',
    components: {
        Scroll,
        List,
        ListItem,
    },
    props: {
        config: {
            type: Object,
            default () {
                return {}
            }
        },
        list: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type:Boolean,
            default: false
        }
    },
    data() {
        return {
            selectIndex: null,
        }
    },
    methods: {
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('get data');
                }, 1000);
            });
        },
        select(index,item) {
            this.selectIndex = index;
            this.$emit('select-field', item);
        },
        add() {
            this.$emit('show-add',true,this.config);
        },
        del(){
            this.$emit('del-container',this.config.containerCode);    
        },
        delField(index){
            this.$delete(this.config.fields,index);    
        }

    },
    created() {}
}
</script>
<style lang="less" scoped>
.base-platfrom-list {
    width: 300px;
    margin-right: 10px;
    float:left;
    margin-bottom: 10px;
    .head {
        width: 100%;
        height: 40px;
        background: linear-gradient(to top, #d2effd, #ffffff);
        line-height: 40px;

        .left {
            float: left;
            margin-left: 10px;
        }

        .right {
            float: right;
            margin-right: 10px;
        }
    }
    .content {
        overflow-y: scroll;
        height: 710px;
        position: relative;
        background-color: #ffffff;
        .active {
            color: #2d8cf0;
            background-color: #f8f8f9;
        }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .ivu-list-item{
        padding: 3px 0;
    }
}
</style>>
