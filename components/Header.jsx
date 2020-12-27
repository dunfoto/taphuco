import "./Header.css"
import { useState, useEffect } from "react"
import Link from "next/link"
import { NavDropdown, Nav, Accordion } from "react-bootstrap"
import Sidebar from "react-sidebar"
import { useRouter } from 'next/router'

const Header = props => {
    const { router: { asPath, route }, categories } = props,
        { width } = useWindowSize(),
        [w, setW] = useState(null),
        [open, setOpen] = useState(false),
        router = useRouter()

    useEffect(() => {
        setW(width)
    }, [width])

    const onClickSidebarMobile = (url) => {
        setOpen(false)
        router.push(url)
    }

    if (route === "/_error") return <div></div>
    
    return (
        <React.Fragment>
            {w > 768 ? (
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent nav-bar-top fixed-top nav-bar-top">
                    <div className="container">
                        <Link href="/">
                            <img src="/assets/img/logo.svg" />
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <Link href="/ung-dung">
                                    <Nav.Link as="a" href="#" className={`text-white text-header ${asPath.includes("/ung-dung") ? "active-header" : ""}`} style={{ marginRight: 0, paddingRight: 0 }}>
                                        BỘ SẢN PHẨM
                                    </Nav.Link>
                                </Link>
                                <NavDropdown
                                    title={<span className={`text-white text-header ${asPath.includes("/ung-dung") ? "active-header" : ""}`}></span>}
                                    id={`${asPath.includes("/ung-dung") ? "basic-nav-dropdown-active" : "basic-nav-dropdown"}`}
                                    alignRight
                                >
                                    {categories.map(category => (
                                        <Link key={category._id} href={`/ung-dung/${encodeURI(category.title)}`}>
                                            <NavDropdown.Item as="p" className="text-color">
                                                {category.title}
                                            </NavDropdown.Item>
                                        </Link>
                                    ))}
                                </NavDropdown>
                                <Link href="/giai-phap">
                                    <Nav.Link as="a" href="#" className={`text-white text-header ${asPath.includes("/giai-phap") ? "active-header" : ""}`}>
                                        GIẢI PHÁP
                                    </Nav.Link>
                                </Link>
                                <Link href="/trai-nghiem-khach-hang">
                                    <Nav.Link as="a" href="#" className={`text-white text-header ${asPath.includes("/trai-nghiem-khach-hang") ? "active-header" : ""}`}>
                                        ĐIỀU KHÁCH HÀNG NÓI
                                    </Nav.Link>
                                </Link>
                                <Link href="/nguon-luc">
                                    <Nav.Link as="a" href="#" className={`text-white text-header ${asPath.includes("/nguon-luc") ? "active-header" : ""}`}>
                                        NGUỒN LỰC
                                    </Nav.Link>
                                </Link>
                                <Link href="/ve-chung-toi">
                                    <Nav.Link as="a" href="#" className={`text-white text-header ${asPath.includes("/ve-chung-toi") ? "active-header" : ""}`}>
                                        VỀ CHÚNG TÔI
                                    </Nav.Link>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav >
            ) : (
                    <Sidebar
                        sidebar={
                            <div className="side-bar">
                                <div className="icon-close-navbar w-100 text-right">
                                    <div onClick={() => setOpen(false)}>&times;</div>
                                </div>
                                <ul className="list-group">
                                    <li onClick={() => onClickSidebarMobile("/")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">TRANG CHỦ</li>
                                    <li className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">
                                        <Accordion>
                                            <Accordion.Toggle as={Nav.Item} variant="link" eventKey="0">
                                                BỘ SẢN PHẨM
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <ul className="list-group">
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/cotton")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải cotton</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/poly")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải poly</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/bikini")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải đồ tắm, đồ thể thao</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/inhoa")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải in hoa</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/jean")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải jeans</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/baby")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải an toàn cho baby</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/vaitrang")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải trắng</li>
                                                    <li onClick={() => onClickSidebarMobile("/ung-dung/vaikhac")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">Vải khác</li>
                                                </ul>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    </li>
                                    <li onClick={() => onClickSidebarMobile("/giai-phap")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">GIẢI PHÁP</li>
                                    <li onClick={() => onClickSidebarMobile("/trai-nghiem-khach-hang")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">ĐIỀU KHÁCH HÀNG NÓI</li>
                                    <li onClick={() => onClickSidebarMobile("/nguon-luc")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">NGUỒN LỰC</li>
                                    <li onClick={() => onClickSidebarMobile("/ve-chung-toi")} className="list-group-item list-group-item-action border-0 bg-transparent font-weight-bolder">VỀ CHÚNG TÔI</li>
                                </ul>
                            </div>
                        }
                        open={open}
                        pullRight={true}
                        onSetOpen={() => setOpen(true)}
                        styles={{ sidebar: { position: "fixed", background: "white", width: "100%", zIndex: 9000 } }}
                    >
                        <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top nav-bar-top">
                            <div className="container">
                                <Link href="/">
                                    <img src="/logo-mobile.svg" />
                                </Link>

                                <span href="#" onClick={() => setOpen(!open)}>
                                    <div className="icon-menu"></div>
                                    <div className="icon-menu"></div>
                                    {/* <Nav.Link as="a" href="#" className={`text-white ${asPath.includes("/giai-phap") ? "active-header" : ""}`}> */}
                                    {/* </Nav.Link> */}
                                </span>
                            </div>
                        </nav>
                    </Sidebar >
                )}
        </React.Fragment >
    )
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);
    return windowSize;
}
export default Header