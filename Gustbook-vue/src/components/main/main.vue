<template>
  <div>
    <el-tabs v-model='activeName' class="demo-tabs" @tab-click="add()" >
      <!-- 标签页 -->
      <el-tab-pane 
        :label="item"
        :name="item"
        v-for="(item, index) in tabsList"
        :key="index"
      >
        <Card :card_an_data="newArry"></Card>
      </el-tab-pane>
      <!-- 留言标签页
      <el-tab-pane :label="tabsList[1]" name="tabsList[1]">
        <Card v-for="(item, index) in an_data" :key="index"></Card
      ></el-tab-pane> -->
    </el-tabs>
  </div>
</template>


<!-- 
<script setup >
import Card from "../card/card.vue";
import { ref, createApp, computed, reactive } from "vue";
// import { TabsPaneContext } from "element-plus";
// export default{
//   data(){
//     return{
//       newAnData
//     }
//   }
// }

//注册组件
const app = createApp({});
app.component("Card", Card);
// props
const props = defineProps(["tabsList", "an_data"]);

const activeName = ref(props.tabsList[0]);
const newAnData=reactive('filt')

const newDataHand = function () {
  const newData = [];
  const j = 0;
  for (const i in props.an_data) {
    if (props.an_data[i].type == activeName) {
      newData[j++] = props.an_data[i];
    }
  }
 
   newAnData= newData

}; -->
<!-- //一个计算属性
// const filt = computed(() => {
//   //新date
//   const newData = [];
// var j=0
//   for (const i in props.an_data) {
//     if (props.an_data[i].type == activeName) {
//       newData.values[j++] = props.an_data[i];
//     }
//   }

//   console.log(newData)
//   return newData
// });

// const handleClick = (TabsPaneContext, event) => {
//   console.log(tab, event,);
</script> -->
<script>
import Card from "../card/card.vue";

export default {
  components: { Card },

  data() {
    return { 
      activeName:this.tabsList[0],
      newArry: [],
    };
  },
  props: ["tabsList", "an_data"],
  // created() {
  //   this.showCardData();
  // },
  methods: {
    // showCardData() {
    //   //将渲染的数据初始化
    //   this.newArry = [];
    //   var j = 0;
    //   if (this.activeName === this.tabsList[0]) {
    //     this.newArry = this.an_data;
    //     const arr = JSON.parse(JSON.stringify(this.newArry));
    //     console.log("全部按钮" + arr);
    //     return (this.newArry = arr);
    //   } else {
    //     for (let i in this.an_data) {
    //       if (this.an_data[i].type == this.activeName) {
    //         this.newArry[j++] = this.an_data[i];
    //       }
    //     }
    //     //最终返回的this.newArry为一个proxy，
    //     // 利用json获取proxy原始数据
    //     const arr = JSON.parse(JSON.stringify(this.newArry));
    //     //控制台打印最终筛选的数据
    //     console.log("除全部" + arr);
    //     //最终将筛选的数据赋值给data中的newArry
    //     return (this.newArry = arr);
    //   }
    // },
    add(){
      console.log(this.activeName)
    }
  },
};
</script>



<style lang="less" scoped>
::v-deep .el-tabs__nav-scroll {
  width: 50%;
  margin: 0 auto;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>