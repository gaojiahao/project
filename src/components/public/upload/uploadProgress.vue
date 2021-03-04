<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Gabriel.gaojiahao
 * @Date: 2019-03-25 10:56:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-04 17:44:00
 -->
<template>
    <div class="loadding" v-show="showProgress">
        <Progress :percent="percent" style="margin-top:20%"></Progress>
    </div>
</template>

<script>
import {
    Progress,
} from "view-design";
export default {
    name: "UploadProgress",
    props: {
        showProgress: {
            type: Boolean,
            default:false,
        },
        percent: {
            type:Number,
            default:0,
        },
    },
    components: {
        Progress,
    },
    data() {
        return {
            show: false
        };
    },
};
</script>

<style scoped lang="less">
.loadding {
  //加载动画
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.1);
}
</style>
