import "../style/sidebar.css";
import Link from "next/link"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { logout } from "redux/reducers/auth"
import { useRouter } from "next/router"
import { Collapse } from "react-collapse"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

const Sidebar = React.memo(props => {
    const { logout, token } = props,
        router = useRouter(),
        { asPath } = router,
        [collapse, setCollapse] = useState([]),
        { roles, email } = token ? jwt_decode(token) : { roles: [] }


    useEffect(() => {
        if (asPath.includes('/admin/ung-dung')) {
            setCollapse([...collapse, 'boSanPham'])
        } else if (asPath.includes('/admin/trai-nghiem-khach-hang')) {
            setCollapse([...collapse, 'traiNghiemKhachHang'])
        } else if (asPath.includes('/admin/ve-chung-toi')) {
            setCollapse([...collapse, 'veChungToi'])
        } else if (asPath.includes('/admin/cau-hinh')) {
            setCollapse([...collapse, 'cauHinh'])
        } else if (asPath.includes('/admin/quan-tri')) {
            setCollapse([...collapse, 'quanTri'])
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
                    <a href="#" onClick={() => onClickCollapse('cauHinh')} className={`list-group-item list-group-item-action pr-2 bg-light ${router.asPath.includes("/admin/cau-hinh") ? "active-admin" : ""}`}>
                        <div className="d-flex">
                            <div className="w-75">Cấu hình</div>
                            <div className="w-25 text-right">
                                {collapse.includes("cauHinh") ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                            </div>
                        </div>
                    </a>
                    <Collapse isOpened={collapse.includes('cauHinh')}>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/trang-chu">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/trang-chu") ? "active-admin" : ""}`}>Trang chủ</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/ung-dung">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/ung-dung") ? "active-admin" : ""}`}>Ứng dụng</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/giai-phap">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/giai-phap") ? "active-admin" : ""}`}>Giải pháp</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/trai-nghiem-khach-hang">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/trai-nghiem-khach-hang") ? "active-admin" : ""}`}>Trải nghiệm khách hàng</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/nguon-luc">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/nguon-luc") ? "active-admin" : ""}`}>Nguồn lực</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/ve-chung-toi">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/ve-chung-toi") ? "active-admin" : ""}`}>Về chúng tôi</a>
                            </Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/admin/cau-hinh/thong-tin">
                                <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/cau-hinh/thong-tin") ? "active-admin" : ""}`}>Thông tin</a>
                            </Link>
                        </div>
                    </Collapse>

                    {Boolean(roles.find(role => role.code.includes("BANNER:GET_LIST"))) && (
                        <Link href="/admin/trang-chu">
                            <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/trang-chu") ? "active-admin" : ""}`}>Trang chủ</a>
                        </Link>
                    )}


                    <a href="#" onClick={() => onClickCollapse('boSanPham')} className={`list-group-item list-group-item-action pr-2 bg-light ${router.asPath.includes("/admin/ung-dung") ? "active-admin" : ""}`}>
                        <div className="d-flex">
                            <div className="w-75">Ứng dụng</div>
                            <div className="w-25 text-right">
                                {collapse.includes("boSanPham") ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                            </div>
                        </div>
                    </a>
                    <Collapse isOpened={collapse.includes('boSanPham')}>
                        {Boolean(roles.find(role => role.code.includes("CATEGORY:GET_LIST"))) && (
                            <div className="pl-4">
                                <Link href="/admin/ung-dung/danh-muc">
                                    <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/ung-dung/danh-muc") ? "active-admin" : ""}`}>Danh mục</a>
                                </Link>
                            </div>
                        )}
                        {Boolean(roles.find(role => role.code.includes("PRODUCT:GET_LIST"))) && (
                            <div className="pl-4">
                                <Link href="/admin/ung-dung/san-pham">
                                    <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/ung-dung/san-pham") ? "active-admin" : ""}`}>Sản phẩm</a>
                                </Link>
                            </div>
                        )}
                    </Collapse>
                    {Boolean(roles.find(role => role.code.includes("SOLUTION:GET_LIST"))) && (
                        <Link href="/admin/giai-phap">
                            <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/giai-phap") ? "active-admin" : ""}`}>Giải pháp</a>
                        </Link>
                    )}


                    <a href="#" onClick={() => onClickCollapse('traiNghiemKhachHang')} className={`list-group-item list-group-item-action pr-2 bg-light ${router.asPath.includes("/admin/trai-nghiem-khach-hang") ? "active-admin" : ""}`}>
                        <div className="d-flex">
                            <div className="w-75">Trải nghiệm khách hàng</div>
                            <div className="w-25 text-right">
                                {collapse.includes("traiNghiemKhachHang") ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                            </div>
                        </div>
                    </a>
                    <Collapse isOpened={collapse.includes('traiNghiemKhachHang')}>
                        {Boolean(roles.find(role => role.code.includes("CUSTOMER_EXPERIENCE:GET_LIST"))) && (
                            <div className="pl-4">
                                <Link href="/admin/trai-nghiem-khach-hang/dieu-khach-hang-noi">
                                    <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/trai-nghiem-khach-hang/dieu-khach-hang-noi") ? "active-admin" : ""}`}>Điều khách hàng nói</a>
                                </Link>
                            </div>
                        )}
                        {Boolean(roles.find(role => role.code.includes("CLIENT:CREATE"))) && (
                            <div className="pl-4">
                                <Link href="/admin/trai-nghiem-khach-hang/cac-khach-hang">
                                    <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/trai-nghiem-khach-hang/cac-khach-hang") ? "active-admin" : ""}`}>Các khách hàng</a>
                                </Link>
                            </div>
                        )}
                    </Collapse>


                    {Boolean(roles.find(role => role.code.includes("POWER:GET_LIST"))) && (
                        <Link href="/admin/nguon-luc">
                            <a href="#" className={`list-group-item list-group-item-action bg-light ${router.asPath.includes("/admin/nguon-luc") ? "active-admin" : ""}`}>Nguồn lực</a>
                        </Link>
                    )}


                    <a href="#" onClick={() => onClickCollapse('veChungToi')} className={`list-group-item list-group-item-action pr-2 bg-light ${router.asPath.includes("/admin/ve-chung-toi") ? "active-admin" : ""}`}>
                        <div className="d-flex">
                            <div className="w-75">Về chúng tôi</div>
                            <div className="w-25 text-right">
                                {collapse.includes("veChungToi") ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                            </div>
                        </div>
                    </a>
                    <Collapse isOpened={collapse.includes('veChungToi')}>
                        {Boolean(roles.find(role => role.code.includes("HISTORY:GET_LIST"))) && (
                            <div className="pl-4">
                                <Link href="/admin/ve-chung-toi/lich-su">
                                    <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/ve-chung-toi/lich-su") ? "active-admin" : ""}`}>Lịch sử công ty</a>
                                </Link>
                            </div>
                        )}
                        {Boolean(roles.find(role => role.code.includes("BOARD_DIRECTOR:GET_LIST"))) && (
                            <div className="pl-4">
                                <Link href="/admin/ve-chung-toi/so-do-to-chuc">
                                    <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/ve-chung-toi/so-do-to-chuc") ? "active-admin" : ""}`}>Sơ đồ tổ chức</a>
                                </Link>
                            </div>
                        )}
                    </Collapse>


                    {email === "admin@gmail.com" && (
                        <React.Fragment>
                            <a href="#" onClick={() => onClickCollapse('quanTri')} className={`list-group-item list-group-item-action pr-2 bg-light ${router.asPath.includes("/admin/quan-tri") ? "active-admin" : ""}`}>
                                <div className="d-flex">
                                    <div className="w-75">Quản trị</div>
                                    <div className="w-25 text-right">
                                        {collapse.includes("quanTri") ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                                    </div>
                                </div>
                            </a>
                            <Collapse isOpened={collapse.includes('quanTri')}>
                                <div className="pl-4">
                                    <Link href="/admin/quan-tri/quan-tri-vien">
                                        <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/quan-tri/quan-tri-vien") ? "active-admin" : ""}`}>Quản trị viên</a>
                                    </Link>
                                </div>
                                <div className="pl-4">
                                    <Link href="/admin/quan-tri/quyen-quan-tri">
                                        <a href="#" className={`list-group-item list-group-item-action bg-light border-0 ${router.asPath.includes("/admin/quan-tri/quyen-quan-tri") ? "active-admin" : ""}`}>Quyền quản trị</a>
                                    </Link>
                                </div>
                            </Collapse>
                        </React.Fragment>
                    )}


                    <a href="#" className={`list-group-item list-group-item-action bg-light`} onClick={() => logout()}>Thoát ra</a>
                </div>
            </div>
        </React.Fragment>
    );
})

const mapStateToProps = state => ({
    token: state.auth.token
})
const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)