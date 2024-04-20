<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select class="el-select" v-model="categoryStore.c1Id" @change="categoryStore.changeHappenOnFirstSelect" :disabled="cardChoice!=0">
                    <el-option v-for="(c1,index) in categoryStore.c1Arr" :key="index" :label="c1.name" :value="c1.id"></el-option>                        
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select class="el-select" v-model="categoryStore.c2Id" @change="categoryStore.changeHappenOnSecondSelect" :disabled="cardChoice!=0">
                    <el-option v-for="(c2,index) in categoryStore.c2Arr" :key="index" :label="c2.name" :value="c2.id"></el-option>                        
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select class="el-select" v-model="categoryStore.c3Id" :disabled="cardChoice!=0">
                    <el-option v-for="(c3,index) in categoryStore.c3Arr" :key="index" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card style="margin-top: 10px;" v-show="cardChoice===0">
        <el-button type="primary" :disabled="categoryStore.c3Id===''" @click="changeCardToAddSPU()">+添加商品</el-button>
        <el-table border style="margin:10px 0px;" :data="records">
            <el-table-column label="序号" width="75px" type="index" align="center" fixed></el-table-column>
            <el-table-column label="商品名称" width="275px" prop="spuName"></el-table-column>
            <el-table-column label="商品描述" width="275px" prop="description"></el-table-column>
            <el-table-column label="商品操作">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="Edit" title="修改商品" @click="updateSpu(row)"></el-button>
                    <el-button type="primary" size="small" icon="View" title="查看商品列表"></el-button>
                    <el-popconfirm :title="`你确定要删除'${row.spuName}'吗`" width="200px" @confirm="deleteSpu(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPageNumber" :page-size="pageSize" :total=dataTotalCount
            layout="prev,pager,next,jumper,->,total" background small
            @current-change="getHasSpu" />    <!-- 三属性、两样式、一事件 -->
    </el-card>

    <SpuForm v-show="cardChoice===1" ref="spu" @changeCard="changeCard"></SpuForm>     <!--添加或修改Spu-->
</template>

<script lang="ts" setup>
import { reqC1 } from '@/api/product/attr';
import { HasSpuResponseData, SpuData, reqHasSPU, reqRemoveSpu } from '@/api/product/spu';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useCategoryStore } from '@/store/category';
import SpuForm from './SpuForm.vue';

const categoryStore = useCategoryStore();
const records = ref<SpuData[]>([])    //  存储已有SPU的数据

const cardChoice = ref(0)     //  场景，控制显示哪一页的card

const currentPageNumber = ref(1)    //  当前页码
const dataTotalCount = ref(0)   //  数据总量
const pageSize = ref(3)     //  每页数据个数
const spu = ref()

const getHasSpu = async (pager = 1) => {   //  获取三级分类下全部已有的SPU
    currentPageNumber.value = pager;
    const result:HasSpuResponseData = await reqHasSPU(currentPageNumber.value, pageSize.value, categoryStore.c3Id as number)
    if(result.code===200)   {
        records.value = result.data.records;
        dataTotalCount.value = result.data.total
    }
}

const changeCardToAddSPU = () => {
    cardChoice.value = 1
    spu.value.initAddSpu(categoryStore.c3Id)
}

const changeCard = (obj:any) => {
    console.log(obj)
    cardChoice.value = obj.flag
    if(obj.params==='update')   getHasSpu(currentPageNumber.value)  //  更新的时候留在当前页
    else                        getHasSpu()     //  添加留在第一页
    getHasSpu();
}

const deleteSpu = async (row:SpuData) => {
    console.log(555)
    const result = await reqRemoveSpu(row.id as number)
    getHasSpu()
}

const updateSpu = (row: SpuData) => {
    cardChoice.value = 1
    spu.value.initHasSpuData(row)
}

watch(()=>categoryStore.c3Id, ()=>{
    if(!categoryStore.c3Id)  return;
    getHasSpu();
})

onMounted(async()=>{
    const result = await reqC1();   //获取一级分类的数据
    categoryStore.c1Arr = result.data
})

onBeforeUnmount(()=>{
    categoryStore.c1Arr = categoryStore.c2Arr = []
    categoryStore.$reset(); //  页面卸载前则清空仓库数据
})

</script>

<style lang="scss" scoped>
.el-select {
    width: 180px;
}
</style>