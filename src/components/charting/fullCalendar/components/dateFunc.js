/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2021-01-19 17:16:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-19 18:57:04
 */
import moment from 'moment';

let dateFunc = {
  getMonthViewStartDate (date, firstDay) {
    firstDay = parseInt(firstDay);
    let start = moment(date);
    let startOfMonth = moment(start.startOf('month'));

    start.subtract(startOfMonth.day(), 'days');

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days');
    }

    start.add(firstDay, 'days');

    return start;
  },
  getMonthViewEndDate (date) {
    return this.getMonthViewStartDate().add(6, 'weeks');
  }
};

export default dateFunc;
