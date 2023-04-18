<template>
  <div id="c1" ></div>
  
</template>

<script setup>
import {Chart} from '@antv/g2'
import axios from '../../../axios/myAxios'
import {reactive,onMounted} from 'vue'

const charData=reactive({
data:[]
})



const getCharData=async ()=>{
 const res= await axios.get('/char')
 console.log(res.data);

charData.data=res.data
 }

onMounted(getCharData)



const c1=()=>{
  // Step 1: 创建 Chart 对象
const chart = new Chart({
  container: 'c1', // 指定图表容器 ID
  width: 600, // 指定图表宽度
  height: 300, // 指定图表高度
});

// Step 2: 载入数据源
chart.data(charData.data);

// Step 3: 创建图形语法，绘制柱状图
chart.interval().position('type*num');

// Step 4: 渲染图表
chart.render();

}
const c2=()=>{
  setTimeout(c1,500)
}
onMounted(c2)
</script>

<style>

</style>