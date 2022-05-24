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
import './assets/shu/iconfont.css'
import VueCookies from 'vue-cookies'
import Base64 from 'js-base64';

import api from '@/api'
Vue.prototype.$api = api;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(VueCookies);

new Vue({
  router,
  store,
  Base64,
  render: h => h(App)
}).$mount('#app')
