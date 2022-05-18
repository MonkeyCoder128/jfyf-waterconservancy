import {
    postJsonRequest,
    getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const ROLE = {
    // 查询角色列表
    roleList(params) {
        return getRequest(`${base}/role/getSystemRoleList`, params)
    },
    // 根据角色查询菜单
    roleMenu(roleId) {
        return getRequest(`${base}/menu/getSystemRole?roleId=` + roleId)
    },
    // 角色新增
    addRole(data) {
        return postJsonRequest(`${base}/menu/insertSystemRole`, data)
    },

    // 查看角色信息(具体Id)
    viewRoleInfo(roleId) {
        return getRequest(`${base}/menu/getSystemRole?roleId=` + roleId)
    },

    // 修改角色信息
    updateRole(data) {
        return postJsonRequest(`${base}/menu/updateSystemRole`, data)
    },
}
export default ROLE

// // 删除角色信息
// export function deleteRoleGet(id, token) {
//     return request({
//         method: 'GET',
//         url: '/role/deleteSystemRole?id=' + id,
//         headers: {
//             contentType: 'application/json',
//             Authorization: token,
//         },
//     })
// }



