<template>
  <h2 class="mb-2">留言板后台</h2>
  <el-row class="tac">
    <el-col :span="40">
      <el-menu
        :default-active="index.toString()"
        v-for="(item, index) in oneList.list"
        :key="index"
      >
        <router-link :to="{ path: item.router }">
          <el-menu-item>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>

    <router-view></router-view>
  </el-row>
</template>

<script setup>
import { reactive } from "vue";

const oneList = reactive({
  list: [
    {
      title: "全部数据",
      router: "all",
    },
    {
      title: "图表",
      router: "char",
    },
  ],
});
</script>

<style scoped>
.two {
  margin-top: 60px;
  margin-left: 100px;
}
</style>