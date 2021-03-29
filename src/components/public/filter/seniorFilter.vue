<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:35:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 14:46:11
-->
<template>
<Modal v-model="show" title="高级筛选" @on-ok="ok" @on-cancel="cancel" width="800" draggable >
    <p slot="header" style="color:#515a6e;">
        <span>高级筛选</span>
        <Icon :type="type" @click.native="fold()" class="ivu-modal-full" />
    </p>
    <Form ref="formValidate" :model="formValidate" :label-width="120">
        <template v-for="(item, index) in formConfig">
            <FormItem :label="formConfig[index]['name']" :prop="index" v-if="formConfig[index]&&formConfig[index]['type']=='text'">
                <Input v-model="formValidate[index]" :style="{width:'200px'}"></Input>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='radio'">
                <RadioGroup v-model="formValidate[index]">
                    <template v-for="(ditem,dIndex) in formConfig[index]['dataSource']['data']">
                        <Radio :label="ditem.value" :key="ditem.value">
                            {{ditem.name}}
                        </Radio>
                    </template>
                </RadioGroup>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="(formConfig[index]&&formConfig[index]['type']=='select')&&!formConfig[index]['hidden']">
                <Select v-model="formValidate[index]" :style="{width:'200px',float: 'left'}" clearable :multiple="formConfig[index]['dataSource']['multiple']" filterable :disabled="formConfig[index]['disabled']" :label-in-value='true' v-show="!formConfig[index]['hidden']" @on-select="onChange">
                    <Option v-for="item in formConfig[index]['dataSource']['data']" :value="item.value" :key="item.id" :tag="index">{{ item[formConfig[index]['displayField']]||item.name }}<template v-if="formConfig[index]['haveName']">-{{item[formConfig[index]['haveName']]}}</template></Option>
                </Select>
                <span style="margin-left:10px">{{formConfig[index]['unit']}}</span>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='dateTime'">
                <DatePicker v-model="formValidate[index]" @on-change="formValidate[index]=$event" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="" style="width: 400px"></DatePicker>
            </FormItem>
            <FormItem :label="formConfig[index]['name']" :prop="index" v-else-if="formConfig[index]&&formConfig[index]['type']=='checkbox'">
                <CheckboxGroup v-model="formValidate[index]" v-show="!formConfig[index]['hidden']" :editable="formConfig[index]['disabled']">
                    <template v-for="(item,index) in formConfig[index]['dataSource']['data']">
                        <Checkbox :label="item.value">{{item.name}}</Checkbox>
                    </template>
                </CheckboxGroup>
            </FormItem>
        </template>
    </Form>
    <div slot="footer">
        <Button @click="clearData">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')">筛选</Button>
    </div>
</Modal>
</template>

<script>
import $flyio from '@plugins/ajax';

export default {
    name: 'SeniorFilter',
    props: {
        formConfig: {
            type: Object,
            default () {
                return {}
            }
        },
        showFilterModel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            data: {},
            show: false,
            formValidate:{},
            showFlod: false,
        }
    },
    computed:{
        type(){
            return this.showFlod ? 'md-arrow-dropup':'md-arrow-dropdown';
        }
    },
    watch: {
        showFilterModel: {
            handler(val) {
                this.show = val
                this.initEL('input');
            }
        },
    },
    methods: {
        ok() {

        },
        cancel() {
            this.$emit('show-filter', false);
        },
        clearData(){
            this.$refs['formValidate'].resetFields();
        },
        handleSubmit() {
            this.$emit('set-filter', this.formValidate);
            this.$emit('show-filter', false);
        },
        initEL(type) {
            var controls = this.$el.getElementsByTagName(type);
            for (var i = 0; i < controls.length; i++) {
                if (i == 0 && controls[i].type == 'text') { //第一个输入框获取焦点
                    setTimeout(() => {
                        controls[0].focus();
                    }, 1000);
                }
            }
        },
        initClick() {
            this.initEL('input');
            var inputGroup = this.$el.getElementsByTagName("input");
            var inputGroupArr = Array.from(this.$el.getElementsByTagName("input"));
            var buttonGroup = this.$el.getElementsByTagName("button")[0];
            var iGlength = inputGroupArr.length;
            document.onkeypress = function (e) {
                var e = event || e;
                var idx = inputGroupArr.indexOf(e.srcElement);
                if ((e.keyCode == 13 || e.which == 13) && idx > -1) {
                    if (idx == iGlength - 1) { //表明已经是最后一个输入框
                        buttonGroup.focus();
                    } else {
                        inputGroup[idx + 1].focus();
                    }
                    e.preventDefault();
                }
            }
        },
        fold(){
            this.showFlod = this.showFlod ? false : true;
            var controls = this.$el.getElementsByClassName('ivu-modal-body');
            var controls2 = this.$el.getElementsByClassName('ivu-modal-footer');
            if(this.showFlod){
                controls[0].style.display = 'none';
                controls2[0].style.display = 'none';
            } else {
                controls[0].style.display = 'block';
                controls2[0].style.display = 'block';    
            }
        },
        async initForm(){
            for(var item in this.formConfig){
                var form = this;
                
                if(this.formConfig[item].bind&&this.formConfig[item].bind.bindValue){
                    var valueField = this.formConfig[item].bind.bindValue;
                    form.$on('value-change-' + item,function(data){
                        this.formValidate[this.formConfig[data.tag].bind.target] = data.label;
                    })
                }
                if(this.formConfig[item].hiddenFun){
                    form.$on('on-change-' + item,function(item){
                        form.formConfig[item.data].hiddenFun(item.event);
                    })
                    this.radioOnChangeFun(item,form.formValidate[item]);
                }
                if((['select'].indexOf(this.formConfig[item].type)!=-1)&&this.formConfig[item].dataSource.type=='dynamic'&&this.formConfig[item].dataSource.url){
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
        },
    },
    mounted() {
        this.initClick();
    },
    created(){
        this.initForm();
    }
}
</script>

