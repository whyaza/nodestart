// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//elementUI 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.use(ElementUI);
Vue.prototype.$http = axios.create({
  //创建一个axios实例，指定接口根地址
  baseURL: 'http://localhost:3000/api'
})

//引入axios  前后段同构的请求接口。


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
