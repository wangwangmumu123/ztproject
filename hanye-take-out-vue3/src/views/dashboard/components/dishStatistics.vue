<template>
  <div class="container">
    <h2 class="homeTitle">
      待补货商品
      <div class="more">
        <router-link to="product">商品管理</router-link>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </h2>
    
    <div class="orderviewBox">
      <el-table 
        v-if="productList.length > 0" 
        :data="productList" 
        stripe 
        class="tableBox" 
        style="width: 100%"
      >
        <el-table-column prop="name" label="商品名" align="center" />
        
        <el-table-column prop="pic" label="图片" align="center">
          <template #default="{ row }">
            <img 
              :src="row.pic || '/src/assets/image/user_default.png'" 
              :alt="row.name"
              class="product-image"
            />
          </template>
        </el-table-column>
        
        <el-table-column prop="detail" label="详情" width="200px" align="center" />
        <el-table-column prop="price" label="价格" align="center" />

        <el-table-column prop="status" label="状态" align="center">
          <template #default="{ row }">
            <el-tag 
              :type="row.status === '1' ? 'success' : 'danger'" 
              round
            >
              {{ row.status === '1' ? '启售' : '停售' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="number" label="库存" align="center" />
        <el-table-column prop="category" label="所属分类" align="center" />
        
        <el-table-column label="操作" width="200px" align="center">
          <template #default="{ row }">
            <el-button @click="to_add_update(row)" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
        
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
    </div>
  </div>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import {updateNumberAPI} from '@/api/product'
import { useRouter, useRoute } from 'vue-router'

// 商品接口定义
interface Product {
  id: number
  name: string
  category: string
  price: number
  number: number
  detail: string
  pic?: string
  status: string
}

const router = useRouter()
const route = useRoute()

const to_add_update = (row?: any) => {
  console.log('看有没有传过来，来判断要add还是update', row)
  if (row && row.id) {
    router.push({
      path: '/dashboard/update',
      query: { id: row.id }
    })
  } else {
    router.push('/dashboard/update')
  }
}

// 组件props
interface Props {
  productList: Product[]
}

// 定义props和emit
const props = defineProps<Props>()
const emit = defineEmits(['productUpdated'])

</script>


<style scoped>
.el-table {
  width: 100%;
  /* height: 500px; */
  margin:0;
  text-align: center;
  border: 1px solid #e4e4e4;
}

:deep(.el-table tr) {
  font-size: 12px;
}

.el-pagination {
  justify-content: center;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
</style>
