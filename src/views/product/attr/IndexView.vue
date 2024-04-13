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
                    <el-popconfirm :title="`你确定要删除'${scope.row.attrName}'吗？`" @confirm="deleteAttr(scope.row.id)" @cancel="()=>{}" confirm-button-text="确定" cancel-button-text="取消" icon="Warning" icon-color="red" width="200px">
                        <template #reference>
                            <el-button type="warning" size="small" icon="Delete" round></el-button>
                        </template>
                    </el-popconfirm>
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
        <el-button type="primary" size="default" icon="Plus" @click="addAttrIntoTable" :disabled="!attrParams.attrName">添加属性值</el-button>
        <el-table :data="attrParams.attrValueList" border>
            <el-table-column label="序号" type="index" width="120px"></el-table-column>
            <el-table-column label="属性值名称">
                <template #="{ row, $index }">         <!--自动注入了组件实例-->
                    <el-input :ref="(vc:any)=>{ inputArr[$index] = vc }" placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.isInputVisable" @blur="inputBecomeBlur(row, $index)"></el-input>
                    <div v-else @click="focusOnInput(row, $index)">{{ row.valueName }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template #="{ $index }">
                    <el-button type="warning" icon="Delete" round @click="attrParams.attrValueList.splice($index, 1)"></el-button>                
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveThenCommit">保存</el-button>
        <el-button type="primary" @click="backHomeChoice">取消</el-button>
    </el-card>

</template>

<script lang="ts" setup>
import { Attr, AttrResponseData, AttrValue, CategoryObj, CategoryResponseData, reqAddOrUpdateAttr, reqC1, reqC2, reqC3, reqGetAttr, reqRemoveAttr } from '@/api/product/attr';
import { ElMessage } from 'element-plus';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const c1Arr = ref<CategoryObj[]>([])
const c1Id = ref<number|string>('')
const c2Arr = ref<CategoryObj[]>([])
const c2Id = ref<number|string>('')
const c3Arr = ref<CategoryObj[]>([])
const c3Id = ref<number|string>('')

const attrArray = ref<Attr[]>([])
const dialogChoice = ref<number>(0)

const inputArr = ref<any>([])

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

const getAttrArray = async() => {
    const result = await reqGetAttr(c1Id.value, c2Id.value, c3Id.value)
    if(result.code === 200)  {
        attrArray.value = result.data;
        return true;
    }
    return false;
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
        attrId: '',
        isInputVisable: true,
    })
    nextTick(()=>{
        inputArr.value[attrParams.value.attrValueList.length - 1].focus()
    })
}

const deleteAttr = async(id:number) => {
    const deleteResult = await reqRemoveAttr(id)
    if(deleteResult.code===200)   {
        getAttrArray()
        ElMessage({type: 'success', message: '删除成功'});
    }   else    ElMessage.error("删除失败")
}

const editAttr = (row:Attr) => {
    dialogChoice.value = 1;
    //attrParams.value = row;      浅拷贝，如果在场景二改动了数据，如果点取消的话，场景0页面的数据会发生变化
    //  Object.assign(attrParams, row)      浅拷贝
    Object.assign(attrParams.value, JSON.parse(JSON.stringify(row)))  //  深拷贝，这种方法拷贝会忽略对象身上的特殊属性，如函数、undefine等
}

const saveThenCommit = async() => {
    const result = await reqAddOrUpdateAttr(attrParams.value)
    if(result.code === 200)     {
        ElMessage({type: 'success', message: '添加成功'})
        dialogChoice.value = 0;
        const result = await reqGetAttr(c1Id.value, c2Id.value, c3Id.value)
        attrArray.value = result.data
    }   else    ElMessage.error("添加失败")
}

const focusOnInput = (row:AttrValue, index:number) => {
    row.isInputVisable = true;  //  响应式数据发生变化后，组件需要时间更新，所以下面要用nextTick
    nextTick(()=>{
        inputArr.value[index].focus()
    })
}

const inputBecomeBlur = (row:AttrValue, index:number) => {
    if(row.valueName.trim()===''){
        attrParams.value.attrValueList.splice(index, 1)
        ElMessage.error("属性值不能为空")
        return;  //  防止为空
    }
    const repeat = attrParams.value.attrValueList.find((item)=>{
        if(row!=item)   return item.valueName === row.valueName     //  if的作用是防止与自身进行比较
    })
    if(repeat) {
        ElMessage({type: 'warning', message: '属性值不能重复'})
        attrParams.value.attrValueList.splice(index, 1)     //  去除下标是index的步长为1
    }
    row.isInputVisable = false;
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