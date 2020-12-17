import "style/ung-dung.css"
import Link from "next/link"
import { useRouter } from "next/router"

const GiaiPhapComponent = React.memo(props => {
    const router = useRouter()
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(/detail-trai-nghiem-khach-hang.png)`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">Trải nghiệm khách hàng</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="p-4 container-lg">
                <div className="row">
                    <div className="col-md-6 col-sm-12 my-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-giai-phap my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href={`${router.asPath}/asdasda`}>
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-giai-phap my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href={`${router.asPath}/asdasda`}>
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-giai-phap my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href={`${router.asPath}/asdasda`}>
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-giai-phap my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href={`${router.asPath}/asdasda`}>
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 my-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-dark textthongdiep">A seamless transition</h5>
                            </div>
                            <img src="/trainghiemkhachhang1.png" className="card-img-top" />
                            <div className="card-body pt-2">
                                <p className="card-text text-giai-phap my-2 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                <Link href={`${router.asPath}/asdasda`}>
                                    <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default GiaiPhapComponent