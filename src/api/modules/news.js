import {
    postJsonRequest,
    getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const NEWS = {
    // 消息列表展示,条件查询
    newsList(data) {
        return postJsonRequest(`${base}/reservoirMessageRecordController/search`, data)
    },
    // 获取消息类型接口
    newsType() {
        return getRequest(`${base}/reservoirMessageRecordController/getMessageType`,)
    },
}
export default NEWS








