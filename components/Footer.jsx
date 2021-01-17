import React, { useState, useEffect } from "react"
import axios from "utils/axios"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import SweetAlert from "react-bootstrap-sweetalert"

const FooterComponent = React.memo(props => {
    const [config, setConfig] = useState(null),
        [socials, setSocials] = useState([]),
        { route, asPath } = useRouter(),
        [alert, setAlert] = useState(false),
        { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        loadConfig()
    }, [])

    const loadConfig = async () => {
        try {
            const res = await axios.get("/config"),
                resSocials = await axios.get('/socials/all')
            setConfig(res.data.data)
            setSocials(resSocials.data.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }
    if (route === "/404") return <div></div>

    const onSubmit = async data => {
        try {
            const res = await axios.post('/contact', { ...data, path: asPath })
            if (res.status === 200) {
                setAlert(true)
                setValue('name', '')
                setValue('phoneNumber', '')
                setValue('email', '')
                setValue('content', '')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return (
        <div className="lienhe">
            {alert && (
                <SweetAlert
                    success
                    title="Cảm ơn bạn đã liên hệ"
                    onConfirm={() => setAlert(false)}
                >
                    Chúng tôi sẽ liên hệ lại với bạn sớm nhất
                </SweetAlert>
            )}
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
                    <form onSubmit={handleSubmit(onSubmit)} className="col-md-6 col-sm-12 row py-4 my-4 mr-auto ml-auto">
                        <div className="col-12">
                            <div className="form-group">
                                <input type="string" name="name" className="form-control w-100 input-lienhe" placeholder="TÊN CỦA BẠN" ref={register({})} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="string" name="phoneNumber" className="form-control w-100 input-lienhe" placeholder="SỐ ĐIỆN THOẠI" ref={register({})} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="email" name="email" className="form-control w-100 input-lienhe" placeholder="EMAIL" ref={register({})} />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <textarea rows={3} name="content" type="string" className="form-control w-100 input-lienhe" placeholder="NỘI DUNG" ref={register({})} />
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-contact">Gửi</button>
                        </div>
                    </form>
                    <div className="col-md-3 col-sm-12"></div>
                </div>
                <div className="row mr-auto ml-auto d-flex align-items-center information pb-4 px-4 mb-4 m">
                    <div className="col-sm-4 text-left my-3">
                        <p className="lienheheader">{config?.footer?.openTitle}</p>
                        <p className="lienhecontent">{config?.footer?.fromTo}</p>
                        <p className="lienhecontent">{config?.footer?.workingTime}</p>
                    </div>
                    <div className="col-sm-4 text-center px-0 my-3">
                        <p className="lienheheader">{config?.footer?.addressTitle}:</p>
                        <p className="lienhecontent">{config?.footer?.address.split(",")[0]}</p>
                        <p className="lienhecontent">{config?.footer?.address.split(",")[1]}, {config?.footer?.address.split(",")[2]}</p>
                    </div>
                    <div className="col-sm-4 text-right my-3">
                        <p className="lienhecontent">SĐT: {config?.footer?.phone}</p>
                        <p className="lienhecontent">Email: {config?.footer?.email}</p>
                        <p className="d-flex justify-content-end">
                            {socials.map(social => (
                                <a key={social._id} target="_blank" href={social.link}>
                                    <img src={social.img} width={40} height={40} className="mx-2" />
                                </a>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            <div className="copyright w-100 text-center">
                <p className="lienheheader text-color" style={{ fontWeight: "normal" }}>Copyright © 2003–2020 Tan Phu Cuong Chemical.</p>
            </div>
        </div>
    )
})

export default FooterComponent