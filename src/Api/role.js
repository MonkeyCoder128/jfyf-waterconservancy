import request from "@/utiles/http";

// 查询角色列表
export function roleList(query, token) {
    return request({
        method: 'GET',
        url: '/role/getSystemRoleList',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        params: query
    })
}

// 删除角色信息
export function deleteRoleGet(id, token) {
    return request({
        method: 'GET',
        url: '/role/deleteSystemRole?id=' + id,
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}
//根据角色查询菜单
export function roleMenu(roleId, token) {
    return request({
        method: 'GET',
        url: '/menu/getSystemRole?roleId=' + roleId,
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
    })
}
// 角色新增
export function addRole(data, token) {
    return request({
        method: 'POST',
        url: '/menu/insertSystemRole',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        data
    })
}
// 查看角色信息(具体Id)
export function viewRoleInfo(roleId, token) {
    return request({
        method: 'GET',
        url: '/menu/getSystemRole?roleId=' + roleId,
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },

    })
}
// 修改角色信息
export function updateRole(data, token) {
    return request({
        method: 'POST',
        url: '/menu/updateSystemRole',
        headers: {
            contentType: 'application/json',
            Authorization: token,
        },
        data
    })
}



