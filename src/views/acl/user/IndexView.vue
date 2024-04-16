<template>
    <el-card style="height: 75px; margin-bottom: 10px;">
        <el-form :inline="true" class="form">
            <el-form-item label="用户名：">
                <el-input style="width: 220px;" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="success">批量删除</el-button>
        <el-table style="margin: 10px 0px;" border :data="userArr">
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
                    <el-button type="primary" icon="User" size="small">分配角色</el-button>
                    <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑</el-button>
                    <el-button type="primary" icon="Delete" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="pagination.total" :current-page="pagination.currentPage" :page-size="pagination.pageSize"
            layout="prev,pager,next,jumper,->,total" background small
            @current-change="currentChange"
        />
    </el-card>
    <el-drawer v-model="drawerVisable" direaction="rtl">    <!--right to left-->
        <template #header><h2>{{ drawerTitle }}</h2></template>
        <template #default>
            <el-form :rules="rules" :model="userParam" ref="formRef">
                <el-form-item label="用户名" label-width="70px" prop="username">
                    <el-input v-model="userParam.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" label-width="70px" prop="name">
                    <el-input v-model="userParam.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px" prop="password">
                    <el-input v-model="userParam.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submitInfomation">确定</el-button>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { User, UserResponseData, reqAddOrUpdateUser, reqUserInfo } from '@/api/acl/user';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref } from 'vue';

const pagination = ref({total: 0, currentPage: 1, pageSize: 5})
const userArr = ref<User[]>([])
const drawerVisable = ref(false)
const drawerTitle = ref('')
const userParam = reactive<User>({username: '', name: '', password: ''})
const formRef = ref()

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
    drawerVisable.value = true
    drawerTitle.value  = '添加用户'
    nextTick(()=>{  //  渲染结束了再清除，因为下面这条语句有可能会在点击按钮前执行，可能取不到数据
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('password');
    })
}

const updateUser = (row:User) => {
    drawerVisable.value = true, drawerTitle.value  = '修改用户'
    Object.assign(userParam, row)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}

const submitInfomation = async () => {
    formRef.value.validate();
    drawerVisable.value = false
    const result = await reqAddOrUpdateUser(userParam)
    if(result.code === 200)     {
        drawerVisable.value = false
        userParam.username = userParam.name = userParam.password = ''
        ElMessage({ type: 'success', message: userParam.id?'更新成功':'添加成功' });
        currentChange(1)
        window.location.reload();
    }   else    ElMessage({ type: 'success', message: userParam.id?'更新失败':'添加失败' });
}

const cancel = () => {
    drawerVisable.value = false
    userParam.username = userParam.name = userParam.password = ''
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