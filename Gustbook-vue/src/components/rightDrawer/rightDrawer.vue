<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    添加新留言
  </el-button>
  <el-drawer
    v-model="drawer"
    title="这里输入你留言内容"
    :before-close="handleClose(done)"
  >
    <span>
      <!-- from表单 -->

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="留言类型">
          <el-select v-model="form.type" placeholder="请选择留言的类型">
            <el-option label="留言" value="留言"></el-option>
            <el-option label="爱情" value="爱情"></el-option>
            <el-option label="目标" value="目标"></el-option>
            <el-option label="亲情" value="亲情"></el-option>
            <el-option label="密码" value="密码"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.textBody"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="留言人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="背景颜色">
          <el-color-picker v-model="form.color1"></el-color-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click='onsub'>立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </span>
  </el-drawer>
</template>

<script >
import myaxios from "../../../axios/myAxios";

export default {
  data() {
    return {
      drawer: false,
      form: {
        //类型
        type: "",
        //内容
        textBody: "",
        //留言人
        name: "",
        //背景颜色
        color1: "#409EFF",
        time: "",
      },
    };
  },
  created() {
    this.date();
  },
  methods: {
    date() {
      const mydate = new Date();
      const mytime = mydate.toLocaleDateString();
      console.log(mytime);
      return (this.form.time = mytime);
    },
  },
  handleClose(done) {
    this.$confirm("确认关闭？")
      .then((_) => {
        done();
      })
      .catch((_) => {});
  },
  onsub() {
    // myaxios({
    //   method: "post",
    //   url: "/add",
    //   data: {
    //     name: this.form.name,
    //     type: this.form.type,
    //     time: this.form.time,
    //     body: this.form.textBody,
    //     color: this.form.color1,
    //   },
    // });
    myaxios.post('/add', {
      data: {
        name: this.form.name,
        type: this.form.type,
        time: this.form.time,
        body: this.form.textBody,
        color: this.form.color1,
      },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  },
};
</script>



<style>
</style>