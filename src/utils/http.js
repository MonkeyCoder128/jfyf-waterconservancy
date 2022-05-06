import axios from 'axios'
import config from '@/config/index'
import { getToken } from "@/utils/auth";
import { Message, MessageBox, Notification } from "element-ui";
const http = axios.create({
    baseURL: config.devServer.proxy['/api'].target, // api的base_url
    timeout: 10000 // 请求超时时间
})
// 请求拦截器
http.interceptors.request.use((config) => {
    if (getToken()) {
        config.headers["Token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;

})
// 响应拦截器
http.interceptors.response.use((ret) => {
    console.log("%c响应拦截器：", "color:red;font-size:18px;font-weight:bold;", ret.data.code);
    let code = ret.data.code;
    if (code == null) {
        code = ret.status;
    }
    if (
        code == null &&
        ret.headers["content-type"] == "application/octet-stream"
    ) {
        return ret.data;
    }
    if (code === 302) {
        this.$router.push({ path: "/" });
        location.reload();
    } else if (code != 200) {
        Notification.error({
            title: ret.data.message
        });
        return Promise.reject("error");
    } else {
        return ret;
    }
}, error => {
    return Promise.reject(error);
})
export default http