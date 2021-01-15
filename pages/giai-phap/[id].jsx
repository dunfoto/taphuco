import 'react-multi-carousel/lib/styles.css'
import "../../style/ung-dung.css"
import '../../style/giai-phap.scss'
import React from "react";
import Carousel from 'react-multi-carousel'
import Link from "next/link"
import SunEditor from 'suneditor-react'
import { useRouter } from "next/router"
import axios from "axios"

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
    const { solution, references } = props,
        { push } = useRouter()

    if (!solution || !references) return push('/404')
    return (
        <React.Fragment>
            <div className="container__ungdung bg-transparent" style={{ paddingTop: 100 }}>
                <div className="container">
                    <div className="card-search text-center">
                        <h2 className="textthongdiep__khong-nghieng">{solution.title}</h2>
                        <br className="my-4 py-4" />
                    </div>
                    <div className="col-sm-12 text-left">
                        <div className="loadcontent">
                            <SunEditor
                                // className="demo"
                                // showToolbar={false}
                                // disable={true}
                                // height="fit-content"
                                // setContents={solution.content}
                                disable={true}
                                enableToolbar={false}
                                showToolbar={false}
                                setContents={solution.content}
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
                    {references.map(ref => (
                        <Link key={ref._id} href={`/giai-phap/${encodeURI(ref.title)}`}>
                            <div className="card__giai-phap card" style={{ background: "transparent" }}>
                                <img src={ref.img} className="card-img-top" />
                                <div className="card-body pb-3 pt-3 text-center">
                                    <p className="card-text text-giai-phap text-giai-phap-new">{ref.showTitle}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </React.Fragment>
    )
})

DetailUngDungComponent.getInitialProps = async ctx => {
    try {
        const { query: { id } } = ctx,
            solution = (await axios.get(`${process.env.API}/solution/${encodeURI(id)}`)).data.data,
            references = (await axios.get(`${process.env.API}/solutions/reference?id=${solution._id}`)).data.data
        return { solution, references }
    } catch (err) {
        return {}
    }

}

export default DetailUngDungComponent