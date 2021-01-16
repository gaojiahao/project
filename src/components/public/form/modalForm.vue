<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 19:21:48
-->
<template>
<Modal v-model="show" :title="titleText" @on-ok="ok" @on-cancel="cancel" width="800" class="model_box">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <template v-for="(item, index) in formValidate">
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='text')&&!formConfig[index]['hidden']">
                <Input v-model="formValidate[index]" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" :maxlength="formConfig[index]['length']||20"></Input>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="(formConfig[index]&&formConfig[index]['type']=='number')&&!formConfig[index]['hidden']">
               <Input v-model="formValidate[index]" type="number" :number="true" :style="{width:'200px'}" :disabled="formConfig[index]['disabled']" ></Input><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--数值控件-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='numbers'">
                <InputNumber v-model="formValidate[index]" :style="{width:'200px'}" :editable="formConfig[index]['disabled']" :precision="formConfig[index]['precision']" v-show="!formConfig[index]['hidden']"></InputNumber><span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='radio'">
                <RadioGroup v-model="formValidate[index]">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value" :key="ditem.value" :disabled="formConfig[index]['disabled']">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='select'">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable :disabled="formConfig[index]['disabled']" :label-in-value='true' v-show="!formConfig[index]['hidden']" @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id" :tag="index">{{ item.name }}</Option>
                </Select>
                <span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <!--图片上传-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='uploadImage'">
                <UploadImg v-model="formValidate[index]" :disabled="formConfig[index]['disabled']" v-show="!formConfig[index]['hidden']"></UploadImg>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTime'">
                <DatePicker type="date" placeholder="" style="width: 200px"></DatePicker> 
            </FormItem>
            <!--单项选择器-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectorSingle'">
                <SelectorSingle v-model="formValidate[index]" :config="formConfig[index]"></SelectorSingle>
            </FormItem>
            <!--多项选择器-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectorMulti'">
                <SelectorMulti v-model="formValidate[index]" :config="formConfig[index]"></SelectorMulti>
            </FormItem>
            <!--文本域-->
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='textarea'">
                <Input v-model="formValidate[index]" type="textarea" :autosize="{minRows: 5,maxRows: 10}" :style="{width:'400px'}" :disabled="formConfig[index]['disabled']" />
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTimes'">
                <DatePicker v-model="formValidate[index]" @on-change="formValidate[index]=$event" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="" style="width: 400px" :disabled="formConfig[index]['disabled']"></DatePicker>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='selectMultiField'">
                <!-- <Select v-model="formValidate[index]" filterable multiple :disabled="formConfig[index]['disabled']" style="{width:'400px',float: 'left'}">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable :disabled="formConfig[index]['disabled']" :label-in-value='true' v-show="!formConfig[index]['hidden']" @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </template>
    </Form>
    <div slot="footer">
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    </div>
</Modal>
</template>

<script>
import SelectorSingle from '@components/public/xSelect/selectorSingle'
import SelectorMulti from '@components/public/xSelect/selectorMulti'
import UploadImg from '@components/public/upload/uploadImg';
import $flyio from '@plugins/ajax'

export default {
    name: 'ModalForm',
    components: {
        SelectorSingle,
        SelectorMulti,
        UploadImg
    },
    props: {
        titleText: {
            type: String,
            default: '',
        },
        formValidate: {
            type: Object,
            default () {
                return {}
            }
        },
        ruleValidate: {
            type: Object,
            default () {
                return {}
            }
        },
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        showModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: {},
            show: false
        }
    },
    watch: {
        formConfig: {
            handler(val) {

            }
        },
        showModel: {
            handler(val) {
                this.show = val
                this.initEL('input');
            }
        },
        formValidate: {
            handler(val) {

            }
        }
    },
    methods: {
        ok() {

        },
        cancel() {
            this.$emit('clear-form-data');
            this.$emit('show-pop', false);
            this.$refs['formValidate'].resetFields();
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('save');
                    this.$emit('show-pop', false);
                    this.$emit('clear-form-data');
                } else {
                    this.$Message.error('保存失败');
                }
            })
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text') { //第一个输入框获取焦点
                    setTimeout(() => {
                        controls[0].focus();
                        // console.log(controls[0]);
                    }, 1000);
                }
            }
        },
        initClick() {
            this.initEL('input');
            var inputGroup = this.$el.getElementsByTagName("input");
            // for(var i=0;i<inputGroup.length;i++){
            //     console.log(inputGroup[i].value)
            // }
            var inputGroupArr = Array.from(this.$el.getElementsByTagName("input"));
            var buttonGroup = this.$el.getElementsByTagName("button")[0];
            var iGlength = inputGroupArr.length;
            var model_box = document.getElementsByClassName("model_box")[0];
            model_box.onkeypress = function (e) {
                var e = event || e;
                // console.log(inputGroupArr.indexOf(e.srcElement));
                var idx = inputGroupArr.indexOf(e.srcElement);
                // console.log(e, e.keyCode, e.srcElement, e.which);
                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    // console.log(idx)
                    if (idx == iGlength - 1) { //表明已经是最后一个输入框
                        buttonGroup.focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
                // console.log(e, e.keyCode, e.srcElement, e.which);
            }
        },
        //for循环异步处理
        async initForm(){
            for(var item in this.formConfig){
                var form = this;
                
                if(this.formConfig[item].bind&&this.formConfig[item].bind.bindValue){
                    var valueField = this.formConfig[item].bind.bindValue;
                    form.$on('value-change-' + item,function(data){
                        this.formValidate[this.formConfig[data.tag].bind.target] = data.label;
                    })
                }
                if((['select','selectCustom'].indexOf(this.formConfig[item].type)!=-1)&&this.formConfig[item].dataSource.type=='dynamic'){
                    var parmas = this.formConfig[item].dataSource.parmas ? this.formConfig[item].dataSource.parmas:{};
                    await $flyio.post({
                        url: this.formConfig[item].dataSource.url,
                        data:{ ...parmas,maxResultCount:200}
                    }).then((res) => {
                        if(res.result.code==200){
                            if(this.formConfig[item].dataSource.col){
                                var data = res.result.item.map((e,index)=>{
                                    for(var i=0;i<this.formConfig[item].dataSource.col.length;i++){
                                        e[this.formConfig[item].dataSource.col[i]['k']] = e[this.formConfig[item].dataSource.col[i]['v']];
                                    }
                                    return e;
                                });    
                            } else {
                                var data = res.result.item.map((e,index)=>{
                                    e.value = e.id;
                                    return e;
                                });
                            }
                            this.formConfig[item].dataSource.data = data;
                        }
                    })
                }
            }   
        },
        onChange(data){
            this.$emit('value-change-'+data.tag,data);
        }
    },
    mounted() {
        this.initClick();
    },
    created(){
        this.initForm();
    }
}
</script>

