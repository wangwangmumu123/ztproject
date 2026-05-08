import type { ProductItem } from './product'

// 分类列表
export type CategoryItem = {
  children: Product[]
  id: number
  name: string
  // sort: number
  // type: number
}
