import request from "@/utils/request"

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
  
export interface SpuData {  //  
    id?: number
    spuName: string
    description: string
    category3Id: string | number
    tmId: number | string
    spuSaleAttrList: null | SaleAttr[]
    spuImageList: null | SpuImg[]
}
  
export interface HasSpuResponseData extends ResponseData {  //  获取SKU时，后台返回给前端的数据类型
    data: {
        records: SpuData[]
        total: number
        size: number
        current: number
        searchCount: boolean
        pages: number
    }
}
  
export interface Trademark {
    id: number
    tmName: string
    logoUrl: string
}
  
export interface AllTradeMark extends ResponseData {
    data: Trademark[]
}
  
export interface SpuImg {
    id?: number
    createTime?: string
    updateTime?: string
    spuId?: number
    imgName?: string
    imgUrl?: string
    name?: string
    url?: string
}
  
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}
  
export interface SaleAttrValue {
    id?: number
    createTime?: null
    updateTime?: null
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrValueName: string
    saleAttrName?: string
    isChecked?: null
}
  
export type SpuSaleAttrValueList = SaleAttrValue[]
  
export interface SaleAttr {
    id?: number
    createTime?: null
    updateTime?: null
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrName: string
    spuSaleAttrValueList: SpuSaleAttrValueList
    flag?: boolean
    saleAttrValue?: string
}
  
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}
  
export interface HasSaleAttr {
    id: number
    name: string
}
  
export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}
  
export interface Attr {
    attrId: number | string
    valueId: number | string
}
  
export interface saleAttr {
    saleAttrId: number | string
    saleAttrValueId: number | string
}
  
export interface SkuData {
    category3Id: string | number //三级分类的ID
    spuId: string | number //已有的SPU的ID
    tmId: string | number //SPU品牌的ID
    skuName: string //sku名字
    price: string | number //sku价格
    weight: string | number //sku重量
    skuDesc: string //sku的描述
    skuAttrValueList?: Attr[]
    skuSaleAttrValueList?: saleAttr[]
    skuDefaultImg: string //sku图片地址
}
  
export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}

enum API {
    HASSPU_URL = '/admin/product/',
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    IMAGE_URL = '/admin/product/spuImageList/',
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    SKUINFO_URL = '/admin/product/findBySpuId/',
    REMOVESPU_URL = '/admin/product/deleteSpu/',
}

export const reqHasSPU = (current_page:number, page_size:number, c3Id:number) => {
    return request.get<any,HasSpuResponseData>(API.HASSPU_URL + `${current_page}/${page_size}?category3Id=${c3Id}`)
}