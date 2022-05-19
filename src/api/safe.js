import request from "@/utils/http";

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

// 根据id查询记录接口
export function SelectReport(id,token) {
  return request({
    method: 'GET',
    url: 'reservoirInspectionRecord/selectById?id='+id,
    headers: {
      Authorization: token,
    },
  })
}

// 异常上报接口
export function ReportErr(data,token) {
  return request({
    method: 'POST',
    url: '/reservoirInspectionRecord/reNew',
    headers: {
      Authorization: token,
    },
    data:data,
  })
}

// 异常上报接口
export function InspectionId(id,token) {
  return request({
    method: 'GET',
    url: 'reservoirInspectionRecord/selectReportRecordById?inspectionId='+id,
    headers: {
      Authorization: token,
    },
  })
}

// 管理条例列表展示、搜索
export function Regulations(data,token) {
  return request({
    method: 'POST',
    url: '/reservoirInspectionRuleController/search',
    headers: {
      Authorization: token,
    },
    data:data,
  })
}

// 删除管理条例
export function DeleteRule(data,token) {
  return request({
    method: 'DELETE',
    url: '/reservoirInspectionRuleController/deleteRule',
    headers: {
      Authorization: token,
    },
    data:data,
  })
}

// 新增管理条例
export function InsertRule(data,token) {
  return request({
    method: 'POST',
    url: '/reservoirInspectionRuleController/insertRule',
    headers: {
      Authorization: token,
    },
    data:data,
  })
}

