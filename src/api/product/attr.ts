import request from "@/utils/request";

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface CategoryObj {
    id: number|string,
    name: string,
    category1Id?: number,
    category2Id: number,
    category3Id: number
}

export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

export interface AttrValue {
    attrId: number|string,
    id: number|string,
    valueName: string,
    isInputVisable: boolean
}

export interface Attr {
    attrName: string,
    categoryId: number|string,
    categoryLevel: number,
    attrValueList: AttrValue[],
}

export interface AttrResponseData extends ResponseData {
    data: Attr[]
}

enum API {
    C1_URL = '/admin/product/getCategory1', //  获取一级分类接口
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1 = () => {
    return request.get<any, CategoryResponseData>(API.C1_URL);
}

export const reqC2 = (category1Id:number|string) => {
    return request.get<any, CategoryResponseData>(API.C2_URL + category1Id);
}

export const reqC3 = (category2Id:number|string) => {
    return request.get<any, CategoryResponseData>(API.C3_URL + category2Id);
}

export const reqGetAttr = (category1Id:string|number, category2Id:string|number, category3Id:string|number) => {
    return request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
}

export const reqAddOrUpdateAttr = (data: Attr) => {
    return request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

export const reqRemoveAttr = (attrId: number) => {
    return request.delete<any, any>(API.DELETEATTR_URL + attrId)
}

