<template>
  <el-table :data="tableData.list" style="width: 80%">
    <el-table-column fixed prop="id" label="id" width="100" />
    <el-table-column prop="time" label="时间" width="100" />
    <el-table-column prop="type" label="类型" width="100" />
    <el-table-column prop="body" label="内容" width="500" />
    <el-table-column prop="color" label="颜色" width="100" />
    <el-table-column prop="name" label="留言人" width="100" />

    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          @click="
            handleEdit(scope.$index, scope.row), (dialogFormVisible = true)
          "
          >Edit</el-button
        >

        <el-button
          size="small"
          type="danger"
          text
          @click="
            handleDelete(scope.$index, scope.row), (dialogDelVisible = true), handleDelete
          "
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 弹出from -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
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
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), editPost()"
        >
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 弹出确认删除 -->
  <el-dialog v-model="dialogDelVisible" title="Tips" width="30%">
    <span>确认删除？？？？？？？？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="(dialogDelVisible = false),delpost()"
        >
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import axios from "../../../axios/myAxios";
import { ref, reactive, onBeforeMount, toRaw, h } from "vue";
import { ElNotification } from "element-plus";

const formLabelWidth = "80px";
const dialogFormVisible = ref(false);
const dialogDelVisible = ref(false);
const form = reactive({
  id: "",
  //main留言内容
  main: "",
  type: "",
  name: "",
  time: " ",
  color: "",
});

const handleEdit = (index, row) => {
  const rowDataEdit = toRaw(row);
  console.log(index, row);
  form.main = row.body;
  form.type = row.type;
  form.color = row.color;
  form.name = row.name;
  form.time = row.time;
  form.id = row.id;
};
const editPost = async () => {
  const res = await axios.post("/edit", {
    name: form.name,
    type: form.type,
    time: form.time,
    body: form.main,
    color: form.color,
    id: form.id,
  });
  console.log(res);
  if (res.status == 200) {
    ElNotification({
      title: "结果",
      message: h("i", { style: "color: teal" }, "更新成功"),
    });
  } else {
    ElNotification({
      title: "结果",
      message: h("i", { style: "color: teal" }, "err"),
    });
  }
};
//点击delete获取当前行的id,并赋值给from.id 
const handleDelete = (index, row) => {
  const rowDataDel = toRaw(row);
  console.log(index, row);
  form.id=row.id
};
//弹出框点击确认删除后，执行
const delpost =async () => {
    const res =await axios.post("/delete", {
      id:form.id
    });
    console.log(res);
  };

//获取数据
let tableData = reactive({
  list: [],
});

const axiosdata = async function () {
  const res = await axios.get("/list");
  console.log(res);
  tableData.list = res.data;
  console.log(tableData.list);
};
onBeforeMount(axiosdata);
</script>

<style>
</style>