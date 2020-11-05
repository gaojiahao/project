<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-04 20:23:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-04 20:35:54
-->
<template>
<Tree :data="data5" show-checkbox multiple @on-check-change="selectChangeAll"></Tree>
</template>

<script>
import {

} from "view-design";
export default {
    name: 'XTreeAdd',
    components: {

    },
    data() {
        return {
            data5: [{
                title: '菜单',
                expand: true,
                children: [{
                        title: '基础信息',
                        expand: true,
                        value: 'basic',
                        children: [{
                                title: '分类管理',
                                expand: true,
                                value: 'type',
                                children: [{
                                    title: '添加店铺',
                                    expand: true,
                                    value: 'addstore',
                                }, ]
                            },
                            {
                                title: '属性管理',
                                expand: true,
                                value: 'shuxing',
                            }
                        ]
                    },
                    {
                        title: '产品管理',
                        expand: true,
                        value: 'product',
                        children: [{
                                title: '销售推品',
                                expand: true,
                                value: 'tuipin',
                            },
                            {
                                title: '开发新品',
                                expand: true,
                                value: 'devlop',
                            }
                        ]
                    }
                ]
            }],
            buttonProps: {
                type: 'default',
                size: 'small',
            }
        }
    },
    methods: {
        selectChangeAll(selectedAll1, selectedItem) {
            console.log(selectedAll1, selectedItem)
        }
    }
}
</script>

<style scoped>
.demo-tree-render .ivu-tree-title {
    width: 100%;
}
</style><style lang="less" scoped>
.ivu-tree /deep/ {
    width: 600px;
}
</style>
