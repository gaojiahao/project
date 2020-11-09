<template>
<div class="base-platfrom-list">
    <div class="head">
        <div class="left">
            <Icon type="md-apps" />
            <span class="text">当前属性</span>
        </div>
        <div class="right">
            <Button type="primary" icon="md-add" size="small">新建属性
            </Button>
        </div>
    </div>
    <div class="content">
        <!--<Scroll :on-reach-bottom="handleReachBottom">-->
        <template v-if="list.length">
            <Tree :data="data"></Tree>
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
    name: 'PropertyManagerList',
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
            data: [{
                id: 1,
                title: '材质',
                loading: false,
                expand: true,
                children: [{
                    id: 'a',
                    title: '吸塑包装',
                    loading: false,
                    expand: true,
                    children: [{
                        id: 'a-1',
                        title: '积木类',
                        loading: false,
                        expand: true,
                        children: [{
                            id: 'a-1-1',
                            title: '木质积木',
                            loading: false,
                            children: []
                        }, {
                            id: 'a-1-2',
                            title: 'pvc积木',
                            loading: false,
                            children: []
                        }]
                    }, {
                        id: 'a-2',
                        title: '皮套',
                        loading: false,
                        expand: false,
                        children: []
                    }]
                }, ]
            }],
        }
    },
    methods: {

    },
    created() {}
}
</script>

<style scoped>
>>>.ivu-tree-children li {
    float: left;
}
</style><style lang="less" scoped>
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
</style>
