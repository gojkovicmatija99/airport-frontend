import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/flights',
    name: 'Flights',
    component: () => import(/* webpackChunkName: "about" */ '../views/Flights.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/update',
    name: 'Update',
    component: () => import(/* webpackChunkName: "about" */ '../views/Update.vue')
  },
  {
    path: '/addCreditCard',
    name: 'CreditCard',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreditCard.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
