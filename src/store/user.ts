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
    data: {
        token?: string,
        message: string
    }
}

export interface userResponseData {     //  获取信息接口 后端返回给前端的数据类型
    code: number,
    data: user,

}

interface user {
    checkUser: {
        userId: number,
        avatar: string,
        username: string,
        password: string,
        desc: string,
        roles: string[],
        buttons: string[],
        routes: string[],
        token: string,
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
            if (result.code === 200) {
                this.token = result.data as unknown as string;
                localStorage.setItem("token", result.data as unknown as string)
            }
        },
        async userInfo() {
            const result = await reqUserInfo();
            console.log(result)
            if (result.code === 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
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