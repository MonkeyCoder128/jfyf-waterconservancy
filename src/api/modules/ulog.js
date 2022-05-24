import {
    postJsonRequest,
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const USER = {
    // 操作日志查询接口
    ulogData(data) {
        return postJsonRequest(`${base}/sysLog/list`, data)
    },
}
export default USER




