import {
	postJsonRequest,
	getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
const LOGIN = {
	// 登录方法
	Loginform(parmas) {
		return postJsonRequest(`${base}/login/info`, parmas)
	},
	// 获取用户信息
	getUserInfo(parmas) {
		return getRequest(`${base}/admin/info`, parmas)
	},
	menuList(parmas) {
		return getRequest(`${base}/menu/getMenuList`, parmas)
	},
}
export default LOGIN