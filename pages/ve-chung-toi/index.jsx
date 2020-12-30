import "react-step-progress-bar/styles.css"
import "style/ve-chung-toi.scss"
import React, { useState } from "react"
import axios from "axios"
import { ProgressBar, Step } from 'react-step-progress-bar'
import { useWindowSize } from "common/screen"

const VeChungToiComponent = React.memo(props => {
    const [current, setCurrent] = useState(0),
        { config: { aboutUs }, clients, histories, boardDirectors } = props,
        { width } = useWindowSize()

    const nextCurrent = i => {
        if (i >= histories.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(Number(i + 1))
        }
    }

    const prevCurrent = i => {
        if (i <= 0) {
            setCurrent(Number(histories.length - 1))
        } else {
            setCurrent(Number(i - 1))
        }
    }

    return (
        <React.Fragment>
            <div className="container__ve-chung-toi">
                <div className="container">
                    <div className="card-search text-center" style={{ paddingBottom: 20 }}>
                        <h2 className="textthongdiep" style={{ marginBottom: 10 }}>{aboutUs.title}</h2>
                        <br />
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                                <p style={{ fontSize: 18 }}>{aboutUs.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <img src="/intro_ve-chung-toi.png" className="img-introduce" alt="introduce-about us" />
            <div className="container__lich-su-cong-ty pb-4">
                <div className="container">
                    <div className="card-search text-center">
                        <h2 className="textthongdiep">Lịch sử công ty</h2>
                    </div>
                    <div className="row">
                        <div className="col-12 py-4 my-4">
                            {width > 425 ? (
                                <ProgressBar
                                    percent={100}
                                >
                                    {histories.map(history => (
                                        <Step key={history._id} transition="scale">
                                            {({ accomplished, index }) => (
                                                <div
                                                    className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                                >
                                                    <div className={`text-title ${current === index && 'active-text'}`} style={{ position: "absolute", top: "-30px", right: -2, width: "fit-content", justifyContent: "center", alignItems: "center" }}>{history.year}</div>
                                                    <i onClick={() => setCurrent(index)} className={`fas fa-circle text-color ${current === index ? 'fa-3x' : 'fa-2x'}`}></i>
                                                </div>
                                            )}
                                        </Step>
                                    ))}
                                    <Step transition="scale">
                                        {({ accomplished }) => (
                                            <div
                                                className={`transitionStep ${accomplished ? "accomplished" : null}`}
                                            ></div>
                                        )}
                                    </Step>
                                </ProgressBar>
                            ) : (
                                    <div className="row">
                                        <div className="col-2">
                                            <i className="fas fa-caret-left fa-3x" onClick={() => prevCurrent(current)}></i>
                                        </div>
                                        <div className="col-8 text-center">
                                            <div className="RSPBprogressBar" style={{ marginTop: 20 }}>
                                                <div
                                                    className={`transitionStep`}
                                                >
                                                </div>
                                                <div
                                                    className={`transitionStep`}
                                                >
                                                    <div className={`text-title active-text`} style={{ position: "absolute", top: "-30px", right: -5, width: "fit-content", justifyContent: "center", alignItems: "center" }}>{histories[current].year}</div>
                                                    <i className={`fas fa-circle text-color fa-3x`}></i>
                                                </div>
                                                <div
                                                    className={`transitionStep`}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-right">
                                            <i className="fas fa-caret-right fa-3x" onClick={() => nextCurrent(current)}></i>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="w-100" style={{ paddingBottom: 60 }}>
                        <div className="bg-light" style={{ boxShadow: "0px 4px 64px rgba(0, 0, 0, 0.25)" }}>
                            <div className="row p-4">
                                <div className="col-sm-6">
                                    <img src={histories[current].img} className="w-100" />
                                </div>
                                <div className="col-sm-6 p-3 d-flex align-items-center">
                                    <div className="m-4 text-color" style={{ fontSize: 18 }}>
                                        {histories[current].content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#FFECF3" }}>
                <div className="container row mr-auto ml-auto p-4">
                    <div className="col-sm-6 border-right p-4 mt-4 mb-4">
                        <h2 className="textthongdiep text-color text-center">Lĩnh vực kinh doanh</h2>
                        <p className="content text-color" style={{ fontSize: 18 }}>
                            {aboutUs.businessArea}
                        </p>
                    </div>
                    <div className="col-sm-6 border-left p-4 mt-4 mb-4">
                        <h2 className="textthongdiep text-color text-center">Mục tiêu</h2>
                        <p className="content text-color" style={{ fontSize: 18 }}>
                            {aboutUs.target}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-100 mt-4 mb-4 p-4 text-center">
                <h2 className="textthongdiep text-color pt-4 mt-4">Sơ đồ tổ chức</h2>
                <div className="row mt-4 pt-4">
                    {boardDirectors.map(boardDirector => (
                        <div key={boardDirector._id} className="col-md-3 col-sm-4 col-xs-12 p-4 my-4">
                            <div className="card m-md-0 m-sm-4">
                                <img src={boardDirector.img} className="card-img-top img-vechungtoi mr-auto ml-auto" height="auto" alt={boardDirector._id} style={{ borderRadius: "50%" }} />
                                <div className="card-body mt-4">
                                    <h5 className="card-title text-color">{boardDirector.name}</h5>
                                    <p className="card-text text-color">{boardDirector.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-4 text-center" style={{ backgroundColor: "#FFECF3" }}>
                <h2 className="textthongdiep text-color pt-4 mt-4">Đối tác của chúng tôi</h2>
                <div className="row container-lg my-4 py-4 mr-auto ml-auto">
                    {clients.map(client => (
                        <div key={client._id} className="col-md-2 col-sm-4 col-xs-6">
                            <div className="card my-2">
                                <img src={client.img} className="card-img-top" alt={client._id} style={{ borderRadius: "0px !important" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment >
    )
})

VeChungToiComponent.getInitialProps = async ctx => {
    try {
        const config = (await axios.get(`${process.env.API}/config`)).data.data,
            clients = (await axios.get(`${process.env.API}/clients`)).data.data,
            histories = (await axios.get(`${process.env.API}/histories/all`)).data.data,
            boardDirectors = (await axios.get(`${process.env.API}/board-directors/all`)).data.data
        return { config, clients, histories, boardDirectors }
    } catch (err) {
        return {}
    }
}
export default VeChungToiComponent