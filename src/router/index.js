import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import looks from '@/components/look'
import insert from '@/components/insert'
import edit from '@/components/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
