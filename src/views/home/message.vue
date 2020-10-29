<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-27 19:14:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-28 17:57:22
-->
<template>
<div class="message">
    <Tabs value="name1">
        <TabPane :label="label" name="name1">
            <Scroll :on-reach-bottom="handleReachBottom">
                <List :border="false" :split="false" v-for="(item,index) in messageList">
                    <ListItem>
                        <Tag color="gold" v-if="item.type=='wait'">待办</Tag>
                        <Tag color="green" v-else-if="item.type=='warn'">提醒</Tag>
                        <Tag color="red" v-else-if="item.type=='expect'">预期</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="提前提醒" name="name2">
            <List :border="false" :split="false">
                <ListItem>This is a piece of text.</ListItem>
                <ListItem>This is a piece of text.</ListItem>
                <ListItem>This is a piece of text.</ListItem>
            </List>
        </TabPane>
        <TabPane label="预期产品" name="name3">
            <List :border="false" :split="false">
                <ListItem>This is a piece of text.</ListItem>
                <ListItem>This is a piece of text.</ListItem>
                <ListItem>This is a piece of text.</ListItem>
            </List>
        </TabPane>
    </Tabs>
</div>
</template>

<script>
import {
    Tabs,
    TabPane,
    List,
    ListItem,
    ListItemMeta,
    Tag,
    Scroll
} from "view-design";
export default {
    name: 'Message',
    components: {
        Tabs,
        TabPane,
        List,
        ListItem,
        ListItemMeta,
        Tag,
        Scroll
    },
    props: {
        messageList: {
            type: Array,
            default () {
                return []
            }
        },
    },
    data() {
        return {
            label: (h) => {
                return h('div', [
                    h('span', '今日待办'),
                    h('Badge', {
                        props: {
                            count: 3
                        }
                    })
                ])
            }
        }
    },
    methods: {
        handleReachBottom() {
            return new Promise(resolve => {
                setTimeout(() => {
                    const last = this.messageList[this.messageList.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.messageList.push({
                            type: 'expect',
                            text: '今日待办' + i,
                        });
                    }
                    resolve();
                }, 1000);
            });
        }
    }
}
</script>

<style scoped>
.message {
    padding: 0 10px;
    margin: 10px 0px 10px 10px;
    width: 400px;
    background-color: #ffffff;
    flex: 1;
    border: 1px solid #dfe0e6;
    border-radius: 6px;
    height: 357px;
}

>>>.ivu-badge-count {
    z-index: 1;
}

.listItemMeta-box {
    width: 100px;
    flex: 0;
}

.ivu-list-item {
    padding: 0 0 10px 0;
}

>>>.ivu-tabs-bar {
    margin-bottom: 0;
}
</style>
