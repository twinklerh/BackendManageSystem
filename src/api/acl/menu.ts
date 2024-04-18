import request from "@/utils/request"

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface Permission {
    id: number
    createTime: string
    updateTime: string
    pid: number
    name: string
    code: null
    toCode: null
    type: number
    status: null
    level: number
    children?: Permission[]
    select: boolean
}

export interface PermissionResponseData extends ResponseData {
    data: Permission[]
}

export interface MenuParams {
    id?: number
    code: string
    level: number
    name: string
    pid: number
}

enum API {
    ALLPERMISSION_URL = '/admin/acl/permission',
    ADDMENU_URL = '/admin/acl/permission/save',
    UPDATE_URL = '/admin/acl/permission/update',
    DELETEMENU_URL = '/admin/acl/permission/remove/',
}

export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
  
export const reqAddOrUpdateMenu = (data: MenuParams) => {
    if (data.id)    return request.put<any, any>(API.UPDATE_URL, data)
    else            return request.post<any, any>(API.ADDMENU_URL, data)
}
  
export const reqRemoveMenu = (id: number) => request.delete<any, any>(API.DELETEMENU_URL + id)
