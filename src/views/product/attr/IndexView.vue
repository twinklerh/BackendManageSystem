<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select class="el-select" v-model="c1Id" @change="changeHappenOnFirstSelect" :disabled="dialogChoice!=0">
                    <el-option v-for="(c1,index) in c1Arr" :key="index" :label="c1.name" :value="c1.id"></el-option>                        
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select class="el-select" v-model="c2Id" @change="changeHappenOnSecondSelect" :disabled="dialogChoice!=0">
                    <el-option v-for="(c2,index) in c2Arr" :key="index" :label="c2.name" :value="c2.id"></el-option>                        
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select class="el-select" v-model="c3Id" :disabled="dialogChoice!=0">
                    <el-option v-for="(c3,index) in c3Arr" :key="index" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
    
    <el-card class="choice-card" v-show="dialogChoice===0">
        <el-button type="primary" size="default" icon="Plus" :disabled="c3Id==='' ? true : false" @click="changeDialogChoice(1)">添加属性</el-button>
        <el-table border style="margin:10px 0px;" :data="attrArray">
            <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
            <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
            <el-table-column label="属性值名称">
                <template #default="scope">
                    <el-tag v-for="(item,index) in scope.row.attrValueList" :key="index">{{ item.valueName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
                <template #default="scope">
                    <el-button @click="editAttr(scope.row)" type="primary" size="small" icon="Edit" round></el-button>
                    <el-button @click="deleteAttr(scope.row)" type="warning" size="small" icon="Delete" round></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <el-card class="choice-card" v-show="dialogChoice===1">
        <el-form>
            <el-form-item label="属性名称">
                <el-input placeholder="请输入属性名称" style="width: 240px;" v-model="attrParams.attrName" clearable></el-input>                
            </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" @click="addAttrIntoTable">添加属性值</el-button>
        <el-table :data="attrParams.attrValueList" border>
            <el-table-column label="序号" type="index" width="120px"></el-table-column>
            <el-table-column label="属性值名称">
                <template #default="scope">
                    <el-input placeholder="请输入属性值名称" v-model="scope.row.valueName"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-button type="primary" @click="saveThenCommit">保存</el-button>
        <el-button type="primary" @click="backHomeChoice">取消</el-button>
    </el-card>

</template>

<script lang="ts" setup>
import { Attr, AttrResponseData, CategoryObj, CategoryResponseData, reqAddOrUpdateAttr, reqC1, reqC2, reqC3, reqGetAttr } from '@/api/product/attr';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';

const c1Arr = ref<CategoryObj[]>([])
const c1Id = ref<number|string>('')
const c2Arr = ref<CategoryObj[]>([])
const c2Id = ref<number|string>('')
const c3Arr = ref<CategoryObj[]>([])
const c3Id = ref<number|string>('')

const attrArray = ref<Attr[]>([])
const dialogChoice = ref<number>(0)

const attrParams = ref<Attr>({
    categoryId: '',
    categoryLevel: 3,
    attrValueList: [],
    attrName: '',
})

const backHomeChoice = () => { dialogChoice.value = 0; }
const changeDialogChoice = (n:number)=>{
    attrParams.value.attrName = ''
    attrParams.value.categoryId = c3Id.value
    dialogChoice.value = n
}

const changeHappenOnFirstSelect = async() => {
    const result:CategoryResponseData = await reqC2(c1Id.value);
    c2Arr.value = result.data;
    c3Id.value = c2Id.value = '';
}

const changeHappenOnSecondSelect = async() => {
    const result = await reqC3(c2Id.value);
    c3Arr.value = result.data;
    c3Id.value = ''
}

const addAttrIntoTable = () => {
    attrParams.value.attrValueList.push({
        valueName: '',
        id: '',
        attrId: ''
    })
}

const deleteAttr = (attr:Attr) => {
    console.log("92")
}

const editAttr = (attr:Attr) => {
    console.log("96")
}

const saveThenCommit = async() => {
    console.log(attrParams.value)
    const result = await reqAddOrUpdateAttr(attrParams.value)
    if(result.code === 200)     {
        ElMessage({type: 'success', message: '添加成功'})
        dialogChoice.value = 0;
        const result = await reqGetAttr(c1Id.value, c2Id.value, c3Id.value)
        attrArray.value = result.data
    }   else    ElMessage.error("添加失败")
}

watch(()=>c3Id.value, async(newValue, oldValue)=>{
    attrArray.value = []
    if(!newValue)     return;
    const result:AttrResponseData = await reqGetAttr(c1Id.value, c2Id.value, newValue);
    if(result.code === 200)  attrArray.value = result.data;
})

onMounted(async()=>{
    const result = await reqC1();   //获取一级分类的数据
    c1Arr.value = result.data
})

</script>

<style lang="scss" scoped>
.el-select {
    width: 180px;
}
.choice-card {
    margin: 10px 0px;
}
</style>