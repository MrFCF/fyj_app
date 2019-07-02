import Vue from 'vue'
import store from './store'
import helper from './lib/helper'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import User from './views/User.vue'

Vue.use(Router)

// 路由守卫


const routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
//  {
//    path: '/about',
//    name: 'about',
//    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//  }
  ]
})

routers.beforeEach((to,from,next)=>{
  if(to.path != '/'){
    //判断用户是否登录
    if(helper.getTypes(store.getters.getLoginUser) === "Object"){
      next()
    }else{
      next("/")
    }
  }else{
    next();
  }
})
export default routers;

