<template>
<div>
    <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="baseUrl + item.filePath">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="!disabled"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
     <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="'//'+`${uploadUrl}`+'/api/InsertPic'" :headers="headers" style="display: inline-block;width:60px;" v-if="!disabled">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal :title="uploadList&&uploadList[indexPic]&&uploadList[indexPic].fileName" v-model="visible" fullscreen>
        <img :src="baseUrl + uploadList[indexPic].filePath" v-if="visible" style="width: 100%">
        <div slot="footer">
            <Button type="primary" size="small" @click="prePic">上一张</Button>
            <Button type="primary" size="small" @click="nextPic">下一张</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import {
    Upload,
    Progress,
} from "view-design";
import tokenService from "@service/tokenService";

export default {
    components: {
        Upload,
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
        disabled: {
            type: Boolean,
            default: false
        },
        length: {
            type:Number,
            default: 9
        }
    },
    watch:{
        value:{
            handler(val){
                this.uploadList = [];
                for(var i=0;i<val.length;i++){
                    var obj={};
                    obj= {
                        status:'finished',
                        filePath:val[i].url,
                    }
                    if(obj.filePath){
                        this.uploadList.push(obj);
                    }
                }
            }
        }    
    },
    data() {
        return {
            defaultList: [],
            visible: false,
            indexPic: 0,
            imgName: '',
            uploadList: [],
            headers:{
                'Content-Type':'multipart/form-data'
            },
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
            this.handleInput(file);
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < this.length;
            if (!check) {
                this.$Notice.warning({
                    title: '温馨提示：已达到最大上传数！'
                });
            }
            return check;
        },
        handleInput(data) {
            for(var i=0;data.length;i++){
                this.uploadList.push(data[i]); 
            }
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
    },
    created(){
        this.baseUrl = this.$base_url;
    },
}
</script>

<style>
.demo-upload-list {
    display: inline-block;
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
    margin-right: 4px;
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
</style>
