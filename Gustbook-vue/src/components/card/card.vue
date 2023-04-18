<template>
  <div class="bigCard" >
    <div class="vFor" v-for="(item_card, index) in card_an_data" :key="index">
      <el-card class="box-card" :style="{backgroundColor:item_card.color}">
        <template #header>
          <div class="card-header">
            <span>{{ item_card.time }}</span>
            <el-button class="button" text>{{ item_card.type }}</el-button>
          </div>
        </template>
        <div class="text item">
          <pre class="card-main">
            {{ item_card.body }}
        </pre
          >
        </div>
      </el-card>
      <el-footer class="card-foot" :style="{backgroundColor:item_card.color}">{{item_card.name}}</el-footer>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {};
  },
  props: ["card_an_data"],
 

  
};
</script>

<style scoped >
.bigCard {
  /* 最外面的div */
  /* FLEX布局   */
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
}
/*   卡片之间的间隙 */
.vFor {
  margin: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 280px;
  height: 220px;
  background-color: aqua;
}
::-webkit-scrollbar {
  display: none;
}
.card-main {
  height: 266px;
  white-space: pre-line;
  /* 上下滑动 ,去除进度条*/
  overflow: auto;
}
.card-foot {
  height: 20px;
  width: 280px;
  background-color: rgb(120, 252, 252);
  text-align: right;
}
</style>