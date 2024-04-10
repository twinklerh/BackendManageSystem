export const routes = [
    {
        path: '/',
        redirect: '/home/screen',
        meta: { hidden: true},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/IndexView.vue'),
        meta: { title: '登录', hidden: true }
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { title: 'notfound', hidden: true},
    },
    {
        path: '/:catchAll(.*)',
        name: 'redirect',
        redirect: '/notfound/',
        meta: { title: 'notfound', hidden: true},
    },
    {
        path: '/home',
        name: 'home',
        component: ()=>import("@/views/layout/IndexView.vue"),
        redirect: '/home/screen',
        meta: { title: '', icon: 'HomeFilled', hidden: true },
        children: [
            {
                path: 'acl',
                name: 'acl',
                meta: { title: '权限管理', icon: 'Key', hidden: false },
                redirect: '/home/acl/user',
                children: [
                    {
                        path: 'user',
                        name: 'user',
                        component: ()=>import('@/views/acl/user/IndexView.vue'),
                        meta: { title: '用户管理', icon: 'User', hidden: false },
                    },
                    {
                        path: 'role',
                        name: 'role',
                        component: ()=>import('@/views/acl/role/IndexView.vue'),
                        meta: { title: '角色管理', icon: 'UserFilled', hidden: false },
                    },
                    {
                        path: 'menu',
                        name: 'menu',
                        component: ()=>import('@/views/acl/menu/IndexView.vue'),
                        meta: { title: '菜单管理', icon: 'Menu', hidden: false },
                    }
                ]
            },
            {
                path: 'product',
                name: 'product',
                meta: { title: '商品管理', icon: 'Goods', hidden: false },
                redirect: '/home/product/attr',
                children: [
                    {
                        path: 'attr',
                        name: 'attr',
                        component: ()=>import('@/views/product/attr/IndexView.vue'),
                        meta: { title: '商品属性管理', icon: 'Tools', hidden: false },
                    },
                    {
                        path: 'brand',
                        name: 'brand',
                        component: ()=>import('@/views/product/brand/IndexView.vue'),
                        meta: { title: '品牌管理', icon: 'Umbrella', hidden: false },
                    },
                    {
                        path: 'sku',
                        name: 'sku',
                        component: ()=>import('@/views/product/sku/IndexView.vue'),
                        meta: { title: 'sku管理', icon: 'Coin', hidden: false },
                    },
                    {
                        path: 'spu',
                        name: 'spu',
                        component: ()=>import('@/views/product/spu/IndexView.vue'),
                        meta: { title: 'spu管理', icon: 'SoldOut', hidden: false },
                    }
                ]
            },
            {
                path: 'screen',
                name: 'screen',
                component: ()=>import('@/views/screen/ScreenView.vue'),
                meta: { title: '数据大屏', icon: 'Monitor', hidden: false },
            },
        ]
    },
];
