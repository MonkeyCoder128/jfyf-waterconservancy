import axios from 'axios'
import config from '@/config/index'
import { Notification, } from "element-ui";
import router from '../router'

const http = axios.create({
    baseURL: config.devServer.proxy['/api'].target, // api的base_url
    timeout: 10000 // 请求超时时间
})
// 请求拦截器
http.interceptors.request.use((config) => {
    if (sessionStorage.getItem("token")) {
        config.headers["Token"] = sessionStorage.getItem("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;

})
// 响应拦截器
http.interceptors.response.use((response) => {
    var reg = /<[^>]+>/g;
    console.log("%cresponse：", "color:blue;font-size:18px;font-weight:bold;", response,);
    if (reg.test(response.data) === true) {
        sessionStorage.clear();
        localStorage.clear();
        router.replace({ name: 'login' })
    } else if (reg.test(response.data) === false) {
        let code = response.data.code;
        if (code === 302) {
            router.replace({ name: 'login' })
            sessionStorage.clear();
            localStorage.clear();
            Notification.error({
                title: '已过期 请重新登录！'
            });
        } else if (code != 200) {
            Notification.error({
                title: response.data.message
            });
            return Promise.reject("error");
        } else {
            return response;
        }
    }
}, error => {
    return Promise.reject(error);
})
export default http