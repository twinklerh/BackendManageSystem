import request from "@/utils/request"

enum API {
    BRAND_URL = '/admin/product/baseTrademark/', //  获取已有商品列表
    ADDBRAND_URL = '/admin/product/baseTrademark/save/',    //  添加新品牌
    UPDATEBRAND_URL = '/admin/product/baseTrademark/update/',    //  修改品牌
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface Record {    //  已有品牌数据类型
    id?: number,
    tmName: string,
    logoUrl: string
}

export interface BrandResponseData extends ResponseData {
    data: {
        records: Record[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number,
    }
}

//  page表示获取第几页，limit表示获取几个已有品牌的数据
export const reqGetHasBrand = async (page: number, limit: number) => request.get<any, BrandResponseData>(API.BRAND_URL + `${page}/${limit}`)

export const reqAddOrUpdateBrand = async (data:Record) => {
    if(data.id) {   //  修改品牌
        return request.put<any, any>(API.UPDATEBRAND_URL)
    }   else    {   //  添加品牌
        return request.post<any, any>(API.ADDBRAND_URL)
    }
} 

export const reqDeleteBrand = (id:number) => request.delete<any,any>(API.DELETE_URL)
