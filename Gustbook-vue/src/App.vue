<template>
    <router-view></router-view>
</template>

<script>
import index from './index.vue'
import login from './login-admin/login.vue'
import admin from './login-admin/admin.vue'
export default {
    components:[index,login,admin]
}
</script>

<style>
 
</style>