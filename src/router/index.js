import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  }, 
  {
    path: '/post/:id',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */ '../views/PostView.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "create" */ '../views/CreateView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/EditView.vue')
  },
  
]
const router = createRouter({
  history:    createWebHistory(process.env.BASE_URL),
  routes
})

export default router
