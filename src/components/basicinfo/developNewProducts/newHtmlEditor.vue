<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-11 15:50:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-10 22:41:15
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
      >
    </quill-editor>
    <div style="width:100%;margin-top:10px">
        <Button @click="clearFormData" style="float: right;">取消</Button>
        <Button type="primary" @click="save" style="float: right; margin-right:10px">保存</Button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NewHtmlEditor',
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
    return {
        content:'',
        editorOption: {
        placeholder: "请在这里输入",
        str:'',
        modules:{
            toolbar:[
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
            ]}  
        },
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
    },
    computed: {
        editor() {
            // return this.$refs.myQuillEditor.quill;
        },
    },
    mounted() {
        // if(this.cfg.readOnly){
        //   this.$refs.myQuillEditor.quill.enable(false); //禁用
        // }
    },
    created() {

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
</style>
