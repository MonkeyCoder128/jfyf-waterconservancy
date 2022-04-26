import request from "@/utiles/http";

// 获取用户信息方法
export function InintData(data,token) {
  return request({
    method: 'POST',
    url: '/reservoirInspectionRecord/list',
    headers: {
      Authorization: token,
    },
    data:data,
  })
}