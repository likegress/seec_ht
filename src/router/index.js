import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/admin/index'
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      needRequired:true,
    },
    component: () => import('../views/AdminView.vue'),
    children:[
      {
        path:'index',
        name:'admin/index',
        meta:{ pathName:'主面板' },
        component:()=> import('../views/AdminIndex.vue')
      },
      {
        path: 'product',
        name: 'admin/product',
        meta: { pathName: '产品页' },
        component: () => import('../views/AdminProduct.vue')
      },
      {
        path: 'user',
        name: 'admin/user',
        meta:{ pathName: '用户管理' },
        component: () => import('../views/AdminUser.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to,from,next)=>{
  // console.log(to);
  let flag = to.matched.some(item=>item.meta.needRequired)
  if(flag){
    if(localStorage.getItem("token")){
       next()
    }else {
       next('/login')
    }
  }else {
    next()
  }
})
export default router
