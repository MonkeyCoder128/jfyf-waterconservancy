import {
    postJsonRequest,
    getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const USER = {
    // 获取用户列表
    userList(params) {
        return getRequest(`${base}/user/userList`, params)
    },
    // 用户新增
    addinsertUser(data) {
        return postJsonRequest(`${base}/user/insertUser`, data)
    },
    // 查看用户信息
    viewUserInfo(userId,) {
        return getRequest(`${base}/user/selectUserById?userId=` + userId)
    },
    
    // 删除用户信息
    deleteUserGet(userId,) {
        return getRequest(`${base}/user/deleteUser?userId=` + userId)
    },
    // 修改用户信息(表单方式提交用户信息)
    updateUserInfo(data) {
        return postJsonRequest(`${base}/user/updateUser`, data)
    },
    // 修改用户状态
    updateUserState(data) {
        return postJsonRequest(`${base}/user/updateUser`, data)
    },
    // 修改密码
    updatePassWd() {
        return postJsonRequest(`${base}/user/updatePassWord`)
    },
}
export default USER




