<template>
  <el-tabs v-model="activeName" @tab-click="cli">
    <el-tab-pane
      :label="item"
      :name="item"
      v-for="(item, index) in tabsList"
      :key="index"
    >
    
      <Card :card_an_data="newArry" ></Card>
      <el-empty description="暂时还没有留言，" v-if="newArry.length==0" />
    </el-tab-pane>
    
  </el-tabs>
</template>

<script>
import Card from "../card/card.vue";
export default {
  components: { Card },
  props: ["tabsList", "an_data"],
  data() {
    return {
      activeName: this.tabsList[0],
      newArry:[]
    };
  },
  created() {
    this.handleClick();
  },
  methods: {
    cli(){
        setTimeout(this.handleClick,500)
    },
    handleClick() {
      //将渲染的数据初始化
      this.newArry = [];
      var j = 0;
      if (this.activeName == this.tabsList[0]) {
        this.newArry = this.an_data;
        const arr = JSON.parse(JSON.stringify(this.newArry));
        console.log(arr);
        return (this.newArry = arr);
      } else {
        for (let i in this.an_data) {
          if (this.an_data[i].type == this.activeName) {
            this.newArry[j++] = this.an_data[i];
          }
        }
        //最终返回的this.newArry为一个proxy，
        // 利用json获取proxy原始数据
        const arr = JSON.parse(JSON.stringify(this.newArry));
        //控制台打印最终筛选的数据
        console.log(arr);
        //最终将筛选的数据赋值给data中的newArry
        return (this.newArry = arr);
      }}
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