import React, { useState } from "react";
import { useRouter } from 'next/router'
import Carousel from 'react-multi-carousel'
import Link from "next/link"
import 'react-multi-carousel/lib/styles.css'
import "../../style/ung-dung.css"

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1280 },
        items: 4,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 1280, min: 720 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 720, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
    }
};


const DetailUngDungComponent = React.memo(props => {
    const { query: { id } } = useRouter()

    return (
        <React.Fragment>
            <div className="container__ungdung bg-transparent">
                <div className="container">
                    <div className="card-search text-center">
                        <h2 className="textthongdiep">Bộ sản phẩm có độ lặp cao</h2>
                        <br className="my-4 py-4" />
                    </div>
                    <div className="col-sm-12 text-left">
                        asdhjfla;ksdjf;alksdjf;lkasdj'flknasd'fas
                        df;asdhf;lajsdhf;lkahsdf
                </div>
                </div>
            </div >
            <div className="container__ungdung-ref text-center">
                <h2 className="textthongdiep">Có thể bạn muốn xem</h2>
                <Carousel
                    responsive={responsive}
                    arrows={true}
                    ssr={false}
                    centerMode={true}
                >
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="card__giai-phap card" style={{ background: "transparent" }}>
                            <img src="/sanxuatondinh.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Sản xuất ổn định</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="card__giai-phap card" style={{ background: "transparent" }}>
                            <img src="/hieuquasanxuattang.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hiệu quả sản xuất tăng</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="card__giai-phap card" style={{ background: "transparent" }}>
                            <img src="/hoachatdungtudau.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất đúng từ đầu</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="card__giai-phap card" style={{ background: "transparent" }}>
                            <img src="/hoachatcodobenmaucao.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Hoá chất có độ bền màu cao</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="card__giai-phap card" style={{ background: "transparent" }}>
                            <img src="/hoachatdatchuan.png" className="card-img-top" />
                            <div className="card-body p-0 pb-3 pt-3">
                                <p className="card-text text-giai-phap">Hoá chất đạt OEKOTEX, BLUESIGN, REACH, …</p>
                            </div>
                        </div>
                    </Link>
                    <Link href="/giai-phap/detail-demo-id">
                        <div className="card__giai-phap card" style={{ background: "transparent" }}>
                            <img src="/giaonhandungtiendo.png" className="card-img-top" />
                            <div className="card-body pb-3 pt-3 text-center">
                                <p className="card-text text-giai-phap">Dịch vụ giao nhận đúng tiến độ</p>
                            </div>
                        </div>
                    </Link>
                </Carousel>
            </div>
        </React.Fragment>
    )
})

export default DetailUngDungComponent