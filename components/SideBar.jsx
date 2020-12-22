import "../style/sidebar.css";
import Link from "next/link"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { logout } from "redux/reducers/auth"
import { useRouter } from "next/router"
import { Collapse } from "react-collapse"
import { useEffect, useState } from "react";

const Sidebar = React.memo(props => {
    const { logout } = props,
        router = useRouter(),
        { asPath } = router,
        [collapse, setCollapse] = useState([])


    useEffect(() => {
        if (asPath.includes('/admin/bo-san-pham')) {
            const newCollapse = [...collapse, 'boSanPham']
            setCollapse(newCollapse)
        } else {
            const newCollapse = collapse.filter(temp => temp !== 'boSanPham')
            setCollapse(newCollapse)
        }
    }, [asPath])

    const onClickCollapse = tab => {
        if (collapse.includes(tab)) {
            setCollapse(collapse.filter(temp => temp !== tab))
        } else {
            setCollapse([...collapse, tab])
        }
    }
    return (
        <React.Fragment>
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Tân Phú Cường</div>
                <div className="list-group list-group-flush">
                    <Link href="/admin/trang-chu">
                        <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/trang-chu") ? "active-admin" : ""}`}>Trang chủ</a>
                    </Link>
                    {/* <Link href="/admin/bo-san-pham"> */}
                    <a href="#" onClick={() => onClickCollapse('boSanPham')} className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/bo-san-pham") ? "active-admin" : ""}`}>
                        <div className="d-flex">
                            <div className="w-75">Bộ sản phẩm</div>
                            <div className="w-25 text-right">
                                {collapse.includes("boSanPham") ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                            </div>
                        </div>
                    </a>
                    {/* </Link> */}
                    <Collapse isOpened={collapse.includes('boSanPham')}>
                        <div className="pl-4">
                            <Link href="/admin/bo-san-pham/danh-muc">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/bo-san-pham/danh-muc") ? "active-admin" : ""}`}>Danh mục</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/bo-san-pham/san-pham">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/bo-san-pham/san-pham") ? "active-admin" : ""}`}>Sản phẩm</a>
                            </Link>
                        </div>
                    </Collapse>
                    <Link href="/admin/giai-phap">
                        <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/giai-phap") ? "active-admin" : ""}`}>Giải pháp</a>
                    </Link>
                    <Link href="/admin/trai-nghiem-khach-hang">
                        <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/trai-nghiem-khach-hang") ? "active-admin" : ""}`}>Điều khách hàng nói</a>
                    </Link>
                    <Link href="/admin/nguon-luc">
                        <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/nguon-luc") ? "active-admin" : ""}`}>Nguồn lực</a>
                    </Link>
                    <a href="#" className={`list-group-item list-group-item-action bg-light`}>Về chúng tôi</a>
                    <a href="#" className={`list-group-item list-group-item-action bg-light`} onClick={() => logout()}>Thoát ra</a>
                </div>
            </div>
        </React.Fragment>
    );
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch)
export default connect(null, mapDispatchToProps)(Sidebar)