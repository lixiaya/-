<template>
  <div class="body">
    <form onsubmit="return false">
    <div class="inputsys">
        <input type="text" name="name" required="required" v-model="form.username">
        <span>name</span>
    </div>
    <div class="inputsys">
        <input type="text" name="pwd" required="required" v-model="form.password">
        <span>password</span>
    </div>
   
    
    <p class="sub">
        <input type="submit" name="login_denglu" value="登录" @click="loginGet">
    </p>
    </form>
    <!-- <el-form>
      <el-form-item class="inputsys">
        <input type="text" required="required" v-model="form.username">
        <span>name</span>
      </el-form-item>
      <el-form-item class="inputsys">
        <input type="text" required="required" v-model="form.password">
        <span>password</span>
      </el-form-item>
      <p class="sub">
        <input type="submit" name="login_denglu" value="登录" @click="loginGet">
    </p>
    </el-form> -->
  </div>
</template>

<script setup>
import {reactive} from  'vue'
import axios from '../../axios/myAxios'
import {ElMessageBox } from "element-plus";
import * as router from 'vue-router';

const mRouter = router.useRouter()

const form=reactive({
  username:'',
  password:''
})

//post
const loginGet = async function(){
  const res=await axios({
    method:'post',
    url:'/login',
    data:{
      username:form.username,
      password:form.password
    },
    headers:{
      'Content-Type':'application/x-www-form-urlencoded '
    }
  })
  console.log(res.data.token)

  if(res.data.stats==2){
    ElMessageBox.alert('登录成功')
    sessionStorage.setItem('token',res.data.token)
    
    mRouter.replace({path:'/admin'})
  }else{
    ElMessageBox.alert('err')
  }
}

</script>

<style scoped>

* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}
.body
{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    gap: 30px;
    background-color:#1d2b3a;
}
.inputsys 
{
    position: relative;
    width: 250px;
    margin-top: 20px;
}
.inputsys input
{
    width: 100%;
    padding: 10px;
    border:1px solid rgba(255, 255, 255, 0.25) ;
    background: #1d2b3a;
    border-radius: 5px;
    outline: none;
    color:azure;
    font-size: 1em;
}
span
{
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.671);
    text-transform: uppercase;
    transition: 0.5s;
}
 input:valid ~ span ,
 input:focus ~ span
{
    color: aqua;
    transform: translateX(10px) translateY(-10px);
    font-size: 0.1rem;
    padding:0px 5px 0px 5px;
    background: #1d2b3a;
    border-left: 1px solid;
    border-right: 1px solid;
    letter-spacing: 2px;
}
 input:valid,
 input:focus
{
    border: 1px solid aqua;
}





/* .code
{
    position: relative;
    width: 150px; */
    /* margin-top: 20px;
   display: inline-block;
}
.code input
{
    width: 100%;
    padding: 10px;
    border:1px solid rgba(255, 255, 255, 0.25) ;
    background: #1d2b3a;
    border-radius: 5px;
    outline: none;
    color:azure;
    font-size: 1em;
} */
/* .code span
{
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.671);
    text-transform: uppercase;
    transition: 0.5s;
} */
/* .code_yzm
{
left: 150px;
width: 50px;
position: relative;

} */
.sub  input
{
    margin-top: 20px;
    width: 100px;
    padding: 10px;
    border:1px solid rgba(255, 255, 255, 0.25) ;
    background: #1d2b3a;
    border-radius: 5px;
    outline: none;
    color:azure;
    font-size: 1em;
}  
.sub input:hover
{
 background: #1d2;
}
</style>