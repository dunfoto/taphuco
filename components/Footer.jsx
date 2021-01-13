import React, { useState, useEffect } from "react"
import axios from "utils/axios"
import { useRouter } from "next/router"

const FooterComponent = React.memo(props => {
    const [config, setConfig] = useState(null),
        { route } = useRouter()
    useEffect(() => {
        loadConfig()
    }, [])

    const loadConfig = async () => {
        try {
            const res = await axios.get("/config")
            setConfig(res.data.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }
    if (route === "/404") return <div></div>

    return (
        <div className="lienhe">
            <div className="bg-light px-4 bg-white">
                <div className="mr-auto ml-auto py-4 row justify-content-end flex-row-reverse">
                    <div className="col-md-3 col-sm-12 d-flex justify-content-end">
                        <div className="container__image-footer">
                            <img src="/image-footer.png" className="image-footer" alt="footer" />
                            <div className="overlay">
                                <img src="/accessory_image_footer.svg" />
                                <img src="/accessory_image_footer.svg" />
                                <img src="/accessory_image_footer.svg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 row py-4 my-4 mr-auto ml-auto">
                        <div className="col-12">
                            <div className="form-group">
                                <input type="email" className="form-control w-100 input-lienhe" placeholder="TÊN CỦA BẠN" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="email" className="form-control w-100 input-lienhe" placeholder="SỐ ĐIỆN THOẠI" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="email" className="form-control w-100 input-lienhe" placeholder="EMAIL" />
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-contact">Gửi</button>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12"></div>
                </div>
                <div className="row mr-auto ml-auto d-flex align-items-center information pb-4 px-4 mb-4 m">
                    <div className="col-sm-3 text-left my-3">
                        <p className="lienheheader">{config?.footer?.openTitle}</p>
                        <p className="lienhecontent">{config?.footer?.fromTo}</p>
                        <p className="lienhecontent">{config?.footer?.workingTime}</p>
                    </div>
                    <div className="col-sm-6 text-center my-3">
                        <p className="lienheheader">{config?.footer?.addressTitle}:</p>
                        <p className="lienhecontent">{config?.footer?.address.split(",")[0]}</p>
                        <p className="lienhecontent">{config?.footer?.address.split(",")[1]}, {config?.footer?.address.split(",")[2]}</p>
                    </div>
                    <div className="col-sm-3 text-right my-3">
                        <p className="lienhecontent">SĐT: {config?.footer?.phone}</p>
                        <p className="lienhecontent">Email: {config?.footer?.email}</p>
                    </div>
                </div>
            </div>
            <div className="copyright w-100 text-center pt-3">
                <p className="lienheheader text-color" style={{ fontWeight: "normal" }}>Copyright © 2003–2020 Tan Phu Cuong Chemical.</p>
            </div>
        </div>
    )
})

export default FooterComponent