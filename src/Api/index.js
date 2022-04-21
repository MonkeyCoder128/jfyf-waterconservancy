//引入
import request from "@/utils/request";

// get
export function loginform(name){
    return request({
        url: "/地址",
        method: "get",
        params: name,
      });   
}
// post
export  function  loginform(data){
    return request.post('/地址',data)
}