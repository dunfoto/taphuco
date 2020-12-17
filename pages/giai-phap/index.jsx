import "style/ung-dung.css"
import Link from "next/link"

const GiaiPhapComponent = React.memo(props => {
    return (
        <React.Fragment>
            <div className="container__ungdung">
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">Giải pháp</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex__ung-dung p-4">
                <div className="row my-4 container-md mr-auto ml-auto">
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/sanxuatondinh.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Sản xuất ổn định</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/hieuquasanxuattang.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hiệu quả sản xuất tăng</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/hoachatdungtudau.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất đúng từ đầu</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/hoachatcodobenmaucao.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất có độ bền màu cao</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/hoachatdatchuan.png" className="card-img-top" width="100%" />
                            <div className="card-body p-0 pb-3 pt-3">
                                <p className="card-text text-giai-phap">Hoá chất đạt OEKOTEX, BLUESIGN, REACH, …</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/giaonhandungtiendo.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Dịch vụ giao nhận đúng tiến độ</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/hoachatchonhieuloaquytrinh.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất cho nhiều loại quy trình</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="col-md-3 col-sm-4 col-xs-6 card my-4 py-2" style={{ cursor: "pointer" }}>
                            <img src="/hoachatchoxuongmoi.png" className="card-img-top" width="100%" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất cho xưởng mới</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
})

export default GiaiPhapComponent