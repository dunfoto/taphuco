import "style/ung-dung.css"
import Link from "next/link"
import { Carousel } from 'react-bootstrap'

const GiaiPhapComponent = React.memo(props => {
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(/page__trai-nghiem-khach-hang.png)`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">Trải nghiệm khách hàng</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-lg p-4">
                <div className="row">
                    <div className="col-md-6 col-sm-12 my-4 spacing-trainghiem">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep text-center">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-trai-nghiem my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4 spacing-trainghiem">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep text-center">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-trai-nghiem my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4 spacing-trainghiem">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep text-center">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-trai-nghiem my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4 spacing-trainghiem">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep text-center">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-trai-nghiem my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 text-center" style={{ backgroundColor: "#FFECF3" }}>
                <h2 className="textthongdiep text-color pt-4 mt-4">Những khách hàng của chúng tôi</h2>
                <div className="row container-lg mt-4 pt-4 mr-auto ml-auto">
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container__trainghiemkhachhang text-center">
                <div className="content row mr-auto ml-auto" style={{ backgroundColor: "transparent", backgroundImage: `url(/trainghiemkhachhang-border.png)`, backgroundSize: "100% 100%" }}>
                    <h2 className="textthongdiep col-12">Trải nghiệm khách hàng</h2>
                    <div className="col-12">
                        <Carousel
                            controls={false}
                            interval={3000}
                            pause="hover"
                            slide={false}
                            style={{ position: 'relative' }}
                        >
                            <Carousel.Item>
                                <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <p><small className="text-color">1. John Doe, Product Manager of ABC company</small></p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <p><small className="text-color">2. John Doe, Product Manager of ABC company</small></p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <p><small className="text-color">3. John Doe, Product Manager of ABC company</small></p>
                                <Link href="/trai-nghiem-khach-hang/a;klsjdhf">
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default GiaiPhapComponent