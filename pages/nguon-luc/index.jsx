import "style/ung-dung.css"
import Link from "next/link"

const GiaiPhapComponent = React.memo(props => {
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(/detail-trai-nghiem-khach-hang.png)`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">Nguồn lực</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="p-4 mr-auto ml-auto">
                <div className="container mr-auto ml-auto">
                    <div className="row my-4 py-4 spacing-y-nguonluc">
                        <div className="col-sm-6 pr-4 d-flex align-items-center">
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                        </div>
                        <div className="col-sm-6 pl-4 align-items-center" style={{ marginBottom: "auto", marginTop: "auto" }}>
                            <h5 className="card-title text-dark textnguonluc mb-4 pb-4 text-color">A seamless transition</h5>
                            <p className="card-text text-nguon-luc my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <Link href="/nguon-luc/poly/a;klsjdhf">
                                <button className="btn btn-transparent border rounded-0 mt-2 pl-4 btn-border pr-4 text-color">Xem thêm</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row my-4 py-4 spacing-y-nguonluc">
                        <div className="col-sm-6 pr-4 align-items-center" style={{ marginBottom: "auto", marginTop: "auto" }}>
                            <h5 className="card-title text-dark textnguonluc mb-4 pb-4 text-color">A seamless transition</h5>
                            <p className="card-text text-nguon-luc my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <Link href="/nguon-luc/cotton/a;klsjdhf">
                                <button className="btn btn-transparent border rounded-0 mt-2 pl-4 btn-border pr-4 text-color">Xem thêm</button>
                            </Link>
                        </div>
                        <div className="col-sm-6 pl-4 d-flex align-items-center">
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center" style={{ backgroundColor: "#FFECF3", padding: "100px 20px" }}>
                <h2 className="textthongdiep">Categories</h2>
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories1.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories2.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories3.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories4.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories5.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories6.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12 p-2">
                        <Link href="/nguon-luc/cotton">
                            <div className="card mx-4" style={{ background: "transparent" }}>
                                <img src="/categories7.png" className="card-img-top img-nguonluc mr-auto ml-auto" width="100%" height="100%" alt="..." />
                                <div className="card-body">
                                    <p className="card-text font-weight-bolder text-color my-4">Lorem Ipsum</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default GiaiPhapComponent