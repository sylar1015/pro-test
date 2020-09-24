import service from "../utils/request";

/*
* 登录
* */
export function Login(data) {
    return service.request({
        url:'/login/',
        method:'post',
        data:data
        //get params:{}
    });
}

/*
* 获取验证码
* */
export function GetCode(data) {
    return service.request({
        url:'/getSms/',
        method:'post',
        data:data
        //get params:{}
    });
}

