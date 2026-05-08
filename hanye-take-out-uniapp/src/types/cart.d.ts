// 分类列表
export type CartDTO = Partial<{
  productId: number
  // setmealId: number
  // dishFlavor: string
}>

// 购物车列表
export type CartItem = {
  id: number
  name: string
  userId: number
  productId: number
  // setmealId: number
  // dishFlavor: string
  number: number
  amount: number
  pic: string
  createTime: string
}
