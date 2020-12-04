<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 19:04:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 15:56:34
-->
<template>
<div>
    <div>
        <div style="height:28px">
            <div style="float:left;font-size: 16px;">
                <Icon type="md-videocam" />商品视频
            </div>
        </div>
        <div style="width:100%">
            <div v-for="item in uploadList" class="left demo-upload">
                <div class="demo-upload-list">
                    <template v-if="item.status === 'finished'">
                        <img :src="defaultVideoPic">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <div style="width:120px">{{item.name}}</div>
            </div>
            <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['mp4','rmvb','mov']" :max-size="10240" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/posts/posts" style="display: inline-block;width:78px;">
                <div style="width: 120px;height:120px;line-height: 120px;">
                    <Icon type="ios-videocam" size="30"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
            </Modal>
        </div>
    </div>
</div>
</template>

<script>
import {
    Upload,
    Modal,
    Progress,
} from "view-design";
export default {
    components: {
        Upload,
        Modal,
        Progress,
    },
    model: {
        prop: 'value', // prop说:我要将value1作为该组件被使用(被父组件调用)时,v-model能取到的值
        event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    },
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
    },
    data() {
        return {
            defaultList: [],
            imgName: '',
            defaultVideoPic: require("@assets/default/defaultVideo.jpg"),
            visible: false,
            uploadList: [{
                name: '111.mp4',
                url: '@assets/default/defaultVideo.mp4',
                status: 'finished'
            }],
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    src: require("@assets/default/defaultVideo.mp4"), // 路径
                    type: 'video/mp4' // 类型
                }, {
                    src: require("@assets/default/defaultVideo.mp4"),
                    type: 'video/mp4'
                }],
                poster: require("@assets/default/defaultVideo.jpg"), //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                }
            }

        }
    },
    methods: {
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            file.url = 'https://img.jbzj.com/file_images/article/201806/201862785813429.png?201852785843';
            //file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            this.handleInput(file);
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '上传文件格式错误',
                desc: '文件 ' + file.name + '不是视频格式'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 1G.'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        handleInput(e) {
            // this.uploadList.push(e)
            this.$emit('change', this.uploadList)
        }
    },
    mounted() {
        //this.uploadList = this.$refs.upload.fileList;
    }

}
</script>

<style scoped>
>>>.ivu-upload {
    float: left;
}

.left {
    float: left;
    margin-right: 20px;
}
</style><style lang="less" scoped>
.demo-upload {
    display: inline-block;
    height: 170px;

    .demo-upload-list {
        // display: inline-block;
        width: 120px;
        height: 120px;
        // text-align: center;
        // line-height: 80px;
        // border: 1px solid transparent;
        // border-radius: 4px;
        // overflow: hidden;
        // background: #fff;
        // position: relative;
        // box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        // margin-right: 15px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        margin: 0 2px;
    }
}

// 设置播放按钮的形状与位置
.video-js .vjs-big-play-button {}
</style>
