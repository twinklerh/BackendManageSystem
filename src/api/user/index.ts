import request from "@/utils/request";
import type { loginForm, loginResponseData, userInfoResponseData } from "@/store/user";

enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}
// eslint-disable-next-line
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//  any指定请求的返回类型，loginResponseData来指定Promise的resolve值的类型，也就是请求成功后的返回数据类型
// eslint-disable-next-line
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL);
// eslint-disable-next-line
export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)
