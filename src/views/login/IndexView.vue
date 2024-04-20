<template>
    <div class="container">
        <el-row>
            <el-col :span="13" :xs="0"></el-col>
            <el-col :span="11" :xs="24">
                <el-form class="login-card" :model="loginForm" :rules="rules" ref="loginFormRef">
                    <div class="login-form">
                        <h2>后台管理系统</h2>
                        <el-form-item prop="username">
                            <el-input :prefix-icon="User" v-model="loginForm.username" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password/>
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loginLoading" type="primary" style="width: 100%;" @click="login">登录</el-button>
                        </el-form-item>                        
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getWhenTime } from '@/utils/time';
import { debounce } from 'lodash';
const router = useRouter();
const userStore = useUserStore();
const loginForm = reactive({ username: '', password: '' });
const loginLoading = ref(false)
const loginFormRef = ref();

const loginLogical = debounce(async() => {
    await loginFormRef.value.validate();   //  验证表单是否满足规则
    try {
        const result = await userStore.login(loginForm);
        if(result==='success')   ElNotification({type: 'success', message: '欢迎回来', title: `Hi, ${getWhenTime()}好`});
        else                     ElNotification({type: 'error', message: result });
        router.push('/')
    } catch(error)  {
        // router.push('/login')
    } finally {
        loginLoading.value = false;
    }
}, 1000)

const login = async () => {
    loginLoading.value = true;
    await loginLogical();
}

const validatePassword = debounce((rule:unknown, value:string, callback:(param?:Error)=>void)=>{
    if(value.length>=6 && value.length<=10)     callback();
    else                                        callback(new Error('账号长度在6~10位之间'))
}, 900)

const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }, //  blur失去焦点时触发
        { required: true, min: 5, max: 16, message: '用户名不能为空', trigger: 'blur' },
        // { trigger: 'change', validator: validateUsername }  //  自定义校验规则
    ],
    password: [
        { trigger: 'change', validator: validatePassword },
    ],
}

</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    background-position: center;    /*  不管怎么放大页面，图片永远显示最中间的内容 */
    overflow: hidden;
}
.login-card {
    position: relative;
    width: 80%;
    top: 30vh;
}
.login-form {
    padding: 20px 60px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    /* box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);  水平偏移量 垂直偏移量 模糊半径 阴影颜色 */
    backdrop-filter: blur(5px);
    -weblit-backdrop-filter: blur(5px); /*  兼容某些浏览器 */
}
</style>