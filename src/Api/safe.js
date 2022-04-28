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
