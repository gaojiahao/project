<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-11 15:50:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-01 15:08:06
-->
<template>
  <div class="editor-container">
    <quill-editor v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
      @click.native="onClick()"
      :class="[disabled ? 'is-disabled' : '']"
      >
    </quill-editor>
    <Upload
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png','bmp','gif','raw','tif','webp','wmf','3GP','ASF','AVI','MOV',
        'MPEG','WMV','mp4',]"
        multiple
        :max-size="10240000" 
        :on-format-error="handleFormatError" 
        :on-exceeded-size="handleMaxSize" 
        type="drag" 
        :action="'//'+`${uploadUrl}`+'/api/InsertPic'" 
        :headers="headers"
        >
        <Button icon="ios-cloud-upload-outline" ></Button>
    </Upload>
    <div style="width:100%;margin-top:10px" v-if="!disabled">
        <Button @click="clearFormData" style="float: right;">取消</Button>
        <Button type="primary" @click="save" style="float: right; margin-right:10px">保存</Button>
    </div>
  </div>
</template>

<script>
import tokenService from "@service/tokenService";
import Video from "@plugins/quil/video.js";
import {
    Upload,
    Modal,
    Progress,
} from "view-design";
import { Quill } from 'vue-quill-editor';
Quill.register(Video,true);
export default {
    name: 'NewHtmlEditor',
    components: {
        Upload,
        Modal,
        Progress,
    },
    model: {
        prop: 'value', 
        event: 'change' 
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        value:{        
            handler(val){
                this.content = val;
            }
        }
    },
    data() {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
            [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
            [{ 'direction': 'rtl' }],             // 文本方向
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式
            ['clean'],    //清除字体样式
            ['image','video']    //上传图片、上传视频
        ];
        return {
            content:'',
            editorOption: {
                placeholder: "请在这里输入",
                str:'',
                modules:{
                    toolbar:{ 
                        container: toolbarOptions,  // 工具栏
                        handlers: {
                            'image': function (value) {
                                if (value) {
                                    // 调用iview图片上传
                                    document.querySelector('.ivu-upload .ivu-btn').click();
                                } else {
                                    this.quill.format('image', false);
                                }
                            },
                            'video': function(value){
                                if (value) {
                                    // 调用iview图片上传
                                    document.querySelector('.ivu-upload .ivu-btn').click();
                                } else {
                                    this.quill.format('video', false);
                                }
                            }
                        }
                    }
                }
            },
            headers:{},
            baseUrl:'',
        }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(quill){
            // this.setValue(this.content);
        } ,
        onEditorFocus(quill){
        },
        onEditorReady(quill){
        },
        onEditorChange({ quill, html, text }) {
            // this.content = html
            // this.setValue(this.content);
        },
        onClick(){
            // this.$refs.myQuillEditor.quill.focus();
        },
        clearFormData(){
            this.$emit('clear',this.value);
        },
        save(){
            this.$emit('save',this.content);
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '上传文件格式错误',
                desc: '文件 ' + file.name + '不是图片格式'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件上传大小限制',
                desc: '文件  ' + file.name + '超出100M'
            });
        },
        handleSuccess(res, file) {
            debugger
            let quill = this.$refs.myQuillEditor.quill
            if(res.result.code==200){
                 let length = quill.getSelection().index;
                // 插入图片，res为服务器返回的图片链接地址
                for(var i=0;i<res.result.item.length;i++){
                    var fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
                    if(['jpg','jpeg','png','bmp','gif','raw','tif','webp','wmf'].indexOf(fileType)!=-1){
                        quill.insertEmbed(length, 'image', this.baseUrl + res.result.item[i].filePath);
                        // 调整光标到最后
                        length++;
                        quill.setSelection(length);
                    } else if(['3GP','ASF','AVI','MOV','MPEG','WMV','mp4'].indexOf(fileType)!=-1) {
                        quill.insertEmbed(length, 'video', this.baseUrl + res.result.item[i].filePath);
                        // 调整光标到最后
                        length++;
                        quill.setSelection(length);
                    }
                }
            } else {
                this.$Notice.warning({
                    title: '上传失败',
                    desc: res.result.msg
                });    
            }
        },
    },
    computed: {
        editor() {
            // return this.$refs.myQuillEditor.quill;
        },
    },
    mounted() {
        if(this.disabled){
          this.$refs.myQuillEditor.quill.enable(false); //禁用
        }
    },
    created() {
        this.uploadUrl = this.$upload_url?this.$upload_url:'localhost:8080';
        this.headers['Utoken'] =  tokenService.getToken();
        this.baseUrl = this.$base_url;
    }
}
</script>

<style lang="less" scoped>
.editor-container {
  margin-top:5px;
}
.editor-container /deep/ .quill-editor /deep/ .ql-container /deep/ {
  height: 600px;
}
.ivu-upload {
    display: none;
}
</style>
