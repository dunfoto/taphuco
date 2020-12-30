import "../../style/giai-phap.scss"
import Link from "next/link"
import axios from "axios"

const GiaiPhapComponent = React.memo(props => {
    const { solutions } = props
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ paddingTop: 100 }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h1 className="textthongdiep">Giải pháp</h1>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="flex__ung-dung p-4">
                <div className="row my-4 container-md mr-auto ml-auto">
                    {solutions.map(solution => (
                        <div key={solution._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 my-4 pb-4" style={{ marginBottom: 70 }}>
                            <Link href={`/giai-phap/${encodeURI(solution.title)}`}>
                                <div className="card card__category">
                                    <div className="container__home mr-auto ml-auto">
                                        <img src={solution.img} className="image" />
                                        <div className="card-body pb-4 pt-0 text-center">
                                            <p className="card-text text-giai-phap">{solution.showTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment >
    )
})

GiaiPhapComponent.getInitialProps = async ctx => {
    try {
        const solutions = (await axios.get(`${process.env.API}/solutions/all`)).data.data
        return { solutions }
    } catch (err) {
        return {}
    }
}
export default GiaiPhapComponent