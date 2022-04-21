import request from "@/utiles/http";

//检测账号是否存在
export function ExistAccount(name){
    return request({
        url: "/Manager/ExistAccount",
        method: "get",
        params: name,
      });   
}
// 注册
export  function  Register(data){
    return request.post('/Manager/ManagerRegister',data)
}