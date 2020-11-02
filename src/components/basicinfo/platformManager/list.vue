<template>
<div class="base-platfrom-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">当前平台</span>
        </div>
        <div class="right">
            <Button type="primary" icon="md-add" size="small">新建平台
            </Button>
        </div>
    </div>
    <div class="content">
        <!--<Scroll :on-reach-bottom="handleReachBottom">-->
        <List :border="false" :split="false" v-for="(item,index) in list" :key="index">
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
            <ListItem>
                <div style="padding:0 10px 0 28px;">
                    <span>{{item.name}}</span>&nbsp|&nbsp<span>{{item.code}}</span>
                </div>
            </ListItem>
        </List>
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
    name: 'testTress',
    components: {
        Icon,
        Button,
        Scroll,
        List,
        ListItem,
        Tag
    },
    data() {
        return {
            list: [],
        }
    },
    methods: {
        getEcommercePlatformList() {
            return new Promise((resolve, reject) => {
                getEcommercePlatformList().then(data => {
                    this.list = data.items;
                });
            });
        },
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('get data');
                }, 1000);
            });
        }
    },
    created() {
        this.getEcommercePlatformList();
    }
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
    }
}
</style>>
