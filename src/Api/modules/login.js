// import request from "@/utils/http";
import {
	postJsonRequest,
	getRequest
} from "@/utils/http"
const base = process.env.VUE_APP_BASE_API
console.log(process.env)
const LOGIN = {
	// 登录方法
	Loginform (parmas) {
		return postJsonRequest(`${base}/login/info`, parmas)
	},
	// 获取用户信息
	getUserInfo (parmas) {
		return getRequest(`${base}/admin/info`, parmas)
	},
	menuList (parmas) {
		return getRequest(`${base}/menu/getMenuList`, parmas)
	},
}
export default LOGIN
// 使用
// this.$api.LOGIN.menuList({id: id}).then(res => {
//    console.log(res)
// })