<template>
  <div>
    <Top></Top>
    <Main v-if="analong_data.length!=0" :tabsList="tabs_data" :an_data="analong_data"></Main>
    <right-drawer class="dr"></right-drawer>
  </div>
</template>

<script>
import Main from "./components/main/main2.vue";
import Top from "./components/top/top.vue";
// import rightDrawer from "./components/rightDrawer/rightDrawer2.vue";
import myAxios from "../axios/myAxios.js";
import RightDrawer from './components/rightDrawer/rightDrawer2.vue';

// 模拟数据导入
// import analong from '../analog data/data.js'
// // const tabs_data= await analong.tabs
// const analong_data=await analong.analong
// // console.log(tabs_data,analong_data)
export default {
  components: { Top, Main, RightDrawer},

  data() {
    return {
      //tabs栏的数据
      tabs_data: [
        "全部",
        "留言",
        "目标",
        "爱情",
        "亲情",
        "友情",
        "秘密",
        "其他",
      ],
      //card的数据
      analong_data:[]
    };
  },
  methods: {
    async getList() {
        const res = await myAxios.get("/list");
        
        console.log(res.data)
        return this.analong_data = res.data;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.dr{
  float: left;
}
</style>