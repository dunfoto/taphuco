import "style/ung-dung.css"
import Link from "next/link"
import { Carousel } from 'react-bootstrap'
import { getStringInHtml } from "common/html"
import axios from "axios"
import { useRouter } from "next/router"

const GiaiPhapComponent = React.memo(props => {
    const { clients, customerExperiences, references, config } = props,
        { push } = useRouter()
    if (!clients || !customerExperiences || !references) return push('/404')

    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(${config.customerExperience?.img ? config.customerExperience?.img : '/page__trai-nghiem-khach-hang.png'})`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">{config.customerExperience?.title ? config.customerExperience?.title : "Trải nghiệm khách hàng"}</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p className="text-color" >{config.customerExperience?.description ? config.customerExperience.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-lg p-4">
                <div className="row">
                    {customerExperiences.map(ce => (
                        <div key={ce._id} className="col-md-6 col-sm-12 my-4 spacing-trainghiem">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-dark textthongdiep text-center">{ce.title}</h5>
                                </div>
                                <img src={ce.img} className="card-img-top" height={250} style={{ maxWidth: 390, objectFit: "cover" }} />
                                <div className="card-body pt-2">
                                    <p className="card-text text-trai-nghiem my-2 py-2">{getStringInHtml(ce.content).slice(0, 100)}</p>
                                    <Link href={`/trai-nghiem-khach-hang/${encodeURI(ce.title)}`}>
                                        <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 btn-border text-color">Xem thêm</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center" style={{ backgroundColor: "#FFECF3", paddingBottom: 60, paddingTop: 60 }}>
                <h2 className="textthongdiep text-color pt-4 mt-4">Những khách hàng của chúng tôi</h2>
                <div className="row container-lg mt-4 pt-4 mr-auto ml-auto">
                    {clients.map(client => (
                        <div key={client._id} className="col-md-2 col-sm-4 col-xs-6">
                            <div className="card my-2">
                                <img src={client.img} className="card-img-top" alt={client._id} style={{ borderRadius: 0 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container__trainghiemkhachhang text-center" style={{ marginTop: 0 }}>
                <div className="content row mr-auto ml-auto" style={{ backgroundColor: "transparent", backgroundImage: `url(/trainghiemkhachhang-border.png)`, backgroundSize: "100% 100%" }}>
                    <h2 className="textthongdiep col-12">Trải nghiệm khách hàng</h2>
                    <div className="col-12">
                        <Carousel
                            controls={false}
                            interval={3000}
                            pause="hover"
                            slide={false}
                            style={{ position: 'relative' }}
                        >
                            {references.map(ref => (
                                <Carousel.Item key={ref._id}>
                                    <p className="text-color">{getStringInHtml(ref.content).slice(0, 300)}</p>
                                    <Link href={`/trai-nghiem-khach-hang/${encodeURI(ref.title)}`}>
                                        <button className="btn btn-transparent border rounded-0 mt-2 pl-4 pr-4 my-4 btn-border text-color">Xem thêm</button>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
})

GiaiPhapComponent.getInitialProps = async ctx => {
    try {
        const clients = (await axios.get(`${process.env.API}/clients`)).data.data,
            customerExperiences = (await axios.get(`${process.env.API}/customer-experiences?limit=4`)).data.data,
            references = (await axios.get(`${process.env.API}/customer-experiences/reference`)).data.data,
            config = (await axios.get(`${process.env.API}/config`)).data.data
        return { clients, customerExperiences, references, config }
    } catch (err) {
        return {}
    }
}

export default GiaiPhapComponent