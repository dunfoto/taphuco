import React from "react";
import { useRouter } from 'next/router'
import Carousel from 'react-multi-carousel'
import Link from "next/link"
import 'react-multi-carousel/lib/styles.css'
import Slider from "react-slick";
import "../../../style/ung-dung.css"

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};


const DetailUngDungComponent = React.memo(props => {
    const { query: { id } } = useRouter()

    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: "url('/page__trai-nghiem-khach-hang.png')", backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">Bộ sản phẩm có độ lặp cao</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>Nhóm màu màu hoạt tính giúp tạo nên những mẻ nhuộm với độ lặp cao, đồ bền ánh sáng tốt cho các tông màu nhạt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex__ung-dung bg-light p-4" style={{ paddingTop: "60px !important", paddingBottom: "60px !important" }}>
                <div className="row w-100 d-sm-flex align-items-center">
                    <div className="col-sm-6 d-flex justify-content-end">
                        <img src="/cotton.png" alt="Avatar" className="image w-75" style={{ objectFit: "scale-down", width: "75% !important" }} />
                    </div>
                    <div className="col-sm-6 align-item-center">
                        <h2 className="title__ung-dung">Bộ HCCB và chất trợ đi kèm</h2>
                        <div className="row w-100">
                            <div className="col-sm-6">
                                <h3 className="sub-title__ung-dung">Tiền xử lý:</h3>
                                <ul style={{ paddingLeft: 15 }}>
                                    <li className="li__ung-dung">HCCB: Xút, Oxy (H2O2)</li>
                                    <li className="li__ung-dung">Bộ sản phẩm Nicca</li>
                                    <li className="li__ung-dung">Chất nấu tẩy</li>
                                    <li className="li__ung-dung">Càng hoá</li>
                                    <li className="li__ung-dung">Chất ổn định H2O2</li>
                                    <li className="li__ung-dung">Chất khử H2O2</li>
                                    <li className="li__ung-dung">Cắt lông môi trường acid</li>
                                    <li className="li__ung-dung">Cắt lông môi trường trung tính</li>
                                    <li className="li__ung-dung">Nhuộm</li>
                                    <li className="li__ung-dung">HCCB: Soda, Muối</li>
                                    <li className="li__ung-dung">Chất đều màu của Nicca</li>
                                </ul>
                            </div>
                            <div className="col-sm-6 d-flex align-items-stretch flex-column">
                                <div className="mb-auto h-50">
                                    <h3 className="sub-title__ung-dung">Sau nhuộm:</h3>
                                    <ul style={{ paddingLeft: 15 }}>
                                        <li className="li__ung-dung">Cầm màu</li>
                                        <li className="li__ung-dung">Bóc màu, sửa lỗi</li>
                                        <li className="li__ung-dung">Chất giặt</li>
                                    </ul>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="sub-title__ung-dung">Hoàn tất:</h3>
                                    <ul style={{ paddingLeft: 15 }}>
                                        <li className="li__ung-dung">Hồ acid béo & Silicone(marco, micro)</li>
                                        <li className="li__ung-dung">Chất chông tia UV</li>
                                        <li className="li__ung-dung">Chất kháng khuẩn</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container__ungdung-ref text-center">
                <h2 className="textthongdiep">Có thể bạn muốn xem</h2>
                <Carousel
                    responsive={responsive}
                    arrows={true}
                    ssr={true}
                    centerMode={true}
                >
                    <div className="card__ref">
                        <div className="container__img">
                            <img src="/poly.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/poly">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải Poly</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="card__ref">
                        <div className="container__img">
                            <img src="/bikini.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/bikini">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải đồ tắm, thể thao</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="card__ref">
                        <div className="container__img">
                            <img src="/jean.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/jean">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải Jeans</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="card__ref">
                        <div className="container__img">
                            <img src="/baby.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/baby">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải an toàn cho baby</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="card__ref">
                        <div className="container__img">
                            <img src="/baby.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/baby">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải an toàn cho baby</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="card__ref">
                        <div className="container__img">
                            <img src="/khac.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/khac">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải khác</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                </Carousel>
            </div>
        </React.Fragment>
    )
})

export default DetailUngDungComponent