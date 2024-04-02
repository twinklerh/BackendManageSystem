import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  }
})

router.beforeEach((to, from ,next) => {
  console.log(from.path, to.path)
  next()
}) 

export default router
