<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-05 20:22:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-05 20:59:45
-->
<template>
<Tabs type="card">
    <TabPane label="分类属性" :animated="false">
        <Table border :columns="columns" :data="data" :width="1331">
            <template slot-scope="{ row, index }" slot="action">
                <Switch size="large">
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </Switch>
            </template>
        </Table>
    </TabPane>
    <TabPane label="制作文件">
        制作文件
    </TabPane>
    <Button @click="" size="small" slot="extra">添加属性</Button>
    <Button @click="" size="small" slot="extra">保存</Button>
</Tabs>
</template>

<script>
import {
    Tabs,
    TabPane,
    Table,
    Switch,
    Button
} from "view-design";
export default {
    name: 'TypeManagerTab',
    components: {
        Tabs,
        TabPane,
        Table,
        Switch,
        Button
    },
    data() {
        return {
            columns: [{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title: '序号'
                },
                {
                    title: '属性名称',
                    key: 'proName'
                },
                {
                    title: '属性状态',
                    slot: 'action',
                    align: 'center'
                }
            ],
            data: [{
                    proName: '颜色',
                },
                {
                    proName: '尺寸',
                },
                {
                    proName: '带电',
                },
                {
                    proName: '材质',
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>

</style>
