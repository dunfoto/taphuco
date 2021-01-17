import Sidebar from "./SideBar"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getConfig } from "redux/reducers/config"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { Waiter } from "react-wait"

const AdminLayout = props => {
    const { toggled, onToggled, token, getConfig } = props,
        router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push("/admin/dang-nhap")
        } else {
            if (!router.asPath.includes('/admin/dang-nhap')) {
                router.push(router.asPath)
            } else {
                router.push('/admin/cau-hinh/trang-chu')
            }
        }
    }, [token])

    useEffect(() => {
        getConfig()
    }, [])

    return (
        <Waiter>
            <div className={`d-flex ${toggled ? "" : "toggled"}`} id="wrapper" style={{ fontSize: 14 }}>
                {!(router.asPath.includes("/dang-nhap") || router.asPath.includes('/404')) || router.asPath === '/admin' ? (
                    <Sidebar toggled={toggled} onToggled={onToggled} />
                ) : <div></div>}
                <div className="w-100 p-4" style={{ height: "100vh", overflowY: "auto" }}>{props.children}</div>
            </div>
        </Waiter>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)