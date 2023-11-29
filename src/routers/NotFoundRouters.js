import React from 'react'
import { Route } from 'react-router-dom';
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Search from '../pages/Search'
import FruitDetail from '../pages/FruitDetail'
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'
import NotFound from '../pages/NotFound'
import Layout from '../components/Layout'
export const publicRouters = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        layout: null,
    },
    {
        path: '/notfound',
        name: 'error',
        component: NotFound,
        layout: null,
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        layout: Layout,
    },
    {
        path: '/search/:keyword',
        name: 'search',
        component: Search,
        layout: Layout,
    },
    {
        path: '/detail/:id',
        name: 'fruit-detail',
        component: FruitDetail,
        layout: Layout,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        layout: Layout,
    },
]

export const privateRouters = [
    // {
    //     path: '/profile',
    //     name: 'user-profile',
    //     component: Profile,
    //     layout: Layout,
    // },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckOut,
        layout: Layout,
    },
]

export const NotFoundRoute = () => {
    const isUrlMatched = (url, routes) => {
        return routes.some(route => {
            const pattern = new RegExp(`^${route.path.replace(/:\w+/g, '\\w+')}$`);
            return pattern.test(url);
        });
    };

    const currentPath = window.location.pathname;
    const allRoutes = [...publicRouters, ...privateRouters];
    const isMatched = isUrlMatched(currentPath, allRoutes);

    return isMatched ? null : <Route path="*" element={<NotFound />} />;
};