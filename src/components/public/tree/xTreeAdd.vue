<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-04 20:23:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-06 09:43:27
-->
<template>
<div>
    <Modal v-model="modal" title="分配权限" @on-ok="ok" @on-cancel="cancel" width="800">
        <div style="overflow-y: scroll;height: 600px;position: relative;">
            <Tree :data="datas" show-checkbox multiple @on-check-change="selectChangeAll" ref="tree"></Tree>
            <!-- <Tree :data="datas" show-checkbox multiple @on-check-change="selectChangeAll" ref="tree" :check-strictly="true"></Tree> -->
        </div>
    </Modal>
</div>
</template>

<script>
import {
    AuthModuleList,
} from "@service/settingsService"
export default {
    name: 'XTreeAdd',
    props:{
        roleAuthData: {
            type: Array,
            default () {
                return []
            }
        },
        showModel:{
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            datas:[],
            modal:false,
            selected:[],
            menuData:[]
        }
    },
    watch:{
        showModel:{
            handler(val){
                this.modal = val;
            },
        },
        roleAuthData:{
            handler(val){
                this.datas = this.menuData;
                this.calleArr(this.datas);
            }
        }
    },
    methods: {
        selectChangeAll(selectedAll1, selectedItem) {
            // this.selected = [];
            // for(var i=0;i<selectedAll1.length;i++){
            //     this.selected.push(selectedAll1[i].id);
            // }
        },
        calleArr: function(data){
            for(var i in data){
                data[i] = {
                    ...data[i],
                    title:data[i].name
                }
                if(data[i]['code']=='index'){
                    data[i]['checked'] = true;    
                }
                for(var j=0;j<this.roleAuthData.length;j++){
                    if(this.roleAuthData[j]==data[i]['id']){
                        data[i]['checked'] = true;
                        if(data[i].children&&data[i].children.length)
                            data[i]['expand'] = true;
                        this.selected.push(data[i].id);
                    }    
                }
                if(data[i].children&&data[i].children.length){
                    data[i]['checked'] = false;
                    this.calleArr(data[i].children);
                }
            }
        },
        cancel(){
            this.$emit('show-modal',false);
            this.AuthModuleList();
            this.selected=[];
        },
        ok(){
            this.selected = [];
            var selectedAll1 = this.$refs.tree.getCheckedAndIndeterminateNodes();
            for(var i=0;i<selectedAll1.length;i++){
                this.selected.push(selectedAll1[i].id);
            }
            this.$emit('save-menu',this.selected);
            this.$emit('show-modal',false);
            this.AuthModuleList();
            this.selected=[];
        },
        AuthModuleList(){
            return new Promise((resolve, reject) => {
                AuthModuleList().then(res => {
                    if(res.result.code==200){
                        this.$nextTick(() => {
                            this.menuData = res.result.item;
                        });
                    }
                });
            });
        },
        checkSelectItem(item){
            for(var i=0;i<this.selected.length;i++){
                if(item.id==this.selected[i]){
                    return false;
                }
            }
            return true;
        }
    },
    created() {
        this.AuthModuleList();
    }
}
</script>

<style scoped>
.demo-tree-render .ivu-tree-title {
    width: 100%;
}
</style><style lang="less" scoped>
.ivu-tree /deep/ {
    width: 600px;
}
</style>
