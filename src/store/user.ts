import { reqLogin } from "@/api/user";
import type { loginForm, loginResponseData } from "@/api/user/type";
import { defineStore } from "pinia";
import { UserState } from "./modules/type/UserState";

export const useUserStore = defineStore('user', {
    state:():UserState => {
        return {
            token: localStorage.getItem('token'),
        }
    },
    actions: {
        async login(data: loginForm) {
            const result:loginResponseData = await reqLogin(data);
            console.log(result)
            if(result.code === 200)     {
                this.token = result.data.token as string;
                localStorage.setItem("token", result.data.token as string)
            }
        }
    }
})