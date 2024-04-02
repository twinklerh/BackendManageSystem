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
    data: user
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