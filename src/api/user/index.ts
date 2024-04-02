import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from "./type";

enum API {
    LOGIN_URL = "/user/login/",
    USERINFO_URL = "/user/info/",
}
 // eslint-disable-next-line
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//  any指定请求的返回类型，loginResponseData来指定Promise的resolve值的类型，也就是请求成功后的返回数据类型
 // eslint-disable-next-line
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);
