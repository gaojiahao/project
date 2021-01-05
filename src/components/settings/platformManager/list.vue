<template>
<div class="base-platfrom-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">当前平台</span>
        </div>
        <div class="right">
            <Button type="primary" icon="md-add" size="small" @click.native="add">新建
            </Button>
        </div>
        <div style="margin:0 5px">
            <Input search clearable placeholder="" size="small" @on-search="onSearch" @on-clear="onCler" />
        </div>
    </div>
    <div class="content">
        <List :border="false" :split="false">
            <ListItem>
                <div style="padding:0 10px 0 28px; width: 100%; text-align: left; font-weight:600">
                    <span class="default">名称</span>&nbsp|&nbsp<span class="default">编码</span>
                </div>
            </ListItem>
        </List>
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <template v-else>
            <template v-if="list.length">
                <List :border="false" :split="false" v-for="(item,index) in list" :key="index">
                    <ListItem>
                        <div style="padding:0 10px 0 28px; width: 100%; text-align: left;" :class="[selectIndex!=null&&selectIndex==item.id ? 'active':'']" @click="select(item.id)">
                            <span class="default">{{item.name}}</span>&nbsp|&nbsp<span class="default">{{item.code}}</span>
                            <span style="float:right">
                                <Icon type="md-close" @click.native="del($event,item.id)" />
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
</div>
</template>

<script>
import {
    Scroll,
    List,
    ListItem,
} from "view-design";
export default {
    name: 'PlatformManagerList',
    components: {
        Scroll,
        List,
        ListItem,
    },
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
        loading:{
            type:Boolean,
            default: true
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
        select(id) {
            this.selectIndex = id;
            this.$emit('select-item', id);
        },
        add() {
            this.$emit('show-add');
        },
        del(e,id){
            e.stopPropagation();
            e.preventDefault();
            this.$emit('del',id);
        },
        onSearch(value){
            this.$emit('set-filter',value);
        },
        onCler(){
            this.$emit('set-filter','');
        }
    },
    created() {}
}
</script>
<style lang="less" scoped>
.base-platfrom-list {
    width: 100%;
    .head {
        width: 100%;
        height: 80px;
        background: #ffffff;
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
    .ivu-icon-md-close:hover{
        color:red
    }
}
</style>>
