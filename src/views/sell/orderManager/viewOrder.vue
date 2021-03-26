<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-26 12:11:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-26 15:07:00
-->
<template>
    <div class="addFinishProduct">
        <div class="top">
            <Divider orientation="left" size="small">订单信息</Divider>
            <div class="top_tabale">
                <ViewForm :formValidate="formValidate" :ruleValidate="ruleValidate" :formConfig="formConfig" ref="form">
                    <template slot="button">
                        <FormItem>
                            <div style="width:100%">
                                <Button @click="goReturn" style="float: left">返回</Button>
                            </div>
                        </FormItem>
                    </template>
                </ViewForm>
            </div>
        </div>
    </div>
</template>

<script>
import ViewForm from "@components/public/form/viewForm";
import config from "@views/sell/orderManager/viewOrderConfig";
import {
    CreateRecommendGoods,
    UpdateRecommendGoods,
    AliExpressOrderByID
} from "@service/sellService"
export default {
    name: "viewOrder",
    components: {
        ViewForm,
    },
    data() {
        return {

        }
    },
    mixins: [config],
    methods: {
        goReturn(){
            this.$router.go(-1);
        },
        getFormData(){
            this.id = this.$route.query.id;
            if(this.id) {
                return new Promise((resolve, reject) => {
                    AliExpressOrderByID({id:this.id}).then(res => {
                        if (res.result.code == 200) {
                            this.$FromLoading.hide();
                            this.formValidate = {
                                id: res.result.item.id,
                                orderCode: res.result.item.orderCode,
                                warehouse: res.result.item.warehouse,
                                buyerName: res.result.item.buyerName,
                                telephone: res.result.item.telephone,
                                phoneNumber: res.result.item.phoneNumber,
                                areaAdd: res.result.item.areaAdd,
                                postcode: res.result.item.postcode,
                                country: res.result.item.country,
                                shippingMethod: res.result.item.shippingMethod,
                                trackingNumber: res.result.item.trackingNumber,
                                receivingAddress1: res.result.item.receivingAddress1,
                                receivingAddress2: res.result.item.receivingAddress2,
                                city: res.result.item.city,
                                province: res.result.item.province,
                                productPrice: res.result.item.productPrice,
                                productCurrency: res.result.item.productCurrency,
                                logisticsName: res.result.item.logisticsName,
                                freight: res.result.item.freight,
                                freightCurrency: res.result.item.freightCurrency,
                                orderAmount: res.result.item.orderAmount,
                                orderCurrency: res.result.item.orderCurrency,
                                paidAmout: res.result.item.paidAmout,
                                paidCurrency: res.result.item.paidCurrency,
                                paidDate: res.result.item.paidDate,
                                orderStatus: res.result.item.orderStatus,
                                packageNumber: res.result.item.packageNumber,
                                tongtuSku: res.result.item.tongtuSku,
                                tongtuSkuName: res.result.item.tongtuSkuName,
                                tongtuSkuWeight: res.result.item.tongtuSkuWeight,
                                tongtuSkuNumber: res.result.item.tongtuSkuNumber,
                                tongtuProductRemark: res.result.item.tongtuProductRemark,
                                platformSku: res.result.item.platformSku,
                                platformSkuNumber: res.result.item.platformSkuNumber,
                                orderRemark: res.result.item.orderRemark,
                            }
                        } else if (res.result.code == 400) {
                            this.$Message.error({
                                background: true,
                                content: res.result.msg
                            });
                        }
                    });
                });    
            }
        },
    },
    created() {
        this.getFormData();
    }
}
</script>
<style lang="less" scoped>
@import "~@less/form.less";
</style>