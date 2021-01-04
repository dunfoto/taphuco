import '../style/index.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

import { useStore } from "react-redux"
import PersistGate from "components/Persistor"
import { wrapper } from '../redux/store'

import NextNprogress from 'nextjs-progressbar'
import HomeLayout from "components/HomeLayout"
import AdminLayout from "components/AdminLayout"
import Head from "next/head"
import Title from "config/title"
import React, { useState, useEffect } from 'react'
import Header from "components/Header"
import Footer from "components/Footer"
import ScrollTop from "react-scroll-to-top"
import axios from 'axios'

const App = ({ Component, pageProps, router, categories }) => {
    const store = useStore((state) => state),
        [sidebar, setSideBar] = useState(true)

    useEffect(() => {
        let reallyDocumentTitle
        document.addEventListener('visibilitychange', event => {
            if (event.target.hidden || event.target.webkitHidden) {
                reallyDocumentTitle = document.title
                document.title = 'TaPhuCoLtd'
            } else {
                document.title = reallyDocumentTitle
            }
        }, false)
    })

    const checkLayout = () => {
        if (router.pathname.startsWith("/admin/")) {
            return true
        }
        return false
    }

    const checkHeader = () => {
        if (router.pathname.startsWith("/admin/") || router.route == "/_error") {
            return false
        }
        return true
    }

    const checkTitle = () => {
        let title = "TaPhuCo.Ltd"
        Object.keys(Title).forEach(item => {
            if (router.route.includes(item)) {
                title = Title[item]
            }
        })
        return title
    }

    return (
        <PersistGate
            dispatch={store.dispatch}
            loading={
                <div style={{ width: "100%", height: "100vh", textAlign: "center", justifyContent: "center" }}>...</div>
            }
        >
            <NextNprogress
                color="#29D"
                height="3"
            />
            <Head>
                <title>{checkTitle()}</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                    integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
                    crossOrigin="anonymous" />
            </Head>
            {checkHeader() && (
                <Header categories={categories} router={router} />
            )}
            <ScrollTop
                smooth
            />
            {checkLayout() ? (
                <AdminLayout toggled={sidebar} onToggled={setSideBar}>
                    <Component {...pageProps} />
                </AdminLayout>
            ) : (
                    <HomeLayout>
                        <Component {...pageProps} />
                        {router.route !== '/_error' && (<Footer />)}
                    </HomeLayout>
                )}
        </PersistGate>
    )
}

App.getInitialProps = async ({ Component, ctx }) => {
    ctx.store.dispatch({ type: "APP", payload: "was set in _app" })
    const res = await axios.get(`${process.env.API}/categories/all`)
    return {
        pageProps: {
            ...(Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}),
            appProp: ctx.pathname
        },
        categories: res.data.data
    }
}

export default wrapper.withRedux(App)