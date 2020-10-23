<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-21 14:56:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-23 14:09:17
-->
<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
      <li class="item"><img :src="asetLogoUrl" /></li>
      <li class="item title">后台管理系统</li>
      <MenuItem name="1">
        <Icon type="ios-paper" />
        首页
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people" />
        基础信息
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          产品管理
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
        <Icon type="ios-construct" />
        客户管理
      </MenuItem>
      <li class="right-item right-title">
        admin
      </li>
      <li class="right-item right-title">
        <img :src="asetUserUrl" />
      </li>
      <li class="right-item right-title" style="padding:0px;">
        |
      </li>
      <li class="right-item right-title">小竹熊ERP管理系统</li>
    </Menu>
  </div>
</template>

<script>
import {
  Menu,
  MenuItem,
  Icon,
  Submenu,
  MenuGroup,
  RadioGroup,
  Radio
} from "view-design";
export default {
  name: "Head",
  props: {},
  components: {
    Menu,
    MenuItem,
    Icon,
    Submenu,
    MenuGroup,
    RadioGroup,
    Radio
  },
  data() {
    return {
      asetLogoUrl: require("@assets/default/logo.png"),
      asetUserUrl: require("@assets/default/ava01.png"),
      theme1: "dark"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.item {
  float: left;
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease-in-out;
  color: #fff;

  img {
    width: 30px;
  }
}

.title {
  color: #fff;
  font-size: 24px;
}

.right-item {
  float: right;
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease-in-out;
  color: #fff;

  img {
    width: 30px;
  }
}

.right-title {
  font-size: 12px;
}
</style>
