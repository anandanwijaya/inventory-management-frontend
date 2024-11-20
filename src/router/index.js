import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import { useAuthStore } from '@/store/authStore'

let routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { hideHeader: true, hideSidebar: true },
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login,
            },
            {
                path: 'register',
                name: 'register',
                component: Register,
            },
        ],
    },
    {
        path: '/admin/:component?',
        name: 'admin',
        component: AdminView,
        props: true,
        meta: { requiresAuth: true, role: 'ADMIN' },
    },
    {
        path: '/user/:component?',
        name: 'user',
        component: UserView,
        props: true,
        meta: { requiresAuth: true, role: 'USER' },
    },
]

let router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    let authStore = useAuthStore()
    let isAuthenticated = !!authStore.token
    let userRole = authStore.role

    if (to.meta.requiresAuth) {
        if (isAuthenticated) {
            if (userRole === to.meta.role || to.meta.role === undefined) {
                next()
            } else {
                next({ name: 'home' })
            }
        } else {
            next({ name: 'home' })
        }
    } else {
        next()
    }
})

export default router