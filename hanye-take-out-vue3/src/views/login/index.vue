<script setup lang="ts">
import { loginAPI } from '@/api/employee'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/store'

const userInfoStore = useUserInfoStore()

const form = ref({
  account: '',
  password: ''
});
// 表单校验的ref
const loginRef = ref()

const rules = {
  account: [
  { required: true, trigger: 'blur', message: '不能为空' },
  { max: 20, message: '用户名长度不能超过20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
  ]
}

const router = useRouter()

const loginFn = async () => {
  // 先校验输入格式是否合法
  const valid = await loginRef.value.validate()
  if (valid) {
    // 调用登录接口
    const { data: res } = await loginAPI(form.value)
    console.log(res)
    // 登录失败，提示用户，这个提示已经在响应拦截器中统一处理了，这里直接return就行
    if (res.code !== 0) {
      return false
    }
    // 登录成功，提示用户
    ElMessage.success('登录成功')
    // 把后端返回的当前登录用户信息(包括token)存储到Pinia里
    userInfoStore.userInfo = res.data
    console.log(userInfoStore.userInfo)
    // 跳转到首页
    router.push('/')
  } else {
    return false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">用户登录</h2>
      
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="loginRef" 
        label-width="0px" 
        class="login-form"
      >
        <el-form-item prop="account">
          <el-input 
            v-model="form.account" 
            placeholder="用户名" 
            clearable
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            type="password" 
            v-model="form.password" 
            placeholder="密码" 
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="loginFn" 
            class="login-button"
          >
            登录
          </el-button>
        </el-form-item>
        
        <el-form-item>
          <el-link 
            type="primary" 
            @click="$router.push('/reg')"
            class="register-link"
          >
            还没有账号？立即注册
          </el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
// Color Variables
@primary-color: #3498db;
@background-color: #f4f6f7;
@card-background: white;
@text-color: #2c3e50;

// Mixins
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  margin: 0;
  padding: 0;
  background-color: @background-color;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.login-container {
  .flex-center();
  min-height: 100vh;
  // background-color: @background-color;
  padding: 20px;
  background-size: cover;   
  background-image: url('../../assets/image/login(1).png'); 
}

.login-card {
  width: 380px;
  background-color: @card-background;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
}

.login-title {
  text-align: center;
  color: @primary-color;
  margin-bottom: 25px;
  font-weight: 600;
}

.login-form {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-input__inner {
    border-radius: 8px;
    border-color: #e0e0e0;
    transition: all 0.3s ease;

    &:focus {
      border-color: @primary-color;
      box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
    }
  }
}

.login-button {
  width: 100%;
  border-radius: 8px;
  background-color: @primary-color;
  border: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(@primary-color, 10%);
  }
}

.register-link {
  width: 100%;
  text-align: center;
  margin-top: 15px;
  display: block;
}
</style>