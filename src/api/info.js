/*
* 登录
* */
import service from "../utils/request";

export function DeptList(data) {
    return service.request({
        url:'/department/list',
        method:'post',
        data:data
        //get params:{}
    });
}