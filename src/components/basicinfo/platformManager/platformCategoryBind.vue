<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-31 12:18:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-05 19:07:14
-->
<template>
<div class="content">
    <div class="head">
        <span class="text">平台类目</span>
    </div>
    <Tree ref="tree" :data="data" show-checkbox @on-check-change="checkChange" check-strictly expand-node></Tree>
</div>
</template>

<script>
import {

} from "view-design";
export default {
    name: 'PlatformCategoryBind',
    components: {

    },
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
            this.$emit('select-platform-bind', item);
            if (items.length > 1) {
                this.loop = 0;
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
        },
        removeSelect(data) {
            var d = data || this.data;
            var len = d.length
            for (var i = 0; i < len; i++) {
                d[i].checked = false;
                if (d[i].children && d[i].children.length > 0) {
                    this.removeSelect(d[i].children)
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.content {
    flex: 1;
    margin: 0 10px;
    background-color: #f5fffa;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;

    .head {
        width: 100%;
        height: 40px;
        background: linear-gradient(to top, #d2effd, #ffffff);
        line-height: 40px;
    }
}
</style>
