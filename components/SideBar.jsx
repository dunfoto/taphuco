import "../style/sidebar.css";
import Link from "next/link"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { logout } from "redux/reducers/auth"
import { useRouter } from "next/router"

const Sidebar = React.memo(props => {
    const { logout } = props,
        router = useRouter()
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Tân Phú Cường</div>
            <div className="list-group list-group-flush">
                <Link href="/admin/trang-chu">
                    <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/trang-chu") ? "active-admin" : ""}`}>Trang chủ</a>
                </Link>
                <Link href="/admin/bo-san-pham">
                    <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/bo-san-pham") ? "active-admin" : ""}`}>Bộ sản phẩm</a>
                </Link>
                <a href="#" className={`list-group-item list-group-item-action bg-light`}>Giải pháp</a>
                <a href="#" className={`list-group-item list-group-item-action bg-light`}>Điều khách hàng nói</a>
                <a href="#" className={`list-group-item list-group-item-action bg-light`}>Nguồn lực</a>
                <a href="#" className={`list-group-item list-group-item-action bg-light`}>Về chúng tôi</a>
                <a href="#" className={`list-group-item list-group-item-action bg-light`} onClick={() => logout()}>Thoát ra</a>
            </div>
        </div>
    );
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch)
export default connect(null, mapDispatchToProps)(Sidebar)