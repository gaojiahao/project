<template>
<div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="baseUrl + item.filePath">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.fileName,index)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(index)" v-if="!disabled"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
     <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="formats" :max-size="10240000" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" :action="'//'+`${uploadUrl}`+'/api/InsertPic'" :headers="headers" style="display: inline-block;width:60px;" v-if="!disabled">
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
        length: {
            type:Number,
            default:3,
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        value:{
            handler(val){
                this.uploadList = [];
                for(var i=0;i<val.length;i++){
                    var obj={};
                    obj= {
                        ...val[i],
                        status:'finished',
                    }
                    if(obj.filePath){
                        this.uploadList.push(obj);
                    }
                }
            },
            deep:true,
            immediate:true
        },  
    },
    data() {
        return {
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: [],
            indexPic: 0,
            uploadUrl:'',
            headers:{
                // 'Content-Type':'multipart/form-data'
            },
            data:{
                'BusinessType':''
            },
            formats:['jpg','jpeg','png','bmp','gif','raw','tif','webp','wmf','3GP','ASF','AVI','MOV',
            'MPEG','WMV','mp4','AAC','AIFF','AMR','FLAC','MIDI','mpeg','WMA','mp3','3dm','3ds','asm',
            'ade','drw','dwg','max','obj','prt','stl','stp','x-t','igs']
        }
    },
    methods: {
        handleView(name,index) {
            this.imgName = name;
            this.visible = true;
            this.indexPic = index;
        },
        handleRemove(index) {
            this.uploadList.splice(index, 1);
        },
        handleSuccess(res, file) {
            if(res.result.code==200){
                file.filePath = res.result.item[0]['filePath'];
                this.handleInput(file);
            } else {
                this.$Notice.warning({
                title: '上传失败',
                desc: res.result.msg
            });    
            }
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '上传文件格式错误',
                desc: '文件 ' + file.name + '不是图片格式'
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
                    title: '已达到图片最大上传数！'
                });
            }
            return check;
        },
        handleInput(data) {
            this.uploadList.push(data); 
            this.$emit('change', this.uploadList);
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
        save() {
            this.$emit('save',this.uploadList);
        },
    },
    created(){
        this.uploadUrl = this.$upload_url?this.$upload_url:'localhost:8080';
        this.headers['Utoken'] =  tokenService.getToken();
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
