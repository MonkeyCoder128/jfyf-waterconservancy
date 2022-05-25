import {
    postJsonRequest,
    getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const DATUM = {
    //获取配置管理信息
    getDetail() {
        return getRequest(`${base}/configurationData/getDetail`,)
    },
    // 配置管理添加修改接口
    updateConfig(data) {
        return postJsonRequest(`${base}/configurationData/management`, data)
    },
}
export default DATUM








