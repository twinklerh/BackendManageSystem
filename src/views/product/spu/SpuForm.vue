<template>
    <el-card style="margin-top: 10px;">
        <el-form style="margin-top: 10px;margin-left: 50px;">
            <el-form-item label="SPU名称">
                <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select style="width: 220px;" v-model="SpuParams.tmId">
                    <el-option :label="item.tmName" v-for="(item, index) in allBrand" :value="item.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" v-model="SpuParams.description" placeholder="请输入SPU描述"></el-input>
            </el-form-item>
             <el-form-item label="SPU图标">
                <!-- file-list告诉你，你上传之后的图片列表到底是显示图片的缩略图还是用文字列表或其它显示 
                    on-preview是照片墙点击预览放大后的效果 -->
                <el-upload v-model:file-list="imgList" action="http://sph-api.atguigu.cn/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="()=>{}" :before-upload="handlerUpload">
                    <el-icon><Plus /></el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">     <!--展示图片放大后的对话框-->
                    <img w-full :src="dialogImageUrl" style="width: 100%; height: 100%" />
                    <!--w-full用来确保图片在对话框中水平填满整个宽度，以适应对话框的大小-->
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性" style="width: 920px;">
                <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '暂无数据可选择'" style="width: 220px;">
                    <el-option :label="item.name" v-for="(item, index) in unSelectSaleAttr" :key="index" :value="`${item.id}:${item.name}`"></el-option>
                </el-select>
                <el-button style="margin-left: 10px" type="primary" icon="Plus" :disabled="saleAttrIdAndValueName ? false : true" @click="addSaleAttr">添加属性</el-button>
                <el-table border style="margin: 10px 0;" :data="saleAttr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值">
                        <template #="{ row, $index }">
                            <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="index" class="mx-1" closable style="margin: 0 8px" @close="row.spuSaleAttrValueList.splice($index, 1)">
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <!--下面这行自动注入了组件实例-->
                            <el-input :ref="(vc:any)=>{inputArr[$index]=vc}" v-model="row.saleAttrValue" v-if="row.flag === true" placeholder="请你输入属性值" size="small" style="width: 100px" @blur="blurHappenOnAttrInput(row)"></el-input>
                            <el-button v-else size="small" icon="Plus" @click="toEdit(row, $index)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ $index }">
                            <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" @click="save" :disabled="saleAttr.length > 0 ? false : true">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { reqAllBrand, AllBrand, Brand, SpuImg, SpuData, HasSaleAttr, SaleAttr, SaleAttrValue, reqAddOrUpdateSpu, HasSaleAttrResponseData, reqAllSalAttr, SpuHasImg, SaleAttrResponseData, reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
import { ElMessage } from 'element-plus';
const allBrand = ref<Brand[]>([])    //  SPU品牌
const imgList = ref<SpuImg[]>([])
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)   //  控制预览图片对话框的显示与隐藏
const SpuParams = ref<SpuData>({ category3Id: '', spuName: '', description: '', tmId: '', spuImageList: [], spuSaleAttrList: []})
const saleAttrIdAndValueName = ref<string>('')  //  SPU销售属性下拉框最终选定的数据
const allSaleAttr = ref<HasSaleAttr[]>([])
const saleAttr = ref<SaleAttr[]>([])    //  table展示的数据
const inputArr = ref<any>([])   //  table中自动注入的组件实例

const unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleAttr.value.filter((item) => {
        return saleAttr.value.every((item1) => {    //  every方法用于检查数组中的每个元素是否都满足指定的条件，如果当前元素满足条件，则返回 true
            return item.name != item1.saleAttrName
        })
    })
    return unSelectArr
})

const $emit = defineEmits(['changeCard'])

const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

const handlerUpload = (file: any) => {
    console.log(file)
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
        if (file.size / 1024 / 1024 < 3)    return true
        else {
            ElMessage.error('上传文件必须小于3M');
            return false
        }
    } else {
        ElMessage.error('上传文件务必PNG|JPG|GIF')
        return false
    }
}

const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    const newSaleAttr: SaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: []} //  准备一个心底销售属性对象，将来带给服务器
    saleAttr.value.push(newSaleAttr)    //  追加到数组中
    saleAttrIdAndValueName.value = ''   //  清空收集的数据
}

const toEdit = (row: SaleAttr, $index: number) => {
    row.flag = true
    row.saleAttrValue = ''
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}

const blurHappenOnAttrInput = (row: SaleAttr) => {
    const { baseSaleAttrId, saleAttrValue } = row
    const newSaleAttrValue: SaleAttrValue = { baseSaleAttrId, saleAttrValueName: saleAttrValue as string }
    if (saleAttrValue?.trim() === '') {
        ElMessage.error('属性值不能为空')
        return
    }
    const repeat = row.spuSaleAttrValueList.find((item) => item.saleAttrValueName === saleAttrValue)
    if (repeat) {
        ElMessage.error('属性值重复')
        return
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    row.flag = false
}

const cancel = () => {
    $emit('changeCard', { flag: 0, params: 'update' })
}

const save = async () => {
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {   //整理照片数据
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url,   //  赋值为当前元素的response.data属性（如果存在），否则赋值为当前元素的 url 属性
        }
    })
    SpuParams.value.spuSaleAttrList = saleAttr.value    //  整理销售属性的数据
    const res = await reqAddOrUpdateSpu(SpuParams.value)
    if (res.code === 200) {
        ElMessage({ type: 'success', message: SpuParams.value.id ? '更新成功' : '添加成功'})
        $emit('changeCard', {
            flag: 0,
            params: SpuParams.value.id ? 'update' : 'add',
        })
    }   else    {
        ElMessage.error(SpuParams.value.id ? '更新失败' : '添加失败')
    }
}

const initAddSpu = async (c3Id: number | string) => {
    //  每次添加都要清空之前的数据
    Object.assign(SpuParams.value, {category3Id: '', spuName: '', description: '', tmId: '', spuImageList: [], spuSaleAttrList: [],})
    imgList.value = []
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''

    const result: AllBrand = await reqAllBrand()   //  获取全部品牌数据
    allBrand.value = result.data

    SpuParams.value.category3Id = c3Id

    const result1: HasSaleAttrResponseData = await reqAllSalAttr()
    allSaleAttr.value = result1.data
}

const initHasSpuData = async (row: SpuData) => {   //  父组件修改已有数据时，调用此方法获得数据库中原有的数据
    SpuParams.value = row   //  存储已有的SPU数据，用于在模板上展示
    const res: AllBrand = await reqAllBrand()
    allBrand.value = res.data   //  存储全部的品牌数据

    const res1: SpuHasImg = await reqSpuImageList(row.id as number)   //  获取某一品牌下全部商品的售卖图片
    imgList.value = res1.data.map((item) => {
        return {    //  因为展示图片要一个name要一个url属性，我们这里把每个imgName变成name，把每个imgUrl变成url
            name: item.imgName,
            url: item.imgUrl,
        }
        //map用于对数组中的每个元素执行指定的函数，并返回一个新的数组，该数组包含每个元素调用函数的结果
    })

    const res2: SaleAttrResponseData = await reqSpuHasSaleAttr(row.id as number)    //  获取已有的SPU销售属性的数据
    saleAttr.value = res2.data

    const res3: HasSaleAttrResponseData = await reqAllSalAttr()     //  获取整个项目全部SPU的销售属性
    allSaleAttr.value = res3.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>

<style lang="scss" scoped>
.el-form-item {
    margin-top: 10px;
    width: 760px;
}
</style>