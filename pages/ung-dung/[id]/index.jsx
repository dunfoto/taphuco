import "style/ung-dung.css"
import Link from "next/link"
import { useRouter } from 'next/router'
import axiosNoAuth from "axios"

const GiaiPhapComponent = React.memo(props => {
    const { category, products } = props,
        { query: { id }, push } = useRouter()

    console.log(products)
    if (!category) return push('/404')
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(${category.img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h1 className="textthongdiep">{category.title}</h1>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12">
                                <p>{category.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-lg p-4">
                <div className="row justify-content-center" style={{ marginLeft: 0, marginRight: 0, paddingTop: 90, paddingBottom: 90, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
                    {products.length > 0 ? products.map(product => (
                        <div key={product._id} className="col-md-6 col-xs-12 my-4">
                            <div className="card card__category mr-auto ml-auto">
                                <div className="container__img">
                                    <img src={product.imgs[0]} alt={product._id} className="image" />
                                    <Link href={`/ung-dung/${encodeURI(id)}/${encodeURI(product.title)}`}>
                                        <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                            <h4 className="textimage">{product.title}</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
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