/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-29 14:54:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-29 15:01:23
 */
import { findComponentUpward, findComponentsUpward } from './assist';
export default {
    data () {
        return {
            menu: findComponentUpward(this, 'Menu')
        };
    },
    computed: {
        hasParentSubmenu () {
            return !!findComponentUpward(this, 'Submenu');
        },
        parentSubmenuNum () {
            return findComponentsUpward(this, 'Submenu').length;
        },
        mode () {
            return this.menu.mode;
        }
    }
};
