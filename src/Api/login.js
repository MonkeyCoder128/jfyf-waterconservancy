import request from "@/utiles/http";

// 登录方法
export function Loginform(data) {
    return request({
        method: 'POST',
        url: '/login/info',
        Headers: {
            contentType: 'application/json'
        },
        data
    })
}
// 获取用户信息
export function getUserInfo() {
    return request({
        method: 'GET',
        url: '/admin/info',
        Headers: {
            contentType: 'application/json'
        },
    })
}


