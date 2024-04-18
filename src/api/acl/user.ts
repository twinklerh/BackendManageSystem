import request from "@/utils/request"

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
export interface User {
    id?: number
    createTime?: string
    updateTime?: string
    username?: string
    password?: string
    name?: string
    phone?: null
    roleName?: string
}
export interface UserResponseData extends ResponseData {
    data: {
      records: User[]
      total: number
      size: number
      current: number
      pages: number
    }
}
export interface RoleData {
    id?: number
    createTime?: string
    updateTime?: string
    roleName: string
    remark: null
}
export interface AllRoleResponseData extends ResponseData {
    data: {
      assignRoles: RoleData[]
      allRolesList: RoleData[]
    }
}  
export interface SetRoleData {
    roleIdList: number[]
    userId: number
}

enum API {
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update',
    ALLROLEURL = '/admin/acl/user/toAssign/',
    SETROLE_url = '/admin/acl/user/doAssignRole',
    DELETEUSER_URL = '/admin/acl/user/remove/',
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username: string) =>{
    return request.get<any, UserResponseData>(
        API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
    )
}
  
export const reqAddOrUpdateUser = (data: User) => {
    if (data.id)    return request.put<any, any>(API.UPDATEUSER_URL, data)
    else            return request.post<any, any>(API.ADDUSER_URL, data)
}
  
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)

export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_url, data)

export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.DELETEUSER_URL + userId)

export const reqSelectUser = (idList: number[]) => request.delete(API.DELETEALLUSER_URL, { data: idList })
