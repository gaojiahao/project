<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-27 19:14:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 16:35:31
-->
<template>
<div class="message">
    <Tabs value="name1" :animated="false">
        <TabPane :label="label" name="name1">
            <Scroll :on-reach-bottom="handleReachBottom" height="360">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem v-if="item.type=='wait'">
                        <Tag color="gold">待办</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="提前提醒" name="name2">
            <Scroll :on-reach-bottom="handleReachBottom" height="360">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem v-if="item.type=='warn'">
                        <Tag color="green">提醒</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="逾期产品" name="name3">
            <Scroll :on-reach-bottom="handleReachBottom" height="360">
                <List :border="false" :split="false" v-for="(item,index) in messageList" :key="index">
                    <ListItem v-if="item.type=='expect'">
                        <Tag color="red">逾期</Tag>
                        {{item.text}}
                    </ListItem>
                </List>
            </Scroll>
        </TabPane>
        <TabPane label="全部" name="name4">
            <Scroll :on-reach-bottom="handleReachBottom" height="360">
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
        <TabPane label="动态" name="name5">
            <Scroll :on-reach-bottom="handleReachBottom" height="360">
                <Timeline>
                    <TimelineItem>
                        <p class="time">2月22日 12:02</p>
                        <p class="content">张旦 创建 Bug 菜单管理 点击“新建”弹出的表</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:58</p>
                        <p class="content">张旦 创建 Bug 菜单管理 选择一个菜单点击编</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:51</p>
                        <p class="content">张旦 关闭了 Bug 销售推品 新建推品时要与已</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:20</p>
                        <p class="content">高家豪 创建 待办 范德萨发的</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:20</p>
                        <p class="content">高家豪 完成了 待办 刚发的广泛地</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:20</p>
                        <p class="content">高家豪 完成了 待办 刚发的广泛地</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:20</p>
                        <p class="content">高家豪 完成了 待办 刚发的广泛地</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:20</p>
                        <p class="content">高家豪 完成了 待办 刚发的广泛地</p>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="time">2月22日 11:20</p>
                        <p class="content">高家豪 完成了 待办 刚发的广泛地</p>
                    </TimelineItem>
                </Timeline>
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
    Scroll,
    Timeline,
    TimelineItem
} from "view-design";
export default {
    name: 'Message',
    components: {
        Tabs,
        TabPane,
        List,
        ListItem,
        ListItemMeta,
        Scroll,
        Timeline,
        TimelineItem
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
    /* padding: 0 10px;
    background-color: #ffffff;
    flex: 1;
    border: 1px solid #dfe0e6;
    border-radius: 6px;
    height: 399px; */
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
.time{
    font-size: 14px;
    font-weight: bold;
}
.content{
    padding-left: 5px;
}
</style>
