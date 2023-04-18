<template>
  <el-affix :offset="400">
    <el-button type="success" @click="dialog = true">+</el-button>
  </el-affix>
  <el-drawer
    ref="drawerRef"
    v-model="dialog"
    title="这里输入留言内容"
    direction="rtl"
    custom-class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="form">
        <el-form-item label="留言内容" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.main" autocomplete="off" />
        </el-form-item>
        <el-form-item label="留言类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="这里选择留言类型">
            <el-option label="留言" value="留言"></el-option>
            <el-option label="爱情" value="爱情"></el-option>
            <el-option label="目标" value="目标"></el-option>
            <el-option label="亲情" value="亲情"></el-option>
            <el-option label="秘密" value="秘密"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="背景颜色" :label-width="formLabelWidth">
          <el-color-picker v-model="form.color" />
        </el-form-item>

        <el-form-item label="留言人" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="onClick, postData()"
          >提交"
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onBeforeMount } from "vue";
import { ElDrawer, ElMessageBox } from "element-plus";
import axios from "../../../axios/myAxios";

const formLabelWidth = "80px";
let timer;

const dialog = ref(false);
const loading = ref(false);

const form = reactive({
  //main留言内容
  main: "",
  type: "",
  name: "",
  // date2: "",
  time: " ",

  color: "#409EFF",
  // resource: "",
  // desc: "",
});

const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const onClick = () => {
  drawerRef.value!.close();
};
//提交post请求
const postData = function () {
  axios
    .post("/add", {
      name: form.name,
      type: form.type,
      time: form.time,
      body: form.main,
      color: form.color,
    })
    .then(function (response) {
      console.log(response.status);

      open();

      clickRe();

      // const dec = function () {
      //   if (response.status == 200) {
      //     open();

      //     clickRe();
      // } else {
      //   ElMessageBox.alert(this.error, "Title", {
      //     confirmButtonText: "确定",
      // });
      //   }
      // };
      // setTimeout(dec, 50);
    })
    .catch(function (error) {
      console.log("dd" + error);
      ElMessageBox.alert(error, "Title", {
        confirmButtonText: "确定",
      });

      //  const err=function (){
      //  if (error)
      //     return ElMessageBox.alert(error, "Title", {
      //       confirmButtonText: "确定"
      //     })}
      //   setTimeout(err,100)
    });
};

// 进入页面自动触发时间函数
const nowdate = onBeforeMount(() => {
  const mydate = new Date();
  const mytime = mydate.toLocaleDateString();
  console.log(mytime);
  return (form.time = mytime);
});
// 点击提交刷新页面
const clickRe = function () {
  //两秒后刷新页面
  setTimeout("window.location.reload()", 2000);
};
//点击提交弹出对话框，提示即将刷新界面
const open = () => {
  ElMessageBox.alert("已提交，即将刷新界面", "Title", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "确定",
  });
};

// const handleClose = (done) => {
//   if (loading.value) {
//     return;
//   }
//   ElMessageBox.confirm("你想要提交吗?")
//     .then(() => {
//       loading.value = true;
//       timer = setTimeout(() => {
//         done();
//         // 动画关闭需要一定的时间
//         setTimeout(() => {
//           loading.value = false;
//         }, 400);
//       }, 2000);
//     })
//     .catch(() => {
//       // catch error
//     });
// };

const cancelForm = () => {
  loading.value = false;
  dialog.value = false;
  clearTimeout(timer);
};
</script>
  