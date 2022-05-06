import request from "@/utils/http";

// 获取用户列表
export function userList(query, token) {
    return request({
        method: 'GET',
        url: '/user/userList',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        params: query
    })
}

// 用户新增
export function addinsertUser(data, token) {
    return request({
        method: 'POST',
        url: '/user/insertUser',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        data
    })
}

// 删除用户信息
export function deleteUserGet(userId, token) {
    return request({
        method: 'GET',
        url: '/user/deleteUser?userId=' + userId,
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}
// 查看用户信息
export function viewUserInfo(userId, token) {
    return request({
        method: 'GET',
        url: '/user/selectUserById?userId=' + userId,
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },

    })
}
// 修改用户信息(表单方式提交用户信息)
export function updateUserInfo(data, token) {
    return request({
        method: 'POST',
        url: '/user/updateUser',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        data
    })
}
// 修改用户状态
export function updateUserState(data, token) {
    return request({
        method: 'POST',
        url: '/user/updateUser',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        data
    })
}
// 修改密码
export function updatePassWd() {
    return request({
        method: 'POST',
        url: '/user/updatePassWord',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}




