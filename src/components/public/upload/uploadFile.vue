<template>
<div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" v-if="['jpg','jpeg','png','bmp','gif'].indexOf(item.type)!=-1">
        <template v-if="item.status === 'finished'">
            <Poptip trigger='hover' content="content" placement="right" :transfer="true">
                <img :src="baseUrl + item.filePath">
                <img slot="content" :src="baseUrl + item.filePath" style="width:300px;height:300px" />
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.fileName,index)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(index)" v-if="!disabled"></Icon>
                </div>
            </Poptip>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage"></Progress>
        </template>
    </div>
    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="formats" :max-size="10240000" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-progress="handleProgress" multiple type="drag" :action="'//'+`${uploadUrl}`+'/api/InsertPic'" :headers="headers" style="display: inline-block;width:60px;" v-if="!disabled">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-add" size="20"></Icon>
        </div>
    </Upload>
    <div class="demo-upload-file-list" v-for="(item,index) in uploadList" v-if="['jpg','jpeg','png','bmp','gif'].indexOf(item.type)==-1">
        <template v-if="item.status === 'finished'">
            <template>
                <a :href="baseUrl + item.filePath" class="text" target="_blank">{{item.name}}</a><Button type="error" size="small" icon="ios-close" @click="handleRemove(index)" class="marginRight" v-if="!disabled" style="margin-left:10px"></Button>
            </template>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage"></Progress>
        </template>
    </div>
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
    name: 'UploaFile',
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
                this.uploadList = val;
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
            formats:['jpg','jpeg','png','bmp','gif','psd','wmf','3GP','ASF','AVI','MOV',
            'MPEG','WMV','mp4','AAC','AIFF','AMR','FLAC','MIDI','mpeg','WMA','mp3','3dm','3ds','asm',
            'ade','drw','dwg','max','obj','prt','stl','stp','x-t','igs','rar','zip','7z']
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
            this.$emit('change', this.uploadList);
        },
        handleSuccess(res, file) {
            if(res.result.code==200){
                file.filePath = res.result.item[0]['filePath'];
                file.type = file.name.substring(file.name.lastIndexOf('.') + 1);
                this.handleInput(file);
                this.$FromLoading.hide();
            } else {
                this.$Notice.warning({
                    title: '上传失败',
                    desc: res.result.msg
                });
                this.$FromLoading.hide();
            }
        },
        handleFormatError(file) {
            this.$FromLoading.hide();
            this.$Notice.warning({
                title: '上传文件格式错误',
                desc: '文件 ' + file.name + '不是指定的上传格式'
            });
        },
        handleMaxSize(file) {
            this.$FromLoading.hide();
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload() {
            this.$FromLoading.show();
        },
        handleInput(data) {
            if(this.checkFile(data)){
                this.uploadList.push(data);     
            }
            // this.uploadList.push(data); 
            this.$emit('change', this.uploadList);
        },
        checkFile(data){
            for(var i=0;i<this.uploadList.length;i++){
                if(this.uploadList[i]['name']==data.name){
                    return false;
                }
            }
            return true;
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
            const check = this.uploadList.length <= this.length;
            if (!check) {
                this.$Notice.warning({
                    title: '已达到最大上传数'+this.length+'个文件！'
                });
            } else{
                this.$emit('save',this.uploadList);
            }
        },
        downLoadFile(item){
            var url = this.baseUrl+item.filePath;
            window.location.href = url;
        },
        handleProgress(event, file, fileList){
            this.uploadList=this.uploadList.concat(file);
            // console.log('上传中', event); // 继承了原生函数的 event 事件
            // console.log('上传中 file', file); // 上传的文件
            // console.log('上传中 fileList', fileList); // 上传文件列表包含file
            // 调用监听 上传进度 的事件
            event.target.onprogress = (event) => {
                let uploadPercent = parseFloat(((event.loaded / event.total) * 100).toFixed(2));	// 保留两位小数，具体根据自己需求做更改
            
                // 手动设置显示上传进度条 以及上传百分比
                file.showProgress = true;
                file.percentage = uploadPercent;
                this.$FromLoading.show();
            }
        }
    },
    created(){
        this.uploadUrl = this.$upload_url?this.$upload_url:'localhost:8080';
        this.headers['Utoken'] =  tokenService.getToken();
        this.baseUrl = this.$base_url;
    },
    mounted () {
        //this.uploadList = this.$refs&&this.$refs.upload&&this.$refs.upload.fileList||[];
    }

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

.demo-upload-file-list{
}

.demo-upload-list img {
    width: 60px;
    height: 60px;
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
