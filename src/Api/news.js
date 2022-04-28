import request from "@/utiles/http";

// 消息列表展示,条件查询
export function newsList(data, token) {
    return request({
        method: 'POST',
        url: '/reservoirMessageRecordController/search',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        data
    })
}
// 获取消息类型接口
export function newsType(token) {
    return request({
        method: 'GET',
        url: '/reservoirMessageRecordController/getMessageType',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}









