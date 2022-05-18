// import request from "@/utils/http";
import {
	postJsonRequest,
	getRequest,
  deleteRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const SAFE = {
	// 获取用户信息方法
	InintData (parmas) {
		return postJsonRequest(`${base}/reservoirInspectionRecord/list`, parmas)
	},
	// 根据id查询记录接口
	SelectReport (parmas) {
		return getRequest(`${base}/reservoirInspectionRecord/selectById`, parmas)
	},
  // 异常上报接口
	ReportErr (parmas) {
		return postJsonRequest(`${base}/reservoirInspectionRecord/reNew`, parmas)
	},
  // 通过id查询巡检记录接口
	InspectionId (parmas) {
		return getRequest(`${base}/reservoirInspectionRecord/selectReportRecordById`, parmas)
	},
  // 管理条例列表展示、搜索
	Regulations (parmas) {
		return postJsonRequest(`${base}/reservoirInspectionRuleController/search`, parmas)
	},
  // 删除管理条例
  DeleteRule (parmas) {
		return deleteRequest(`${base}/reservoirInspectionRuleController/deleteRule`, parmas)
	},
  // 新增管理条例
  InsertRule (parmas) {
		return postJsonRequest(`${base}/reservoirInspectionRuleController/insertRule`, parmas)
	},
}
export default SAFE
// 使用
// this.$api.LOGIN.menuList({id: id}).then(res => {
//    console.log(res)
// })
