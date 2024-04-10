import router from '@/router';
import NProgress from 'nprogress'
import "nprogress/nprogress.css"
import pinia from '@/store';
import { useUserStore } from '@/store/user';

const userStore = useUserStore(pinia);  //  这里要传参，否则router组件拿不到pinia中的数据
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
    NProgress.start()   //  路由进度条
    const token = userStore.token;
    const username = userStore.username;
    document.title = '后台管理系统 - ' + to.meta.title;
    if (token) {
        if (to.name === 'login') next({ path: '/' })   //  如果去的是登录页，放行
        else {  //  如果去的不是登录页
            if (username) next();
            else {
                try{
                    await userStore.userInfo();
                    next();
                } catch(error)   {  //  token过期，或者用户手动修改本地token
                    await userStore.userLogOut();
                    next({path: '/login'})
                }
            }
        }
    }   else    {
        if(to.name === 'login')     next();
        else                        next({name: 'login'})
    }
})
 // eslint-disable-next-line
router.afterEach((to, from) => {
    NProgress.done()
})
