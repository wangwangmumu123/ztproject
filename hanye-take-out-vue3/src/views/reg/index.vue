<script setup lang="ts" name:="my-register">
import { registerAPI } from '@/api/employee'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const form = ref({
  account: '', 
  password: '', 
  repassword: '', 
  age: null, 
  phone: '', 
  gender: '' 
})

// Validation rules remain the same as in the original code
const samePwd = (rules: any, value: any, callback: any) => {
  if (value !== form.value.password) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}

const validateAge = (rules: any, value: any, callback: any) => {
  if (value === null || value === '') {
    callback(new Error('请输入年龄'))
  } else if (value < 0 || value > 120) {
    callback(new Error('年龄必须在0-120岁之间'))
  } else {
    callback()
  }
}

const validatePhone = (rules: any, value: any, callback: any) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

const rules = {
  account: [
    { required: true, trigger: 'blur', message: '不能为空' },
    { max: 20, message: '用户名长度不能超过20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
    { validator: samePwd, trigger: 'blur' }
  ],
  age: [
    { required: true, trigger: 'blur' },
    { validator: validateAge, trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
}

const router = useRouter()

const registerRef = ref()

const registerFn = async () => {
  const valid = await registerRef.value.validate()
  if (valid) {
    const { data: res } = await registerAPI(form.value)
    
    if (res.code !== 0) {
      ElMessage.error('注册失败!')
      return false
    }
    
    ElMessage.success('注册成功!')
    router.push('/login')
  } else {
    return false
  }
}
</script>

<template>
  <div class="registration-container">
    <div class="registration-card">
      <h2 class="registration-title">用户注册</h2>
      
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="registerRef" 
        label-width="0px" 
        class="registration-form"
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
        
        <el-form-item prop="repassword">
          <el-input 
            type="password" 
            v-model="form.repassword" 
            placeholder="确认密码" 
            show-password
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="age">
          <el-input-number 
            v-model="form.age" 
            :min="0" 
            :max="120" 
            placeholder="年龄"
            controls-position="right"
            class="age-input"
          ></el-input-number>
        </el-form-item>
        
        <el-form-item prop="phone">
          <el-input 
            v-model="form.phone" 
            placeholder="手机号" 
            clearable
          ></el-input>
        </el-form-item>
        
        <el-form-item prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            @click="registerFn" 
            class="registration-button"
          >
            注册
          </el-button>
        </el-form-item>
        
        <el-form-item>
          <el-link 
            type="primary" 
            @click="router.push('/login')"
            class="login-link"
          >
            已有账号？立即登录
          </el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.age-input {
  width: 150px; // 缩短年龄输入框的宽度

  // 调整输入框的样式
  :deep(.el-input-number__input) {
    text-align: center; // 居中输入的数字
  }
}

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

.registration-container {
  .flex-center();
  min-height: 100vh;
  background-color: @background-color;
}

.registration-card {
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

.registration-title {
  text-align: center;
  color: @primary-color;
  margin-bottom: 25px;
  font-weight: 600;
}

.registration-form {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-input__inner, 
  .el-input-number__input {
    border-radius: 8px;
    border-color: #e0e0e0;
    transition: all 0.3s ease;

    &:focus {
      border-color: @primary-color;
      box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
    }
  }
}

.registration-button {
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

.login-link {
  width: 100%;
  text-align: center;
  margin-top: 15px;
}

.el-radio-group {
  width: 100%;
  display: flex;
  justify-content: center;

  .el-radio {
    margin-right: 20px;
  }
}

.full-width {
  width: 100%;
}
</style>