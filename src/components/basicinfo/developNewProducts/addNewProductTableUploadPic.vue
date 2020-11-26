<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-11 19:04:49
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-26 14:54:05
-->
<template>
<div>
    <div>
        <div style="height:28px">
            <div style="float:left;font-size: 16px;">
                <Icon type="md-image" />商品图片
            </div>
        </div>
        <div style="width:100%">
            <div v-for="(item,index) in uploadList" class="left demo-upload">
                <div class="demo-upload-list">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name,index)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <div style="width:120px">{{item.name}}</div>
            </div>
            <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:78px;">
                <div style="width: 120px;height:120px;line-height: 120px;">
                    <Icon type="ios-camera" size="30"></Icon>
                </div>
            </Upload>
            <Modal :title="uploadList&&uploadList[indexPic]&&uploadList[indexPic].name" v-model="visible" fullscreen>
                <!--<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">-->
                <img :src="uploadList[indexPic].url" v-if="visible" style="width: 100%">
                <div slot="footer">
                    <Button type="primary" size="small" @click="prePic">上一张</Button>
                    <Button type="primary" size="small" @click="nextPic">下一张</Button>
                </div>
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
    Icon
} from "view-design";
export default {
    components: {
        Upload,
        Modal,
        Progress,
        Icon
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
            visible: false,
            uploadList: [],
            indexPic: 0,
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
            //file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            this.handleInput(file);
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
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
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
</style>
