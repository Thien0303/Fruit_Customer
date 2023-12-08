import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Search from '../pages/Search'
import FruitDetail from '../pages/FruitDetail'
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'
import NotFound from '../pages/NotFound'
import Layout from '../components/Layout'
import PrivateRouters from './PrivateRouters'
import ForgotPassword from "../pages/Login/ForgotPassword"
// import { NotFoundRoute } from './NotFoundRouters';
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
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: ForgotPassword,
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
        path: '/search',
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

//Scroll Top when clicked another page
function ScrollToTop() {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    return null
}

export const RouterComponents = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <ScrollToTop />
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component
                        let Layout
                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                    <Route exact path="/" element={<PrivateRouters />}>
                        {privateRouters.map((route, index) => {
                            const Page = route.component
                            let Layout
                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Route>
                    {/* <NotFoundRoute /> */}
                </Routes>
            </div>
        </BrowserRouter>
    )
}
