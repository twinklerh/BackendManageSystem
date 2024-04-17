<template>
    <el-card>
        <el-form class="el-form-search">
            <el-form-item label="职位搜索">
                <el-input v-model="searchContent" placeholder="输入职位名称进行搜索" />                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" placeholder="请输入职位关键字" :disabled="searchContent===''" @click="search">搜索</el-button>
                <el-button  @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin-top: 10px;">
        <el-button type="primary" @click="addRole">添加职位</el-button>
        <el-table border style="margin-top: 10px;" :data="roleList">
            <el-table-column label="#" type="index" fixed/>
            <el-table-column label="ID" width="90px" align="center" prop="id"/>
            <el-table-column label="职位名称" width="150px" align="center" prop="roleName"/>
            <el-table-column label="创建时间" width="150px" align="center" prop="createTime" show-overflow-tooltip/>
            <el-table-column label="更新时间" width="150px" align="center" prop="updateTime" show-overflow-tooltip/>
            <el-table-column label="操作" align="center">
                <template #="{ row }">
                    <el-button size="small" icon="User" @click="setPermission(row)">分配权限</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除“${row.roleName}”?`" width="260px" @confirm="removeRole(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="pagination.total" :page-size="pagination.pageSize" :current-page="pagination.currentPage"
            laylout="prev, pager, next, jumper, -> ,total" background small @current-change="currentChange"
        />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="roleParams" :rules="rules" ref="dialogFormRef">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="roleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button size="default" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="drawerVisible">
        <template #header><h4>分配菜单与按钮的权限</h4></template>
        <template #default>
            <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" 
                default-expand-all :default-checked-keys="selectArr" :props="defaultProps"
            />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawerVisible = false">取消</el-button>
                <el-button type="primary" @click="drawerConfirm">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { MenuList, MenuResponseData, RoleData, RoleResponseData, reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, ref } from 'vue';

const searchContent = ref('')
const pagination = ref({ currentPage: 1, total: 1, pageSize : 5 })
const roleList = ref<RoleData[]>([]);
const dialogVisible = ref(false)
const drawerVisible = ref(false)
const menuArr = ref<MenuList>([])
const selectArr = ref<number[]>([])
const roleParams = ref<RoleData>({roleName: '',})
const dialogFormRef = ref()
const tree = ref<any>()

const defaultProps = {
    children: 'children',
    label: 'name',
}

const validateRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2)   callBack()
    else    callBack(new Error('职位名称至少两位'))
}

const rules = {
    roleName: [{required: true, trigger: blur, validator: validateRoleName}]
}

const currentChange = async (pager = 1) => {
    pagination.value.currentPage = pager;
    const result:RoleResponseData = await reqAllRoleList(pager, pagination.value.pageSize, searchContent.value)
    if(result.code === 200) {
        pagination.value.total = result.data.total
        roleList.value = result.data.records
    }
}

const setPermission = async (row: RoleData) => {
    drawerVisible.value = true
    Object.assign(roleParams.value, row)
    const result: MenuResponseData = await reqAllMenuList(roleParams.value.id as number)
    if (result.code === 200) {
        menuArr.value = result.data
        selectArr.value = filterSelectArr(menuArr.value, [])
    }
}

const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level === 4)    initArr.push(item.id)
        if (item.children && item.children.length > 0)  filterSelectArr(item.children, initArr)
    })
    return initArr
}

const save = async () => {
    await dialogFormRef.value.validate()
    const result: any = await reqAddOrUpdateRole(roleParams.value)
    if (result.code === 200) {
        ElMessage({ type: 'success', message: roleParams.value.id ? '更新成功' : '添加成功',})
        dialogVisible.value = false
        currentChange(roleParams.value.id ? pagination.value.currentPage : 1)
    }
}

const removeRole = async (id: number) => {
    let res: any = await reqRemoveRole(id)
    if (res.code === 200) {
        ElMessage({ type: 'success', message: '删除成功',})
        currentChange(roleList.value.length > 1 ? pagination.value.currentPage : pagination.value.currentPage - 1)
    }
}

const addRole = () => {
    dialogVisible.value = true
    Object.assign(roleParams.value, {roleName: '',id: 0,})
    nextTick(() => {
        dialogFormRef.value.clearValidate('roleName')
    })
}

const updateRole = (row:RoleData) => {
    dialogVisible.value = true
    Object.assign(roleParams.value, row)
    nextTick(() => {
        dialogFormRef.value.clearValidate('roleName')
    })
}

const drawerConfirm = async() => {
    const roleId = roleParams.value.id as number
    const arr = tree.value.getCheckedKeys()
    const arr1 = tree.value.getHalfCheckedKeys()
    const permissionId = arr.concat(arr1)
    const res: any = await reqSetPermission(roleId, permissionId)
    if (res.code === 200) {
        drawerVisible.value = false;
        ElMessage({ type: 'success', message: '分配权限成功',})
        currentChange()
    }
}

const search = () => {
    currentChange()
    searchContent.value = ''
}

const reset = () => {
    searchContent.value = '';
    currentChange();
}

onMounted(()=>{
    currentChange(1)
})
</script>

<style lang="scss" scoped>
.el-form-search {
    display: flex;
    justify-content: space-between;
}
</style>