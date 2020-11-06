<template>
<div class="base-platfrom-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">当前平台</span>
        </div>
        <div class="right">
            <Button type="primary" icon="md-add" size="small" @click.native="add">新建平台
            </Button>
        </div>
    </div>
    <div class="content">
        <!--<Scroll :on-reach-bottom="handleReachBottom">-->
        <template v-if="list.length">
            <List :border="false" :split="false" v-for="(item,index) in list" :key="index">
                <ListItem>
                    <div style="padding:0 10px 0 28px;" :class="[selectIndex!=null&&selectIndex==index ? 'active':'']" @click="select(index)">
                        <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                    </div>
                </ListItem>
            </List>
        </template>
        <template v-else>
            暂无数据
        </template>
        <!--</Scroll>-->
    </div>
</div>
</div>
</template>

<script>
import {
    Icon,
    Button,
    Scroll,
    List,
    ListItem,
    Tag
} from "view-design";
import {
    getEcommercePlatformList
} from "@service/basicinfoService"
export default {
    name: 'PlatformManagerList',
    components: {
        Icon,
        Button,
        Scroll,
        List,
        ListItem,
        Tag
    },
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
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
        select(index) {
            this.selectIndex = index;
            this.$emit('select-item', index);
        },
        add() {
            this.$emit('add');
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

        .active {
            color: #2d8cf0;
        }
    }
}
</style>>
