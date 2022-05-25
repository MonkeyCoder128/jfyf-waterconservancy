import axios from 'axios'
import config from '@/config/index'
import {
  Notification,
} from "element-ui";
import router from '../router'
import VueCookies from "vue-cookies";
axios.defaults.timeout = 10000; // 请求超时5fen
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// 请求拦截器
axios.interceptors.request.use((config) => {
  if (VueCookies.isKey('token')) {
    config.headers["Authorization"] = VueCookies.get('token'); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
})
// 响应拦截器
axios.interceptors.response.use((response) => {
  var reg = /<[^>]+>/g;
  if (reg.test(response.data) === true) {
    sessionStorage.clear();
    localStorage.clear();
    VueCookies.remove('token')
    router.replace({
      name: 'login'
    })
  } else if (reg.test(response.data) === false) {
    let code = response.data.code;
    if (code === 302) {
      router.replace({
        name: 'login'
      })
      sessionStorage.clear();
      localStorage.clear();
      VueCookies.remove('token')
      Notification.error({
        title: '已过期 请重新登录！'
      });
    } else if (code != 200) {
      // VueCookies.remove('token')
      Notification.error({
        title: response.data.result
      });
      return Promise.reject("error");
    } else {
      return response.data;
    }
  }
}, error => {
  return Promise.reject(error);
})

export const postJsonRequest = (url, params) => {
  // params.userViewId = ADMININFOs.viewId
  return axios({
    method: "post",
    url: url,
    data: params,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const getRequest = (url, data = {}) => {
  return axios({
    method: "get",
    params: data,
    url: url,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const deleteRequest = (url, params = {}) => {
  return axios({
    method: "DELETE",
    data: params,
    url: url,
    headers: {
      "Content-Type": "application/json"
    }
  });
};