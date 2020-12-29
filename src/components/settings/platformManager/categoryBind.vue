<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 15:42:20
-->
<template>
<div class="content">
    <Tree :data="data" show-checkbox @on-check-change="checkChange" :load-data="loadData" check-strictly></Tree>
</div>
</template>

<script>
export default {
    name: 'CategoryBind',
    data() {
        return {
            data: [{
                id: 1,
                title: '平台类目',
                loading: false,
                children: []
            }],
            loop: 0
        }
    },
    methods: {
        selectChangeAll() {

        },
        loadData(item, callback) {
            setTimeout(() => {
                const data = [{
                        id: Math.random(),
                        title: '子类目' + Math.floor(Math.random() * (100 - 1)) + 1,
                        loading: false,
                        children: []
                    },
                    {
                        id: Math.random(),
                        title: '子类目' + Math.floor(Math.random() * (100 - 1)) + 1,
                        loading: false,
                        children: []
                    }
                ]
                callback(data)
            }, 1000)
        },
        checkChange(items, item) {
            console.log(items);
            console.log(item);
            if (items.length > 1) {
                this.loop = 0
                this.childnodes(this.data, items, item)
                console.log(items);
                console.log(item);
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
.content {
    flex: 1;
    margin: 0 10px;
    background-color: #ffffff;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
}

.demo-tree-render .ivu-tree-title {
    width: 100%;
}
</style>
