<script setup lang="ts">

import { reactive, ref } from 'vue'
import { getProductListAPI } from '@/api/product'
// import { getCategoryPageListAPI } from '@/api/category'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { useRouter } from 'vue-router'
import{Plus,Minus,} from '@element-plus/icons-vue'

// ------ .d.ts 属性类型接口 ------
// 接收到不在接口中定义的属性的数据，ts会报错，但是类型推断错误不会妨碍接收，控制台还是能打印的
interface product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  detail: string
  pic:string
  status:string
  updateTime: string
  number:number
}
// ------ 数据 ------

// 当前页的菜品列表
const productList = ref<product[]>([])
// 菜品id对应的分类列表，即categoryId字段不能只展示id值，应该根据id查询到对应的分类名进行回显
// const categoryList = ref<Category[]>([])

// ------ 方法 ------
const showPageList = async () => {
  const { data: res } = await getProductListAPI()
  console.log('菜品列表')
  console.log(res.data)
  productList.value = res.data.records
}
// init() // 页面初始化，写在这里时的生命周期是beforecreated/created的时候
showPageList() // 页面一开始就要展示分页菜品列表

</script>

<template>
  <!-- <el-card> -->
    <el-table class="table_box" ref="multiTableRef" :data="productList" stripe >
      <el-table-column type="selection" width="55" />
      <!-- <el-table-column prop="id" label="id" /> -->
      <el-table-column prop="name" label="商品名" align="center" />
      <el-table-column prop="pic" label="图片" align="center">
        <template #default="scope">
          <img v-if="scope.row.pic" :src="scope.row.pic" alt="" />
          <img v-else src="/src/assets/image/user_default.png" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="详情" width="200px" align="center" />
      <el-table-column prop="price" label="价格" align="center" />

      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'" round>
            {{ scope.row.status === '1' ? '启售' : '停售' }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="number" label="库存" align="center"></el-table-column>
      <el-table-column prop="category" label="所属分类" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="上次操作时间" width="180px" align="center" />
      
      <template #empty>
        <el-empty description=" 没有数据" />
      </template>
    </el-table>

  <!-- </el-card> -->
</template>


<style lang="less" scoped>
// element-plus的样式修改
.el-table {
  width: 90%;
  height: 500px;
  margin: 3rem auto;
  text-align: center;
  border: 1px solid #e4e4e4;
}

:deep(.el-table tr) {
  font-size: 12px;
}

.el-button {
  width: 45px;
  font-size: 12px;
}

.el-pagination {
  justify-content: center;
}

// 自定义样式
body {
  background-color: #c91c1c;
}

.horizontal {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 80px;

  .input {
    width: 160px;
  }

  .btn {
    width: 120px;
  }
}

img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.add_btn {
  width: 100px;
  height: 40px;
  margin-left: 900px;
}
</style>