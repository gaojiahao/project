<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-12 20:59:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-13 09:29:24
-->
<template>
    <Select>     
        <OptionGroup v-for="(group,index) in parentlist" :key="group.id" :label="group.name">
                   <Option v-for="(item,index) in group.childrenode" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </OptionGroup>
    </Select>
</template>
<script>
export default {
    data() {
        return {
            parentlist: [
                {
                    id:1,
                    name:"parent1",
                    childrenode:[
                        {
                            id:101,
                            name:"子1"
                        },
                        {
                        id:102,
                        name:'子1-2'
                        }
                    ]
                },
                {
                    id:2,
                    name:"parent2",
                    childrenode:[
                        {
                            id:102,
                            name:"子2"
                        },
                        {
                        id:102,
                        name:'子2-2'
                        }
                    ]    
                },
                {
                    id:3,
                    name:"parent3",
                }
            ],
        }
    },   
}
</script>