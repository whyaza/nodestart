// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//elementUI 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入axios  前后段同构的请求接口。
import axios from 'axios'
//引入vuex,进行状态管理
import store from '../store/index'

//引入自定义样式的elementui的css （black）  最后 修这个

import '../theme/index.css'

Vue.use(ElementUI);

//之后使用this.$http  就相当于是使用axios
Vue.prototype.$http = axios.create({
  baseURL: '/api',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
})

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['token'] = token
}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
