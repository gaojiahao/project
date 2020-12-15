<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-27 19:14:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-15 14:46:51
-->
<template>
<div class="message">
    <Tabs value="name1">
        <TabPane :label="label" name="name1">
            <Scroll :on-reach-bottom="handleReachBottom">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem v-if="item.type=='wait'">
                        <Tag color="gold">待办</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="提前提醒" name="name2">
            <Scroll :on-reach-bottom="handleReachBottom">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem v-if="item.type=='warn'">
                        <Tag color="green">提醒</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="逾期产品" name="name3">
            <Scroll :on-reach-bottom="handleReachBottom">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem v-if="item.type=='expect'">
                        <Tag color="red">逾期</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="全部" name="name4">
            <Scroll :on-reach-bottom="handleReachBottom">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem>
                        <Tag color="gold" v-if="item.type=='wait'">待办</Tag>
                        <Tag color="green" v-else-if="item.type=='warn'">提醒</Tag>
                        <Tag color="red" v-else-if="item.type=='expect'">逾期</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
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
                            count: 4
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
    background-color: #ffffff;
    flex: 1;
    border: 1px solid #dfe0e6;
    border-radius: 6px;
    height: 399px;
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
