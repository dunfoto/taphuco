import React, { useState } from "react"
import "style/ve-chung-toi.scss"
import { scroller } from "react-scroll"

const VeChungToiComponent = React.memo(props => {
    const [index, setIndex] = useState(1)

    const previousIndex = () => {
        if (index > 1) {
            setIndex(index - 1)
        }
    }
    const nextIndex = () => {
        if (index < 6) {
            setIndex(index + 1)
        }
    }

    const choiceIndex = i => {
        setIndex(i)
        scroller.scrollTo("progress-step active", {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart",
        })
    }

    return (
        <React.Fragment>
            <div className="container__ve-chung-toi">
                <div className="container">
                    <div className="card-search text-center" style={{ paddingBottom: 20 }}>
                        <h2 className="textthongdiep" style={{ marginBottom: 10 }}>Về chúng tôi</h2>
                        <br />
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                                <p style={{ fontSize: 18 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <img src="/intro_ve-chung-toi.png" className="img-introduce" alt="introduce-about us" />
            <div className="container__lich-su-cong-ty pb-4">
                <div className="container">
                    <div className="card-search text-center">
                        <h2 className="textthongdiep">Lịch sử công ty</h2>
                    </div>
                    <div className="row">
                        <div className="col-1 d-flex justify-content-center align-items-center">
                            <button className="btn btn-transparent" onClick={() => previousIndex()}><i className="fas fa-caret-left text-color" style={{ fontSize: 45 }}></i></button>
                        </div>
                        <div className="col-10">
                            <ul className="progress-tracker">
                                <li className="progress-step" >
                                    <p className={`text-title ${index === 1 ? "active-text" : ""}`}>1978</p>
                                    <div className={`progress-marker ${index === 1 ? "active" : ""}`} onClick={() => choiceIndex(1)}></div>
                                </li>
                                <li className="progress-step" >
                                    <p className={`text-title ${index === 2 ? "active-text" : ""}`}>2002</p>
                                    <div className={`progress-marker ${index === 2 ? "active" : ""}`} onClick={() => choiceIndex(2)}></div>
                                </li>
                                <li className="progress-step" >
                                    <p className={`text-title ${index === 3 ? "active-text" : ""}`}>2008</p>
                                    <div className={`progress-marker ${index === 3 ? "active" : ""}`} onClick={() => choiceIndex(3)}></div>
                                </li>
                                <li className="progress-step" >
                                    <p className={`text-title ${index === 4 ? "active-text" : ""}`}>2010</p>
                                    <div className={`progress-marker ${index === 4 ? "active" : ""}`} onClick={() => choiceIndex(4)}></div>
                                </li>
                                <li className="progress-step" >
                                    <p className={`text-title ${index === 5 ? "active-text" : ""}`}>2015</p>
                                    <div className={`progress-marker ${index === 5 ? "active" : ""}`} onClick={() => choiceIndex(5)}></div>
                                </li>
                                <li className="progress-step" >
                                    <p className={`text-title ${index === 6 ? "active-text" : ""}`}>2020</p>
                                    <div className={`progress-marker ${index === 6 ? "active" : ""}`} onClick={() => choiceIndex(6)}></div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1 d-flex justify-content-center align-items-center">
                            <button className="btn btn-transparent" onClick={() => nextIndex()}><i className="fas fa-caret-right text-color" style={{ fontSize: 45 }}></i></button>
                        </div>
                    </div>
                    <div className="w-100" style={{ paddingBottom: 60 }}>
                        <div className="bg-light" style={{ boxShadow: "0px 4px 64px rgba(0, 0, 0, 0.25)" }}>
                            <div className="row p-4">
                                <div className="col-sm-6">
                                    <img src="/lichsu-2002.png" className="w-100" />
                                </div>
                                <div className="col-sm-6 p-3 d-flex align-items-center">
                                    <div className="m-4 text-color" style={{ fontSize: 18 }}>
                                        Chính thức thành lập Công ty TNHH Hoá chất Tân Phú Cường với đội ngũ nhân sự khoảng 100 người, hệ thống kho bãi 14000m2, hệ thống xe tải vận chuyển đến hơn 22 chiếc và trang bị hệ thống phòng lab hiện đại.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#FFECF3" }}>
                <div className="container row mr-auto ml-auto p-4">
                    <div className="col-sm-6 border-right p-4 mt-4 mb-4">
                        <h2 className="textthongdiep text-color text-center">Lĩnh vực kinh doanh</h2>
                        <p className="content text-color" style={{ fontSize: 18 }}>
                            Nhập khẩu, phân phối hoá chất, thuốc nhuộm cho ngành dệt, giấy, sơn nước và mực in đầu tư kinh doanh địa ốc
                        </p>
                    </div>
                    <div className="col-sm-6 border-left p-4 mt-4 mb-4">
                        <h2 className="textthongdiep text-color text-center">Mục tiêu</h2>
                        <p className="content text-color" style={{ fontSize: 18 }}>
                            Thoả mãn nhu cầu khách hàng với những sản phẩm chất lượng tốt nhất. Mở rộng, phát triển thị trường tiêu thụ trong nước và thế giới.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-100 mt-4 mb-4 p-4 text-center">
                <h2 className="textthongdiep text-color pt-4 mt-4">Sơ đồ tổ chức</h2>
                <div className="row mt-4 pt-4">
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/vuthilan.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Bà Vũ Thị Lan</h5>
                                <p className="card-text text-color">Cựu chủ tịch - Người sáng lập</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvanbinh.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn Bình</h5>
                                <p className="card-text text-color">Tổng giám đốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenthithuy.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Bà Nguyễn Thị Thuỷ</h5>
                                <p className="card-text text-color">Giám đốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvannam.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn Nam</h5>
                                <p className="card-text text-color">Phó giám đốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvanchung.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn Chung</h5>
                                <p className="card-text text-color">Phó giám đốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvansinh.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn Sinh</h5>
                                <p className="card-text text-color">Phó giám đốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenthihongnhung.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Bà Nguyễn Thị Hồng Nhung</h5>
                                <p className="card-text text-color">Lĩnh vực địa ốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvanphong.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn Phong</h5>
                                <p className="card-text text-color">Lĩnh vực địa ốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvanphong.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn Phong</h5>
                                <p className="card-text text-color">Lĩnh vực địa ốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvanphong.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn A</h5>
                                <p className="card-text text-color">Phó giám đốc</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                        <div className="card m-md-0 m-sm-4">
                            <img src="/nguyenvanphong.png" className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt="..." />
                            <div className="card-body mt-4">
                                <h5 className="card-title text-color">Ông Nguyễn Văn B</h5>
                                <p className="card-text text-color">Phó giám đốc</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 text-center" style={{ backgroundColor: "#FFECF3" }}>
                <h2 className="textthongdiep text-color pt-4 mt-4">Đối tác của chúng tôi</h2>
                <div className="row container-lg my-4 py-4 mr-auto ml-auto">
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac2.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac1.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac3.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac4.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac5.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac6.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac7.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac8.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac9.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac10.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-6">
                        <div className="card my-2">
                            <img src="/doitac11.png" className="card-img-top" alt="..." style={{ borderRadius: "0px !important" }} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default VeChungToiComponent