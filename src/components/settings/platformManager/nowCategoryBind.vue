<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-29 16:43:56
-->
<template>
<div class="content">
    <div class="head">
        <span class="text">已绑定类目</span>
    </div>
    <Tree :data="data"></Tree>
</div>
</template>

<script>
export default {
    name: 'NowCategoryBind',
    data() {
        return {
            data: [{
                id: 1,
                title: '电子器元件',
                loading: false,
                expand: true,
                children: [{
                    id: 'a',
                    title: '玩具类',
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
                        title: '遥控类',
                        loading: false,
                        expand: true,
                        children: []
                    }]
                }, ]
            }],
            loop: 0
        }
    },
    methods: {
        selectChangeAll() {

        },
        checkChange(items, item) {
            console.log(items);
            console.log(item);
            if (items.length > 1) {
                this.loop = 0
                this.childnodes(this.data, items, item)
            }
        },
        childnodes(data, items, item) {
            if (this.loop) return false
            const len = data.length
            const its = items.length
            let i = 0
            let j = 0
            for (i = 0; i < len; i++) {
                for (j = 0; j < its; j++) {
                    if (items[j].id === data[i].id) {
                        if (items[j].id === item.id) {
                            break
                        } else {
                            this.loop = 1
                            data[i].checked = false
                            return false
                        }
                    }
                }
                if (!this.loop && data[i].children && data[i].children.length > 0) {
                    this.childnodes(data[i].children, items, item)
                }
            }
        }
    }
}
</script>
<style scoped>
>>>.ivu-tree-children li {
    float: left;
}
</style>
<style lang="less" scoped>
.content {
    flex: 1;
    margin: 0 0 0 0;
    background-color: #ffffff;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;

    .head {
        width: 100%;
        height: 30px;
        background:#d2effd;
        line-height: 30px;
    }
}
</style>
