import "style/ung-dung.css"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { getStringInHtml } from "common/html"

const GiaiPhapComponent = React.memo(props => {
    const router = useRouter(),
        { category, powers } = props

    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(/detail-trai-nghiem-khach-hang.png)`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search card-search__khong-nghieng bg-light text-center" style={{ backgroundColor: "#FFF" }}>
                        <h2 className="textthongdiep__khong-nghieng">{category.title}</h2>
                    </div>
                </div>
            </div >
            <div className="p-4 container-lg">
                <div className="row">
                    {powers.map(power => (
                        <div key={power._id} className="col-md-6 col-sm-12 my-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-dark textthongdiep">{power.title}</h5>
                                </div>
                                <img src={power.img} className="card-img-top" height={250} style={{ maxWidth: 390, objectFit: 'cover' }} />
                                <div className="card-body pt-2">
                                    <p className="card-text text-nguon-luc my-2 py-2 px-0 text-wrap">{getStringInHtml(power.content).slice(0, 200)}</p>
                                    <Link href={`${router.asPath}/${encodeURI(power.title)}`}>
                                        <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment >
    )
})

GiaiPhapComponent.getInitialProps = async ctx => {
    try {
        const { query: { id } } = ctx,
            category = (await axios.get(`${process.env.API}/category/${encodeURI(id)}`)).data.data,
            powers = (await axios.get(`${process.env.API}/powers/all?category=${encodeURI(id)}`)).data.data
        return { category, powers }
    } catch (err) {
        return {}
    }
}
export default GiaiPhapComponent