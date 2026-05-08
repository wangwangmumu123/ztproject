<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { addProductAPI, getDishByIdAPI, updateDishAPI } from '@/api/product'
// import { getCategoryPageListAPI } from '@/api/category'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

// ------ 数据 ------

const form = reactive({
  id: 0,
  name: '',
  pic: '',
  detail: '',
  price: '',
  status: '',
  category: '',
  number:''
})
const formLabelWidth = '70px'
// const count = ref(0)
// 图片下的隐藏input框
const inputRef1 = ref<HTMLInputElement | null>(null)
const addRef = ref()

// 价格校验规则
const validatePrice = (rules: any, value: any, callback: any) => {
  if (value === null || value === '') {
    callback(new Error('请输入价格'))
  } else if (value < 0) {
    callback(new Error('价格需为非负'))
  } else {
    callback()
  }
}
// 表单校验
const rules = {
  name: [
    { required: true, trigger: 'blur', message: '不能为空' },
  ],
  // detail: [
  //   { required: true, trigger: 'blur', message: '不能为空' },
  // ],
  price: [
    { required: true, trigger: 'blur', message: '不能为空' },
    { validator: validatePrice, trigger: 'blur' }
  ],
  category: [
    { required: true, trigger: 'blur', message: '不能为空' },
  ],
  number: [
    { required: true, trigger: 'blur', message: '不能为空' },
  ],
}

const router = useRouter()
const route = useRoute()

// 选择图片->点击事件->让选择框出现
const chooseImg = () => {
  if (inputRef1.value) {
    inputRef1.value.click() 
  }
}

// 在文件管理器中选择图片后触发的改变事件：预览
const onFileChange1 = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files;
  if (files && files.length > 0) {
    const fr = new FileReader()
    fr.readAsDataURL(files[0])
    fr.onload = () => {
      form.pic = fr.result as string
    }
  }
}

// 添加菜品信息后提交
const submit = async (keep: any) => {
  const valid = await addRef.value.validate();
  if (valid) {
    let params: any = { ...form }
    // --- 处理完毕，开始提交 ---
    if (form.id === 0) {
      const res = await addProductAPI(params)
      if (res.data.code !== 0) {
        console.log('新增菜品失败！')
        return false
      }
      ElMessage({
        message: '新增菜品成功',
        type: 'success',
      })
      if (keep) {
        form.id = 0
        form.name = ''
        form.pic = ''
        form.detail = ''
        form.price = ''
        form.status = ''
        form.category = ''
        form.number=''
      } else {
        router.push({
          path: '/product',
        })
      }
    } else {
      const res = await updateDishAPI(params)
      if (res.data.code !== 0) {
        console.log('修改菜品失败！')
        return false
      }
      ElMessage({
        message: '修改菜品成功',
        type: 'success',
      })
      router.push({
        path: '/product',
      })
    }
  } else {
    console.log('form not valid!');
    return false;
  }
}

// 取消修改
const cancel = () => {
  router.push({
    path: '/product',
  })
}

const init = async () => {
  if (route.query.id !== undefined) {
    form.id = route.query.id ? parseInt(route.query.id as string) : 0
    let dish = await getDishByIdAPI(form.id)
    Object.assign(form, dish.data.data)
  }
}

init()
</script>

<template>
  <h1>添加菜品页</h1>
  <el-card>
    <el-form :model="form" :rules="rules" ref="addRef">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth" prop="pic">
        <img class="the_img" v-if="!form.pic" src="/src/assets/image/user_default.png" alt="" />
        <img class="the_img" v-else :src="form.pic" alt="" />
        <input type="file" accept="image/*" style="display: none" ref="inputRef1" @change="onFileChange1" />
        <el-button type="primary" @click="chooseImg">
          <el-icon style="font-size: 15px; margin-right: 10px;">
            <Plus />
          </el-icon>
          选择图片
        </el-button>
      </el-form-item>
      <el-form-item label="详情" :label-width="formLabelWidth" prop="detail">
        <el-input v-model="form.detail" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
        <el-input v-model="form.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="库存" :label-width="formLabelWidth" prop="number">
        <el-input-number 
            v-model="form.number" 
            :min="0" 
          ></el-input-number>
      </el-form-item>
      <el-form-item label="分类" :label-width="formLabelWidth" prop="category">
        <el-input v-model="form.category" autocomplete="off" />
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button class="submit_btn" type="success" @click="submit(0)">保存并退出</el-button>
      <el-button v-if="form.id == 0" class="continue_btn" type="success" plain @click="submit(1)">保存并继续添加</el-button>
      <el-button class="cancel_btn" type="info" plain @click="cancel">取消</el-button>
    </el-form-item>
  </el-card>
</template>

<style scoped lang="less">
h1 {
  font-size: 20px;
  text-align: center;
  margin: 20px;
}

.el-form {
  margin-top: 30px;
  width: 800px;
  margin: 0 auto;
}

img {
  width: 110px;
  height: 100px;
  margin-right: 20px
}

.submit_btn {
  width: 100px;
  height: 40px;
  margin: 30px 0 0 250px;
}

.continue_btn {
  width: 120px;
  height: 40px;
  margin: 30px 0 0 50px;
}

.cancel_btn {
  width: 100px;
  height: 40px;
  margin: 30px 0 0 300px;
}

.flavorBox {
  width: 800px;
}
</style>
