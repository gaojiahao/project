/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-14 10:49:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-15 18:53:03
 */
import $flyio from '@plugins/ajax';
//分页获取产品审核/销售审核/侵权审核
export let GetGoodsReviewPage = (data = {}) => {
    return $flyio.post({
      url: '/api/GetGoodsReviewPage',
      data: data
    })
};

