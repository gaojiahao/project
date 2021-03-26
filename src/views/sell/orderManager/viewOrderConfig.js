/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-26 15:06:47
 */
export default {
    data() {
      const categoryIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择类目'));
        } else {
          callback();
        }
      };
      return {
        formConfig:{
          orderCode:{
            name:'订单号',
            type:'text',
          },
          warehouse:{
            name:'仓库',
            type:'text',
          },
          buyerName:{
            name:'买家姓名',
            type:'text',
          },
          telephone:{
            name:'联系电话',
            type:'text',
          },
          phoneNumber:{
            name:'手机',
            type:'text',
          },
          areaAdd:{
            name:'收件人国家/地区 (收货地址简称)',
            type:'text',
          },
          postcode:{
            name:'收件人识别编码',
            type:'text',
          },
          country:{
            name:'国家/地区',
            type:'text',
          },
          shippingMethod:{
            name:'邮寄方式',
            type:'text',
          },
          trackingNumber:{
            name:'跟踪号',
            type:'text',
          },
          receivingAddress1:{
            name:'收货地址1',
            type:'text',
          },
          receivingAddress2:{
            name:'收货地址2',
            type:'text',
          },
          city:{
            name:'城市',
            type:'text',
          },
          province:{
            name:'省/州',
            type:'text',
          },
          productPrice:{
            name:'产品金额',
            type:'text',
          },
          productCurrency:{
            name:'产品金额币种',
            type:'text',
          },
          logisticsName:{
            name:'物流商',
            type:'text',
          },
          freight:{
            name:'运费',
            type:'text',
          },
          freightCurrency:{
            name:'运费币种',
            type:'text',
          },
          orderAmount:{
            name:'订单金额',
            type:'text',
          },
          orderCurrency:{
            name:'订单金额币种',
            type:'text',
          },
          paidAmout:{
            name:'实付金额',
            type:'text',
          },
          paidCurrency:{
            name:'实付币别',
            type:'text',
          },
          paidDate:{
            name:'付款日期',
            type:'text',
          },
          orderStatus:{
            name:'状态',
            type:'text',
          },
          packageNumber:{
            name:'包裹号',
            type:'text',
          },
          tongtuSku:{
            name:'通途sku',
            type:'text',
          },
          tongtuSkuName:{
            name:'通途sku配货名称',
            type:'text',
          },
          tongtuSkuWeight:{
            name:'通途sku产品重量(克',
            type:'text',
          },
          tongtuSkuNumber:{
            name:'通途sku数量',
            type:'text',
          },
          tongtuProductRemark:{
            name:'通途sku货品备注',
            type:'textarea',
          },
          platformSku:{
            name:'平台sku',
            type:'text',
          },
          platformSkuNumber:{
            name:'平台sku数量',
            type:'text',
          },
          orderRemark:{
            name:'订单备注',
            type:'textarea',
          },
        },
        formValidate: {
          id: '',
          orderCode: '',
          warehouse: '',
          buyerName:'',
          telephone: '',
          phoneNumber: '',
          areaAdd: '',
          postcode: '',
          country: '',
          shippingMethod: '',
          trackingNumber:'',
          receivingAddress1:'',
          receivingAddress2: '',
          city: '',
          province: '',
          productPrice: '',
          productCurrency: '',
          logisticsName:'',
          freight: '',
          freightCurrency:'',
          orderAmount:'',
          orderCurrency: '',
          paidAmout: '',
          paidCurrency: '',
          paidDate: '',
          orderStatus: '',
          packageNumber:'',
          tongtuSku: '',
          tongtuSkuName: '',
          tongtuSkuWeight: '',
          tongtuSkuNumber: '',
          tongtuProductRemark: '',
          platformSku: '',
          platformSkuNumber:'',
          orderRemark: '',
        },
        ruleValidate: {
          name: [{
              required: true,
              type: 'string',
              message: '请输入产品名称',
              trigger: 'blur'
          }],
          categoryId: [{
            required: true,
            message: '请选择类目',
            trigger: 'change',
            validator: categoryIdVali,
          }],
        }, 
      }
    }
  }