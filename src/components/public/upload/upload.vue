<template>
    <div class="upload">
        <template v-for="(item,index) in uploadList">
            <template v-if="item.status === 'finished'">
                <div class="demo-upload-box">
                    <div class="demo-upload-list">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name,index)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </div>
                    <div class="text">{{item.name}}</div>
                </div>
            </template>
            <template v-else>
                <div class="demo-upload-box">
                    <div class="demo-upload-list">
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </div>
                </div>
            </template>
        </template>
        <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" 
            :format="format" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" 
            :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="width:58px;" v-if="!disabled">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20" v-if="type=='img'"></Icon>
                <Icon type="ios-cube" size="20" v-else-if="type=='threed'"></Icon>
                <Icon type="md-musical-notes" size="20" v-else-if="type=='music'"></Icon>
                <Icon type="ios-videocam" size="20" v-else-if="type=='vdieo'"></Icon>
            </div>
        </Upload>
        <div style="width: 58px;height:58px;line-height: 58px;"  v-if="type=='img'">
            <Button type="primary" size="small" @click="preview" style="float: left; margin-left: 10px; margin-top: 17px">预览</Button>
        </div>
        <!-- <Modal title="View Image" v-model="visible">
            <img :src="'https://img.jbzj.com/file_images/article/201806/201862785813429.png?201852785843'" v-if="visible" style="width: 100%">
        </Modal> -->
        <Modal v-model="visible" :fullscreen="fullscreen">
            <p slot="header" style="color:#999;">
                <span>{{uploadList&&uploadList[indexPic]&&uploadList[indexPic].name}}</span>
                <Icon type="ios-expand" @click.native="fullModel()" class="ivu-modal-full" />
            </p>
            <img :src="uploadList[indexPic].url" v-if="visible" style="width: 100%">
            <div slot="footer">
                <Button type="primary" size="small" @click="prePic">上一张</Button>
                <Button type="primary" size="small" @click="nextPic">下一张</Button>
            </div>
        </Modal>
        <Modal v-model="visiblePreview" :fullscreen="fullscreen">
            <HtmlEditor></HtmlEditor>
        </Modal>
    </div>
</template>

<script>
import {
    Upload,
    Progress,
} from "view-design";
const htmlEditor = ()=>import("@components/public/htmlEditor/htmlEditor");

export default {
    components: {
        Upload,
        Progress,
        HtmlEditor:htmlEditor
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
        disabled: {
            type: Boolean,
            default: false
        },
        type:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: [],
            indexPic: 0,
            format:[],
            typeName:'',
            maxSize: 0,
            fullscreen: false,
            visiblePreview: false,
        }
    },
    methods: {
        handleView(name,index) {
            this.imgName = name;
            this.visible = true;
            this.indexPic = index;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            file.url = 'https://img.jbzj.com/file_images/article/201806/201862785813429.png?201852785843';
            this.handleInput(file);
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '上传文件格式错误',
                desc: '文件 ' + file.name + '不是'+this.typeName+'格式'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
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
            this.$emit('change', this.uploadList)
        },
        prePic(){
            this.indexPic = (this.indexPic - 1) > -1 ? this.indexPic - 1 : 0;
            if(this.indexPic ==0 ){
                this.$Message.info({content:'温馨提示：已到第一张！'});         
            }
        },
        nextPic(){
            this.indexPic = (this.indexPic + 1) < this.uploadList.length-1 ? this.indexPic + 1 : this.uploadList.length-1; 
            if(this.indexPic == this.uploadList.length-1 ){
                this.$Message.info({content:'温馨提示：已到最一张！'});         
            }      
        },
        fullModel() {
            this.fullscreen = this.fullscreen ? false : true;
        },
        save(){},
        preview(){
            this.visiblePreview = true;
        }
    },
    created(){
        if(this.type=="img"){
            this.format = ['jpg','jpeg','png'];
            this.typeName = '图片';
            this.maxSize = 10240;
        } else if(this.type=="music"){
            this.format = ['mp3'];
            this.typeName = '音频';
            this.maxSize = 10240;
        } else if(this.type=="vdieo"){
            this.format = ['mp4','rmvb','mov'];
            this.typeName = '视频';
            this.maxSize = 10240;
        } else if(this.type=="threed"){
            this.format = ['3ds'];
            this.typeName = '3d';
            this.maxSize = 10240;
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>

<style lang="less" scoped>
.upload {
    display: flex;
    .demo-upload-box{
        width: 100px;
        height: 110px;
        
        .demo-upload-list {
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        }
        .text{
            font-size: 12px;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            word-break: keep-all;
            text-align: center;
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
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
    }
}
</style>
