import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Posts} from '../services/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      if(from.name === "Login"){
        next();
        location.reload();
      }else{
        next();
      }
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      localStorage.clear();
      next();
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: (to, from, next) => {
      localStorage.clear();
      next();
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: async(to, from, next) => {
      try{
       let status = await Posts.checkUser();
       if(status.auth){
         next()
       }
      }catch{
        next({name: 'Home'});
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "about" */ '../views/Stats.vue')
  },
  {
    path: '/my-reviews',
    name: 'MyReviews',
    beforeEnter: async(to, from, next) => {
      try{
       let status = await Posts.checkUser();
       if(status.auth){
         next()
       }
      }catch{
        next({name: 'Home'});
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/MyReviews.vue')
  },
  {
    path: '/add',
    name: 'AddReview',
    beforeEnter: async(to, from, next) => {
      try{
       let status = await Posts.checkUser();
       if(status.auth){
         next()
       }
      }catch{
        next({name: 'Home'});
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AddReview.vue')
  },
  {
    path: '/post/:id',
    props:true,
    name: 'PostDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostDetail.vue')
  },
  {
    path: '/edit-post/:id',
    props:true,
    name: 'EditPost',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditPost.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
