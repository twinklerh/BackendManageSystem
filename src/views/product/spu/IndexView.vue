<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select class="el-select" v-model="categoryStore.c1Id" @change="changeHappenOnFirstSelect" :disabled="dialogChoice!=0">
                    <el-option v-for="(c1,index) in categoryStore.c1Arr" :key="index" :label="c1.name" :value="c1.id"></el-option>                        
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select class="el-select" v-model="categoryStore.c2Id" @change="changeHappenOnSecondSelect" :disabled="dialogChoice!=0">
                    <el-option v-for="(c2,index) in categoryStore.c2Arr" :key="index" :label="c2.name" :value="c2.id"></el-option>                        
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select class="el-select" v-model="categoryStore.c3Id" :disabled="dialogChoice!=0">
                    <el-option v-for="(c3,index) in categoryStore.c3Arr" :key="index" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card style="margin-top: 10px;" v-show="cardChoice===0">
        <el-button type="primary" :disable="categoryStore.c3Id!=''">+添加SPU</el-button>
        <el-table border style="margin:10px 0px;" :data="records">
            <el-table-column label="序号" width="75px" type="index" align="center" fixed></el-table-column>
            <el-table-column label="SPU名称" width="275px" prop="spuName"></el-table-column>
            <el-table-column label="SPU描述" width="275px" prop="description"></el-table-column>
            <el-table-column label="SPU操作">
                <template #="{row}">
                    <el-button type="primary" size="small" icon="Plus" title="添加SPU"></el-button>
                    <el-button type="primary" size="small" icon="Edit" title="修改SPU"></el-button>
                    <el-button type="primary" size="small" icon="View" title="查看SPU列表"></el-button>
                    <el-popconfirm :title="`你确定要删除'${row.skuName}'`" width="200px">
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
</template>

<script lang="ts" setup>
import { CategoryResponseData, reqC1, reqC2, reqC3 } from '@/api/product/attr';
import { HasSpuResponseData, SpuData, reqHasSPU } from '@/api/product/spu';
import { onMounted, ref, watch } from 'vue';
import { useCategoryStore } from '@/store/category';

const categoryStore = useCategoryStore();

const cardChoice = ref<number>(0)
const records = ref<SpuData[]>([])    //  存储已有SPU的数据

const dialogChoice = ref<number>(0)     //  场景，控制显示哪一页的card
const currentPageNumber = ref(1)    //  当前页码
const dataTotalCount = ref(0)   //  数据总量
const pageSize = ref(8)     //  每页数据个数

const changeHappenOnFirstSelect = async() => {
    const result:CategoryResponseData = await reqC2(categoryStore.c1Id);
    categoryStore.c2Arr = result.data;
    categoryStore.c3Id = categoryStore.c2Id = '';
}

const changeHappenOnSecondSelect = async() => {
    const result = await reqC3(categoryStore.c2Id);
    categoryStore.c3Arr = result.data;
    categoryStore.c3Id = ''
}

const getHasSpu = async (pager = 1) => {   //  获取三级分类下全部已有的SPU
    currentPageNumber.value = pager;
    const result:HasSpuResponseData = await reqHasSPU(currentPageNumber.value, pageSize.value, categoryStore.c3Id as number)
    if(result.code===200)   {
        records.value = result.data.records;
        dataTotalCount.value = result.data.total
    }
    console.log(result.data.total)
    console.log(currentPageNumber.value)
}

watch(()=>categoryStore.c3Id, ()=>{
    if(!categoryStore.c3Id)  return;
    getHasSpu();
})

onMounted(async()=>{
    const result = await reqC1();   //获取一级分类的数据
    categoryStore.c1Arr = result.data
})


</script>

<style lang="scss" scoped>
.el-select {
    width: 180px;
}
</style>