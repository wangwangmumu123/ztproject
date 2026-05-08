import type { ProductItem } from '../types/product'
import { http } from '../utils/http'

/**
 * 根据菜品分类id获取菜品列表
 */
export const getDishListAPI = (id: number) => {
  return http<ProductItem[]>({
    method: 'GET',
    url: `/user/product/list/${id}`,
  })
}

/**
 * 分类列表-小程序
 */
export const getDishByIdAPI = (id: number) => {
  return http<ProductItem>({
    method: 'GET',
    url: `/user/product/product/${id}`,
  })
}
