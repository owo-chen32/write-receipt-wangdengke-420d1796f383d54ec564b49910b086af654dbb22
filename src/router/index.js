import { createRouter,createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
          path: '/',
          redirect: '/index',
        },
        {
            path: '/index/:plate?',
            name: 'index',
            component: () => import('@/views/Index/index.vue')
        },
        {
            path: "/parkingticket",
            name: "parkingticket",
            component: () => import("@/views/ParkingTicket/index.vue"),
            meta: {
              title: "待开票列表",
            },
          },
          {
            path: "/applybilling",
            name: "applybilling",
            component: () => import("@/views/ApplyBilling/index.vue"),
            meta: {
              title: "申请开票",
            },
          },
    ]
})
// 路由守卫
router.beforeEach((to,from,next) => {
  // 设置title
  document.title = to.meta.title ? to.meta.title : '申请开票'
  next()
})

export default router;

