import 'react-multi-carousel/lib/styles.css'
import "../../../style/ung-dung.css"
import React from "react"
import { useRouter } from 'next/router'
import Carousel from 'react-multi-carousel'
import Link from "next/link"
import axios from "axios"

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
    const { query: { id } } = useRouter(),
        { product, products } = props

    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: "url('/page__trai-nghiem-khach-hang.png')", backgroundSize: 'cover' }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">{product.showTitle ? product.showTitle : "Ứng dụng có độ lặp cao"}</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>{product.showDescription ? product.showDescription : "Nhóm màu màu hoạt tính giúp tạo nên những mẻ nhuộm với độ lặp cao, đồ bền ánh sáng tốt cho các tông màu nhạt"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex__ung-dung bg-light" style={{ paddingTop: 60, paddingBottom: 60 }}>
                <div className="container-xl">
                    <div className="row w-100 d-sm-flex align-items-center">
                        <div className="col-sm-6 d-flex justify-content-end">
                            <img src={product.imgs[product.imgs.length - 1]} alt="Avatar" className="image w-75" style={{ objectFit: "cover", width: "75% !important" }} />
                        </div>
                        <div className="col-sm-6 align-item-center">
                            <h2 className="title__ung-dung" style={{ marginBottom: 0 }}>{product.title}</h2>
                            <p className="text-color" style={{ marginBottom: 30 }}>{product.description}</p>
                            <div className="row w-100">
                                <div className="col-sm-6">
                                    <h3 className="sub-title__ung-dung">Tiền xử lý:</h3>
                                    <ul style={{ paddingLeft: 15 }}>
                                        {product.prepare.map((temp, index) => (
                                            <li key={index} className="li__ung-dung">{temp}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-sm-6 d-flex align-items-stretch flex-column">
                                    <div className="mb-auto h-50">
                                        <h3 className="sub-title__ung-dung">Sau nhuộm:</h3>
                                        <ul style={{ paddingLeft: 15 }}>
                                            {product.afterDye.map((temp, index) => (
                                                <li key={index} className="li__ung-dung">{temp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="sub-title__ung-dung">Hoàn tất:</h3>
                                        <ul style={{ paddingLeft: 15 }}>
                                            {product.complete.map((temp, index) => (
                                                <li key={index} className="li__ung-dung">{temp}</li>
                                            ))}
                                        </ul>
                                    </div>
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
                    {products.map(product => (
                        <div key={product._id} className="card__ref">
                            <div className="container__img">
                                <img src={product.imgs[0]} alt="Avatar" className="image" />
                                <Link href={`/ung-dung/${encodeURI(id)}/${encodeURI(product.title)}`}>
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Poly</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </React.Fragment>
    )
})

DetailUngDungComponent.getInitialProps = async ctx => {
    try {
        const { query: { id, idProduct } } = ctx,
            product = (await axios.get(`${process.env.API}/product/${encodeURI(id)}/${encodeURI(idProduct)}`)).data.data,
            products = (await axios.get(`${process.env.API}/product-ref/${encodeURI(id)}`)).data.data
        return { product, products }
    } catch (err) {
        return {}
    }
}

export default DetailUngDungComponent