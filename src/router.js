import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/authentication/Login.vue'
import Register from './views/authentication/Register.vue'
import EventCreate from './views/events/EventCreate.vue'
import EventEdit from './views/events/EventEdit.vue'
import EventAll from './views/events/EventAll.vue'
import EventView from './views/events/EventView.vue'
import * as auth from './services/AuthService'

import About from './views/About.vue'

Vue.use(Router)

// export default new Router({
const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/acerca-de',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: Register,
      beforeEnter: (to, from, next) => {
        if(!auth.isLoggedIn()){
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(!auth.isLoggedIn()){
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      path: '/evento/nuevo',
      name: 'event-new',
      component: EventCreate,
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      path: '/evento/:id/edit',
      name: 'event-edit',
      component: EventEdit,
      beforeEnter: (to, from, next) => {
        if(auth.isLoggedIn()){
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      path: '/evento/:id',
      name: 'event-view',
      component: EventView,
      // beforeEnter: (to, from, next) => {
      //   if(auth.isLoggedIn()){
      //     next();
      //   }
      //   else {
      //     next('/');
      //   }
      // }
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: EventAll,
      // beforeEnter: (to, from, next) => {
      //   if(auth.isLoggedIn()){
      //     next();
      //   }
      //   else {
      //     next('/');
      //   }
      // }
    },
    // {
    //   path: '/entrar',
    //   name: 'login',
    //   component: Entrar
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default routes;
