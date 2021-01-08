import "style/ung-dung.css"
import Link from "next/link"
import axios from "axios"
import { getStringInHtml } from "common/html"
import { useRouter } from "next/router"

const GiaiPhapComponent = React.memo(props => {
    const { categories, powers, config: { power } } = props,
        router = useRouter()
    console.log(power)
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(${power?.img ? power?.img : 'detail-trai-nghiem-khach-hang.png'})`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">{power?.title ? power?.title : "Nguồn lực"}</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>{power?.description ? power?.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="p-4 mr-auto ml-auto">
                <div className="container mr-auto ml-auto">
                    {powers.map((p, index) => (
                        <div key={p._id} className="row my-4 py-4 spacing-y-nguonluc">
                            {index % 2 === 0 ? (
                                <React.Fragment>
                                    <div className="col-sm-6 pr-4 d-flex align-items-center">
                                        <img src={p.img} className="card-img-top" height={250} style={{ maxWidth: 390, objectFit: 'scale-down' }} />
                                    </div>
                                    <div className="col-sm-6 pl-4 align-items-center" style={{ marginBottom: "auto", marginTop: "auto" }}>
                                        <h5 className="card-title text-dark textnguonluc mb-4 pb-4 text-color">{p.title}</h5>
                                        <p className="card-text text-nguon-luc my-2 py-2 px-0 text-wrap" style={{ overflowWrap: "break-word" }}>{getStringInHtml(p.content).slice(0, 300)}</p>
                                        <Link href={`/nguon-luc/${encodeURI(p.categories[0].title)}/${encodeURI(p.title)}`}>
                                            <button className="btn btn-transparent border rounded-0 mt-2 pl-4 btn-border pr-4 text-color">Xem thêm</button>
                                        </Link>
                                    </div>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        <div className="col-sm-6 pl-4 align-items-center" style={{ marginBottom: "auto", marginTop: "auto" }}>
                                            <h5 className="card-title text-dark textnguonluc mb-4 pb-4 text-color">{p.title}</h5>
                                            <p className="card-text text-nguon-luc my-2 py-2 px-0 text-wrap" style={{ overflowWrap: "break-word" }}>{getStringInHtml(p.content).slice(0, 100)}</p>
                                            <Link href={`/nguon-luc/${encodeURI(p.categories[0].title)}/${encodeURI(p.title)}`}>
                                                <button className="btn btn-transparent border rounded-0 mt-2 pl-4 btn-border pr-4 text-color">Xem thêm</button>
                                            </Link>
                                        </div>
                                        <div className="col-sm-6 pr-4 d-flex align-items-center">
                                            <img src={p.img} className="card-img-top" height={250} style={{ maxWidth: 390, objectFit: 'scale-down' }} />
                                        </div>
                                    </React.Fragment>
                                )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center" style={{ backgroundColor: "#FFECF3", padding: "100px 20px" }}>
                <h2 className="textthongdiep">Categories</h2>
                <div className="row">
                    {categories.map(category => (
                        <div key={category._id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-2" style={{ cursor: "pointer" }}>
                            <Link href={`/nguon-luc/${encodeURI(category.title)}`}>
                                <div className="card mx-4" style={{ background: "transparent" }}>
                                    <img src={category.img} className="mr-auto ml-auto" width={250} height={250} alt="..." style={{ borderRadius: "50%", objectFit: "cover" }} />
                                    <div className="card-body">
                                        <p className="card-text font-weight-bolder text-color my-4">{category.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
})

GiaiPhapComponent.getInitialProps = async ctx => {
    try {
        const categories = (await axios.get(`${process.env.API}/categories/all`)).data.data,
            powers = (await axios.get(`${process.env.API}/powers/random`)).data.data,
            config = (await axios.get(`${process.env.API}/config`)).data.data
        return { categories, powers, config }
    } catch (err) {
        return {}
    }
}

export default GiaiPhapComponent