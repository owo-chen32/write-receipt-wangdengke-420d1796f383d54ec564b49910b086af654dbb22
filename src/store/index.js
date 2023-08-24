import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCarStore = defineStore('car', () => {
  // 车牌号
  const plate = ref('')
  // 订单号
  const order_no = ref('')
  // 订单金额
  const goodsTotalPrice = ref(0)
  return { plate, order_no, goodsTotalPrice }
})