import Vue from 'vue';
import Router from 'vue-router';

import { auth } from '@/firebase/init';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                requiresGuest: true
            },
            component: () => import('./views/Home')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Dashboard')
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                requiresGuest: true
            },
            component: () => import('./views/auth/Login')
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                requiresGuest: true
            },
            component: () => import('./views/auth/Register')
        },
        // 404 Page & Redirect
        { path: '/404', component: () => import('./views/error/NotFound') },
        { path: '*', redirect: '/404' }
    ]
});

// Check for authenticated user (Route Guard)
router.beforeEach((to, from, next) => {
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        // Check user authentication state
        let user = auth.currentUser;
        if (user) {
            // User is logged in
            next();
        } else {
            // User is not logged in
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

// Check for non-authenticated 'guest' user (Route Guard)
router.beforeEach((to, from, next) => {
    if (to.matched.some(rec => rec.meta.requiresGuest)) {
        // Check user authentication state
        let user = auth.currentUser;
        if (!user) {
            // User is logged out
            next();
        } else {
            // User logged in
            next({ name: 'home' });
        }
    } else {
        next();
    }
});

export default router;
