import axios from 'axios'
import store from "@/store";
import config from '@/config/index'
import { getToken } from "@/utils/auth";
import { Message, MessageBox, Notification } from "element-ui";
const service = axios.create({
    baseURL: config.devServer.proxy['/api'].target, // api的base_url
    withCredentials: true, //跨域请求时发送cookies
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    timeout: 10000, // 请求超时时间

})
// 请求拦截器

service.interceptors.request.use(
    config => {
        // 判断是否存在token,把token添加点请求头中，每次请求携带token传给后端
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        //处理错误请求
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code !== 200) {
        console.log("%c失败了：", "color:blue;font-size:18px;font-weight:bold;");
        return res
    } else {
        //请求成功
        return res
    }

}, error => {
    return Promise.reject(error)
})
export default service