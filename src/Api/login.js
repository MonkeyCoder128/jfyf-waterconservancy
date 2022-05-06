import request from "@/utils/http";

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
export function getUserInfo(token) {
    return request({
        method: 'GET',
        url: '/admin/info',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}
//用户菜单接口
export function menuList(token) {
    return request({
        method: 'GET',
        url: '/menu/getMenuList',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}


