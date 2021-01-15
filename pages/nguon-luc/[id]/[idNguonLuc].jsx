import 'react-multi-carousel/lib/styles.css'
import "../../../style/ung-dung.css"
import React from "react";
import { useRouter } from 'next/router'
import Carousel from 'react-multi-carousel'
import Link from "next/link"
import axios from "axios"
import SunEditor from 'suneditor-react'

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
    const { query: { id } } = useRouter(),
        { power, powers } = props
    return (
        <React.Fragment>
            <div className="container__ungdung bg-transparent">
                <div className="container">
                    <div className="card-search card-search__khong-nghieng text-center">
                        <h2 className="textthongdiep__khong-nghieng">{power.title}</h2>
                        <br className="my-4 py-4" />
                    </div>
                    <div className="col-sm-12">
                        <img src={power.img} className="w-100 my-4" />
                    </div>
                    <div className="col-sm-12 text-left">
                        <div className="loadcontent">
                            <SunEditor
                                disable={true}
                                enableToolbar={false}
                                showToolbar={false}
                                setContents={power.content}
                                width="100%" height="100%"
                                setOptions={{ resizingBar: false, showPathLabel: false }}
                            />
                        </div>
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
                    {powers.map(power => (
                        <div key={power._id} className="card__ref">
                            <div className="container__img">
                                <img src={power.img} alt="Avatar" className="image" />
                                <Link href={`/nguon-luc/${encodeURI(id)}/${encodeURI(power.title)}`}>
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">{power.title}</h4>
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
        const { query: { id, idNguonLuc } } = ctx,
            power = (await axios.get(`${process.env.API}/power/${encodeURI(id)}/${encodeURI(idNguonLuc)}`)).data.data,
            powers = (await axios.get(`${process.env.API}/power-ref/${encodeURI(id)}`)).data.data
        return { power, powers }
    } catch (err) {
        return {}
    }
}

export default DetailUngDungComponent