import Sidebar from "./SideBar"
import { connect } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/router"

const AdminLayout = props => {
    const { toggled, onToggled, token } = props,
        router = useRouter()
    useEffect(() => {
        if (!token) {
            router.push("/admin/dang-nhap")
        } else {
            router.push(router.asPath)
        }
    }, [token])
    return (
        <React.Fragment>
            <div className={`d-flex ${toggled ? "" : "toggled"}`} id="wrapper">
                {!router.asPath.includes("/dang-nhap") && (
                    <Sidebar toggled={toggled} onToggled={onToggled} />
                )}
                <div className="w-100 p-4">{props.children}</div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token
})
export default connect(mapStateToProps)(AdminLayout)