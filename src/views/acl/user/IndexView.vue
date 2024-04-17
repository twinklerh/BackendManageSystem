<template>
    <el-card style="height: 75px; margin-bottom: 10px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input style="width: 220px;" placeholder="请输入用户名" v-model="searchContent" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="searchContent.length ? false : true">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="danger" size="default" :disabled="selectIdArr.length ? false : true" @click="deleteSelectUser">批量删除</el-button>
        <el-table ref="multipleTable" style="margin: 10px 0px;" border :data="userArr" @selection-change="selectChange">
            <!-- @selection-change会自动检查是勾选还是取消勾选 -->
            <el-table-column type="selection" />
            <el-table-column label="#" width="55px" type="index" />
            <el-table-column label="id" width="75px" align="center" prop="id" />
            <el-table-column label="用户名字" align="center" prop="name" />
            <el-table-column label="用户名称" align="center" prop="username" show-overflow-tooltip/>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip/>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip/>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip/>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button type="primary" icon="User" size="small" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定删除“${row.username}”吗？`" width="260px" @confirm="deleteUser(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize"
            layout="prev,pager,next,jumper,->,total" background small
            @current-change="currentChange"
        />
    </el-card>
    <el-drawer v-model="drawerAddOrUpdateVisible">
        <template #header><h4>{{ userParam.id ? '更新用户' : '添加用户' }}</h4></template>
        <template #default>
            <el-form :model="userParam" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名" v-model="userParam.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称" v-model="userParam.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParam.id">
                    <el-input placeholder="请您输入用户密码" v-model="userParam.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submitInfomation">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <el-drawer v-model="drawerSetRoleVisible">
        <template #header><h4>分配角色</h4></template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParam.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="userRole" @change="handleCheckedUsersChange">
                            <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{ role.roleName }}</el-checkbox>
                        </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawerSetRoleVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { AllRoleResponseData, RoleData, SetRoleData, User, UserResponseData, reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSelectUser, reqSetUserRole, reqUserInfo } from '@/api/acl/user';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

const pagination = ref({total: 0, currentPage: 1, pageSize: 5})
const userArr = ref<User[]>([])
const drawerAddOrUpdateVisible = ref(false)
const drawerSetRoleVisible = ref(false)
const drawerTitle = ref('')
const userParam = reactive<User>({username: '', name: '', password: ''})
const formRef = ref()
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const userRole = ref<RoleData[]>([])
const allRole = ref<RoleData[]>([])
const selectIdArr = ref<User[]>([])
const searchContent = ref('')
const multipleTable = ref()

const validatorUsername = (rule:any, username: string, callback:(obj?:any)=>void) => {
    if(username.trim().length >= 5)  callback()
    else    callback(new Error('用户名至少为五位'))
}

const validatorName = (rule:any, name: string, callback:(obj?:any)=>void) => {
    if(name.trim().length >= 5)  callback()
    else    callback(new Error('名字至少为五位'))
}

const validatorPassword = (rule:any, password:string, callback:(obj?:any)=>void) => {
    if(password.trim().length >= 6)  callback()
    else    callback(new Error('密码至少为六位'))
}

const rules = {
    username: [
        { required: true, trigger: 'blur', validator: validatorUsername }
    ],
    name: [
        { required: true, trigger: 'blur', validator: validatorName }
    ],
    password: [
        { required: true, trigger: 'blur', validator: validatorPassword }
    ],
}

const currentChange = async (pager = 1) => {
    pagination.value.currentPage = pager;
    const result:UserResponseData = await reqUserInfo(pagination.value.currentPage, pagination.value.pageSize, '')
    if(result.code===200)   {
        pagination.value.total = result.data.total;
        userArr.value = result.data.records
    }
}

const addUser = () => {
    drawerAddOrUpdateVisible.value = true
    drawerTitle.value  = '添加用户'
    nextTick(()=>{  //  渲染结束了再清除，因为下面这条语句有可能会在点击按钮前执行，可能取不到数据
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('password');
        Object.assign(userParam, {username: '', name: '', password: ''})
    })
}

const updateUser = (row:User) => {
    drawerAddOrUpdateVisible.value = true, drawerTitle.value  = '修改用户'
    Object.assign(userParam, row)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}

const submitInfomation = async () => {
    formRef.value.validate();
    drawerAddOrUpdateVisible.value = false
    const result = await reqAddOrUpdateUser(userParam)
    console.log(result)
    if(result.code === 200)     {
        drawerAddOrUpdateVisible.value = false
        userParam.username = userParam.name = userParam.password = ''
        ElMessage({ type: 'success', message: userParam.id?'更新成功':'添加成功' });
        currentChange()
        window.location.reload();
    }   else    ElMessage({ type: 'success', message: userParam.id?'更新失败':'添加失败' });
}

const confirmClick = async () => {
    let data: SetRoleData = {
        userId: userParam.id as number,
        roleIdList: userRole.value.map((item) => {
            return item.id as number
        }),
    }
    let res: any = await reqSetUserRole(data)
    if (res.code === 200) {
        ElMessage({type: 'success', message: '分配职务成功', })
        nextTick(()=>{
            drawerSetRoleVisible.value = false
            currentChange(pagination.value.currentPage)            
        })
    }
}

const cancel = () => {
    drawerAddOrUpdateVisible.value = false
    userParam.username = userParam.name = userParam.password = ''
}

const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : []
    isIndeterminate.value = false
}

const handleCheckedUsersChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

const setRole = async (row: User) => {
    drawerSetRoleVisible.value = true, drawerTitle.value = '分配角色'
    Object.assign(userParam, row)
    let res: AllRoleResponseData = await reqAllRole(userParam.id as number)
    if (res.code === 200) {
        allRole.value = res.data.allRolesList
        userRole.value = res.data.assignRoles
    }
}

const deleteUser = async (row:User) => {
    const userId = row.id as number
    let res: any = await reqRemoveUser(userId)
    if (res.code === 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        currentChange(userArr.value.length > 1 ? pagination.value.currentPage : pagination.value.currentPage - 1)
    }
}

const deleteSelectUser = async () => {
    const idList: any = selectIdArr.value.map((item) => {
        return item.id
    })
    let res: any = await reqSelectUser(idList)
    if (res.code === 200) {
        ElMessage({ type: 'success', message: '删除成功' })
        currentChange(userArr.value.length > 1 ? pagination.value.currentPage : pagination.value.currentPage - 1)
    }
}

const selectChange = (val: User[]) => { selectIdArr.value = val }

const reset = () => {
    searchContent.value = ''
    multipleTable.value.clearSelection();   //  取消勾选
}

onMounted(()=>{
    currentChange();
})
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>