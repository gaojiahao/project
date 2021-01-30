<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-28 15:54:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-30 11:56:54
-->
<template>
<div class="quick_container">
    <div class="card">
        <div class="list" v-for="(item,index) in quickList" :key='index'>
            <div class="list_box">
                <img :src="item.src">
                <div class="">{{item.name}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Quick',
    props: {
        quickList: {
            type: Array,
            default () {
                return []
            }
        },
    },
}
</script>

<style lang="less" scoped>
.quick_container{
   
    .card {
        // width:100%;
        // background-color: #ffffff;
        
        .title{
            width: 200px;text-align: left;
        }
        .list{
            width: 100%;
            .list_box {
                width:100px;float:left; height:64px;
                img {
                    width:30px; height:30px
                }
                .text {
                    margin-top:10px; font-size:12px;
                }
            }
        }
    }
}
.ivu-divider-horizontal {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
