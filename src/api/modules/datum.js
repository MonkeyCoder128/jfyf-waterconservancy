import {
    postJsonRequest,
    getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const DATUM = {
    // 省市查询
    provinceCity(pid) {
        return getRequest(`${base}/provinceCity/selectByPid?pid=` + pid,)
    },
    //获取配置管理信息
    getDetail() {
        return getRequest(`${base}/configurationData/getDetail`,)
    },
    // // 消息列表展示,条件查询
    // newsList(data) {
    //     return postJsonRequest(`${base}/reservoirMessageRecordController/search`, data)
    // },
}
export default DATUM








