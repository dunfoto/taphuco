import "../../style/ung-dung.css"
import React from "react";
import { useRouter } from 'next/router'
import { Carousel } from "react-bootstrap"
import SunEditor from 'suneditor-react'
import Link from "next/link"
import axios from 'axios'
import { getStringInHtml } from "common/html"

const DetailUngDungComponent = React.memo(props => {
    const { customerExperience, references } = props,
        { push } = useRouter()

    if (!customerExperience) return push('/404')
    return (
        <React.Fragment>
            <div className="container__ungdung bg-transparent" style={{ paddingTop: 100 }}>
                <div className="container">
                    <div className="card-search text-center">
                        <h2 className="textthongdiep__khong-nghieng">{customerExperience.title}</h2>
                        <br className="my-4 py-4" />
                    </div>
                    <div className="col-sm-12">
                        <img src={customerExperience.img} className="w-100 my-4" />
                    </div>
                    <div className="col-sm-12 text-left">
                        <div className="loadcontent">
                            <SunEditor
                                disable={true}
                                enableToolbar={false}
                                showToolbar={false}
                                setContents={customerExperience.content}
                                width="100%" height="100%"
                                setOptions={{ resizingBar: false, showPathLabel: false }}
                            />
                        </div>
                    </div>
                </div>
            </div >
            <div className="container__trainghiemkhachhang text-center">
                <div className="content row mr-auto ml-auto" style={{ backgroundColor: "transparent", backgroundImage: `url(/trainghiemkhachhang-border.png)`, backgroundSize: "100% 100%", minHeight: 500 }}>
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
                                    <p>{getStringInHtml(ref.content).slice(0, 200)}</p>
                                    <Link href={`/trai-nghiem-khach-hang/${encodeURI(ref.title)}`}>
                                        <button className="btn btn-transparent border rounded-0 pl-4 pr-4 my-4 btn-border text-color">Xem thêm</button>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

DetailUngDungComponent.getInitialProps = async ctx => {
    try {
        const { query: { id } } = ctx,
            customerExperience = (await axios.get(`${process.env.API}/customer-experience/${encodeURI(id)}`)).data.data,
            references = (await axios.get(`${process.env.API}/customer-experiences/reference?id=${customerExperience._id}`)).data.data
        return { customerExperience, references }
    } catch (err) {
        return {}
    }
}

export default DetailUngDungComponent