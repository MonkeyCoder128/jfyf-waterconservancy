import request from "@/utiles/http";

// 登录
export  function  Loginform(data){
    return request.post('/Manager/ManagerLogin',data)
}