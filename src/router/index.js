import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LogIn from '../components/LogIn.vue'
import SignUp from '../components/SignUp.vue'
import LogOut from '../components/LogOut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: MainView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOut,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
