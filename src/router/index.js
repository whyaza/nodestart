import Vue from 'vue'
import Router from 'vue-router'
import first from '@/components/front/first'
import looks from '@/components/back/look'
import insert from '@/components/back/insert'
import edit from '@/components/back/edit'
import login from '@/components/front/login'
import home from '@/components/front/home'
import aboutme from '@/components/front/aboutme'
import editin from '@/components/back/editin'
import others from '@/components/back/others'
import discuss from '@/components/front/discuss'
import discussManage from '@/components/back/discussManage'
import articledetails from '@/components/front/articledetails'
import memory from '@/components/front/memory'

//各种memory的文件导入
import chuzhongsuiyue from '@/components/front/memorys/chuzhongsuiyue'
import daxuelangdang from '@/components/front/memorys/daxuelangdang'
import ershishiguang from '@/components/front/memorys/ershishiguang'
import gaozhongsannian from '@/components/front/memorys/gaozhongsannian'
import yanjiushenghuo from '@/components/front/memorys/yanjiushenghuo'
import zhenxidangxia from '@/components/front/memorys/zhenxidangxia'

//进行路由嵌套，嵌套跳转，实现内部跳转
import consolein from '@/components/back/consolein'
import cocos from '@/components/front/cocos'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    //路径是/的时候，直接重定向到/front/cocos
    {
      path: '/',
      //name: 'zhuye', // 由于有默认子路由，需要去掉父路由的name
      component:  cocos,
      children:[
        {   
          path: '/', //   home 组件会被渲染在/  的<router-view>之中
          //这样设置，就是说明，默认的自路由渲染
          name: 'shouye',
          component: home
        },
        {
          path: 'first',    //first 组件会被渲染在/  的<router-view>之中
          name: 'first',
          component: first
        },
        {
          path: 'aboutme',
          name: 'aboutme',
          component: aboutme
        },
        {
          path: 'discuss',
          name : 'discuss',
          component: discuss,
        },
        {
          path: 'articledetails',
          name : 'articledetails',
          component: articledetails,
        },
        {
          path: 'memory',
          name : 'memory',
          component: memory,
          children:[
            {
              path: 'ershishiguang',
              name : 'ershishiguang',
              component: ershishiguang,
            },
            {
                path: 'chuzhongsuiyue',
                name : 'chuzhongsuiyue',
                component: chuzhongsuiyue,
              },
              {
                path: 'daxuelangdang',
                name : 'daxuelangdang',
                component: daxuelangdang,
              },
              {
                path: 'gaozhongsannian',
                name : 'gaozhongsannian',
                component: gaozhongsannian,
              },
              {
                path: 'yanjiushenghuo',
                name : 'yanjiushenghuo',
                component: yanjiushenghuo,
              },
              {
                path: 'zhenxidangxia',
                name : 'zhenxidangxia',
                component: zhenxidangxia,
              },
          ]
        }
      ]
    },

    {
      path: '/login',
      component: login
    },

    {
      path:'/back',
      name: 'houtai',
      component:  consolein,
      children: [     //在consolein这个组件中，路由，不用加入/back
        {
          //在后台管理当中，  默认编辑首页的页面 
          path: '/back',    //通过/back 去路由
          name: 'editin',
          component : editin
        },
        { //随笔管理
          path: '/look',
          name: 'looks',
          component: looks
        },
        { //其他管理
          path: '/others',
          name:  'others',
          component: others
        },

        //随笔管理的编辑和新增 : 就是说啥呢？   在consolein这个组件里面的组件的路由，到这里面。
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

        //留言管理
        {
          path: '/discussManage',
          name:  'discussManage',
          component: discussManage
        }
      ]
    }

  ]
})

//添加导航守卫;先别添加

export default router;