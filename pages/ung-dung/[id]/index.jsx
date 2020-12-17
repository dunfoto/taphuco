import "style/ung-dung.css"
import Link from "next/link"

const GiaiPhapComponent = React.memo(props => {
    return (
        <React.Fragment>
            <div className="container__ungdung" style={{ backgroundImage: `url(/page__trai-nghiem-khach-hang.png)`, backgroundSize: "cover" }}>
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">Vải cotton</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-lg p-4">
                <div className="row justify-content-center" style={{ marginLeft: 0, marginRight: 0, paddingTop: 90, paddingBottom: 90, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>

                    {/* <div className="col-md-3 col-xs-6 col-xs-12 my-4 py-2 d-flex align-items-center">
                    <div className="card card__category mr-auto ml-auto">
                        <div className="container__img">
                            <img src="/cotton.png" alt="Avatar" className="image" />
                            <Link href="/ung-dung/cotton">
                                <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                    <h4 className="textimage">Vải Cotton</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div> */}

                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category mr-auto ml-auto">
                            <div className="container__img">
                                <img src="/cotton.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/cotton/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Cotton</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/poly.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/poly/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Poly</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/bikini.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/bikini/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải đồ tắm, thể thao</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/vaiinhoa.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/vaiinhoa/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải In Hoa</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/jean.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/jean/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải Jeans</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/baby.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/baby/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải an toàn cho baby</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/vaitrang.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/vaitrang/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải trắng</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xs-12 my-4">
                        <div className="card card__category">
                            <div className="container__img">
                                <img src="/khac.png" alt="Avatar" className="image" />
                                <Link href="/ung-dung/khac/demo-detail">
                                    <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                        <h4 className="textimage">Vải khác</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default GiaiPhapComponent