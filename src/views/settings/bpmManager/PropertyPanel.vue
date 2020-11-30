<template>
  <div class="property-panel" ref="propertyPanel">
    <Form :model="form" :label-width="80">
      <FormItem label="节点ID">
        <Input v-model="form.id" disabled></Input>
      </FormItem>
      <FormItem label="节点名称">
        <Input v-model="form.name" @input="nameChange"></Input>
      </FormItem>
      <FormItem label="节点颜色">
        <Select v-model="form.color" @active-change="colorChange">
          <Option value="black" key="black">黑色</Option>
          <Option value="white" key="white">白色</Option>
        </Select>
      </FormItem>
      <!-- 任务节点允许选择人员 -->
      <FormItem label="节点人员" v-if="userTask">
        <Select v-model="form.userType" placeholder="请选择" @change="typeChange">
          <Option value="assignee" label="指定人员"></Option>
          <Option value="candidateUsers" label="候选人员"></Option>
          <Option value="candidateGroups" label="角色/岗位"></Option>
        </Select>
      </FormItem>
      <!-- 指定人员 -->
      <FormItem label="指定人员" v-if="userTask && form.userType === 'assignee'">
        <Select
          v-model="form.assignee"
          placeholder="请选择"
          key="1"
          @change="(value) => addUser({assignee: value})"
        >
          <Option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></Option>
        </Select>
      </FormItem>
      <!-- 候选人员 -->
      <FormItem label="候选人员" v-else-if="userTask && form.userType === 'candidateUsers'">
        <Select
          v-model="form.candidateUsers"
          placeholder="请选择"
          key="2"
          multiple
          @change="(value) => addUser({candidateUsers: value.join(',') || value})"
        >
          <Option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></Option>
        </Select>
      </FormItem>
      <!-- 角色/岗位 -->
      <FormItem label="角色/岗位" v-else-if="userTask && form.userType === 'candidateGroups'">
        <Select
          v-model="form.candidateGroups"
          placeholder="请选择"
          @change="(value) => addUser({candidateGroups: value})"
        >
          <Option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></Option>
        </Select>
      </FormItem>
      <!-- 分支允许添加条件 -->
      <FormItem label="分支条件" v-if="sequenceFlow">
        <Select v-model="form.user" placeholder="请选择">
          <Option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    RadioGroup,
    Radio,
    InputNumber
} from "view-design";
export default {
  name: "PropertyPanel",
  components: {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        RadioGroup,
        Radio,
    },
  props: {
    modeler: {
      type: Object,
      required: true
    }
  },
  computed: {
    userTask() {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:UserTask";
    },
    sequenceFlow() {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:SequenceFlow";
    }
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        color: null
      },
      element: {},
      users: [
        {
          value: "zhangsan",
          label: "张三"
        },
        {
          value: "lisi",
          label: "李四"
        },
        {
          value: "wangwu",
          label: "王五"
        }
      ],
      roles: [
        {
          value: "manager",
          label: "经理"
        },
        {
          value: "personnel",
          label: "人事"
        },
        {
          value: "charge",
          label: "主管"
        }
      ]
    };
  },
  mounted() {
    this.handleModeler();
  },
  methods: {
    handleModeler() {
      // 监听节点选择变化
      this.modeler.on("selection.changed", e => {
        const element = e.newSelection[0];
        this.element = element;
        console.log(this.element);
        if (!element) return;
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        };
        if (this.form.userType === "candidateUsers") {
          this.form["candidateUsers"] =
            this.form["candidateUsers"].split(",") || [];
        }
      });

      //  监听节点属性变化
      this.modeler.on("element.changed", e => {
        const { element } = e;
        if (!element) return;
        //  新增节点需要更新回属性面板
        if (element.id === this.form.id) {
          this.form.name = element.businessObject.name;
          this.form = { ...this.form };
        }
      });
    },
    // 属性面板名称，更新回流程节点
    nameChange(name) {
      const modeling = this.modeler.get("modeling");
      modeling.updateLabel(this.element, name);
    },
    // 属性面板颜色，更新回流程节点
    colorChange(color) {
      const modeling = this.modeler.get("modeling");
      modeling.setColor(this.element, {
        fill: null,
        stroke: color
      });
      modeling.updateProperties(this.element, { color: color });
    },
    // 任务节点配置人员
    addUser(properties) {
      this.updateProperties(
        Object.assign(properties, {
          userType: Object.keys(properties)[0]
        })
      );
    },
    // 切换人员类型
    typeChange() {
      const types = ["assignee", "candidateUsers", "candidateGroups"];
      types.forEach(type => {
        delete this.element.businessObject.$attrs[type];
        delete this.form[type];
      });
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties(properties) {
      const modeling = this.modeler.get("modeling");
      modeling.updateProperties(this.element, properties);
    }
  }
};
</script>

<style lang="less" scoped>
.property-panel {
  position: absolute;
  right: 0px;
  top: 0px;
  border-left: 1px solid #cccccc;
  padding: 20px 20px;
  width: 300px;
  height: 100%;
}
</style>
