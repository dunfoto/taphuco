import "style/ung-dung.css"
import Link from "next/link"
import { useRouter } from 'next/router'
import axiosNoAuth from "axios"
import { useWindowSize } from "common/screen"

const GiaiPhapComponent = React.memo(props => {
    const { category, products } = props,
        { query: { id }, push } = useRouter(),
        { width } = useWindowSize()

    if (!category) return push('/404')
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(${category.img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h1 className="textthongdiep">{category.title}</h1>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="text-color">{category.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-lg p-4">
                <div className="row justify-content-center" style={{ marginLeft: 0, marginRight: 0, paddingTop: 90, paddingBottom: 90, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
                    {products.length > 0 ? products.map(product => (
                        <div key={product._id} className="col-md-6 col-sm-12 col-xs-12 mr-auto ml-auto mb-4">
                            <div className="card card__category mr-auto ml-auto">
                                <div className="container__img" style={{ width: 330, height: 490 }}>
                                    <img src={product.imgs[0]} alt={product._id} className="image" style={{ width: 330, height: 490 }} />
                                    {width > 768 && (
                                        <Link href={`/ung-dung/${encodeURI(id)}/${encodeURI(product.title)}`}>
                                            <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                                <h4 className="textimage">{product.title}</h4>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {width <= 768 && (
                                <h4 className="text-center text-color mt-2" style={{ width: 330 }}>{product.title}</h4>
                            )}
                        </div>
                    )) : (
                            <div>Chưa có sản phẩm!</div>
                        )}
                </div>
            </div>
        </React.Fragment>
    )
})

GiaiPhapComponent.getInitialProps = async ctx => {
    const { query: { id } } = ctx
    try {
        const res = await axiosNoAuth.get(`${process.env.API}/category/${encodeURI(id)}`),
            products = (await axiosNoAuth.get(`${process.env.API}/product-ref/${encodeURI(id)}`)).data.data
        return { category: res.data.data, products }
    } catch (err) {
        return { category: null }
    }
}
export default GiaiPhapComponent