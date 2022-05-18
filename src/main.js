import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
Vue.prototype.$video = videojs;
import * as echarts from 'echarts';
import './assets/css/variable.scss'
import './assets/xjicon/iconfont.css'

import api from '@/api'
Vue.prototype.$api = api;
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
