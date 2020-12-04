/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-12-04 15:11:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 15:58:08
 */
import Vue from "vue";
import { Message, Switch, Circle,Tree,Icon,Button,Span,Badge,Notice,Modal,Tag,Spin,Radio,
RadioGroup,Checkbox,CheckboxGroup,Input,Select,Option,Card,Divider,FormItem,Table,Page,DatePicker,Form} from "view-design";
import "view-design/dist/styles/iview.css";

Vue.component("Tree", Tree);
Vue.component("Icon", Icon);
Vue.component("Button", Button);
Vue.component("Span", Span);
Vue.component("Badge", Badge);
Vue.component("i-switch", Switch);
Vue.component("i-circle", Circle);
Vue.component("Tag", Tag);
Vue.component("Radio", Radio);
Vue.component("RadioGroup", RadioGroup);
Vue.component("Option", Option);
Vue.component("Checkbox", Checkbox);
Vue.component("CheckboxGroup", CheckboxGroup);
Vue.component("Input", Input);
Vue.component("Select", Select);
Vue.component("Option", Option);
Vue.component("Card", Card);
Vue.component("Divider", Divider);
Vue.component("FormItem", FormItem);
Vue.component("Table", Table);
Vue.component("Page", Page);
Vue.component("DatePicker", DatePicker);
Vue.component("Form", Form);
Vue.component("Spin", Spin);
Vue.component("Modal", Modal);
//组件挂载到vue $this上
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Spin = Spin;