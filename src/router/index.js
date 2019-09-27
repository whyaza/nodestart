import Vue from 'vue'
import Router from 'vue-router'
import first from '@/components/front/first'
import looks from '@/components/back/look'
import insert from '@/components/back/insert'
import edit from '@/components/back/edit'
import login from '@/components/front/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstIndex',
      component: first
    },
    {
      path: '/look',
      name: 'lookall',
      component: looks
    },
    {
      path: '/insert',
      name: 'insert',
      component: insert
    },
    {
      //  '/articles/:id/edit'      一个典型的Restful的接口，/资源/具体资源（动态参数）/动作
      path: '/edit/:id',
      name: 'edit',
      component: edit
    },
    {
      path: '/login',
      component: login
    }
  ]
})