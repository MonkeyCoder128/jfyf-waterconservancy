import axios from 'axios'
import config from '@/config/index' 
const http = axios.create({
    baseURL: config.baseURL, // api的base_url
    timeout: 10000 // 请求超时时间
})
// 请求拦截器
http.interceptors.request.use((config)=>{
    return config

})
// 响应拦截器
http.interceptors.response.use((config)=>{
    return config
})
export default http