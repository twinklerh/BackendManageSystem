import { reqLogin, reqUserInfo } from "@/api/user";
import { defineStore } from "pinia";
import { UserState } from "./modules/type/UserState";
import { routes } from "@/router/routes";

export interface loginForm {    //  登录接口 发给后端的数据类型
    username: string,
    password: string,
}

export interface loginResponseData {    //  登录接口 后端返回给前端的数据类型
    code: number,
    data: string,
    message: string,
    ok: boolean
}

// interface user {
//     checkUser: {
//         userId: number,
//         avatar: string,
//         username: string,
//         password: string,
//         desc: string,
//         roles: string[],
//         buttons: string[],
//         routes: string[],
//         token: string,
//     }
// }

export interface userInfoResponseData { 
    code: number, messaage: string, ok: boolean,
    data: {
        routes: [],
        buttons: [],
        roles: [],
        name: string,
        avatar: string
    }

}

export const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            token: localStorage.getItem('token'),
            menuRoutes: routes,
            username: '',
            avatar: '',
        }
    },
    actions: {
        async login(data: loginForm) {
            const result: loginResponseData = await reqLogin(data);
            console.log(result)
            if (result.code === 200) {
                this.token = result.data;
                localStorage.setItem("token", result.data)
                return 'success'
            }
            return result.data
        },
        async userInfo() {
            const result:userInfoResponseData = await reqUserInfo();
            if (result.code === 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar
                return "ok";
            }   else    {
                return Promise.reject('获取用户信息失败');
            }
        },
        async userLogOut() {
            this.username = this.token = this.avatar = "";
            localStorage.removeItem("jwt_token")
        }
    }
})