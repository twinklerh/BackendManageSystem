import request from "@/utils/request"

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
  
export interface RoleData {
    id?: number
    createTime?: string
    updateTime?: string
    roleName: string
    remark?: string
}
  
export interface RoleResponseData extends ResponseData {
    data: {
      records: RoleData[]
      total: number
      size: number
      current: number
      orders: []
      optimizeCountSql: boolean
      hitCount: boolean
      countId: null
      maxLimit: null
      searchCount: number
      pages: number
    }
}
  
export interface MenuData {
    id: number
    createTime: string
    updateTime: string
    pid: number
    name: string
    code: string
    toCode: string
    type: number
    status: null
    level: number
    children: []
    select: boolean
}
  
export type MenuList = MenuData[]
  
export interface MenuResponseData extends ResponseData {
    data: MenuList
}

enum API {
    ALLROLE_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
    SETPERMISSION_URL = '/admin/acl/permission/doAssign/?',
    REMOVEROLE_URL = '/admin/acl/role/remove/',
}
  
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
    request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,)
  
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id)    return request.put<any, any>(API.UPDATEROLE_URL, data)
    else            return request.post<any, any>(API.ADDROLE_URL, data)
}
  
export const reqAllMenuList = (roleId: number) => {
    return request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
}

  
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
    request.post(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`,)
  
export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + roleId)