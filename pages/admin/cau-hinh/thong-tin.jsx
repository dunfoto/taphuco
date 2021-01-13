import React, { useEffect, useState } from "react"
import { getConfig } from "redux/reducers/config"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useForm } from "react-hook-form"
import { v4 } from "uuid"
import { Spinner } from "react-bootstrap"
import axios from "utils/axios"
import SweetAlert from "react-bootstrap-sweetalert"

const CauHinhComponent = React.memo(props => {
    const { footer, getConfig } = props,
        { register, handleSubmit, setValue } = useForm(),
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false),
        [socials, setSocials] = useState([])

    useEffect(() => {
        if (footer) {
            setValue('openTitle', footer.openTitle)
            setValue('fromTo', footer.fromTo)
            setValue('workingTime', footer.workingTime)
            setValue('addressTitle', footer.addressTitle)
            setValue('address', footer.address)
            setValue('phone', footer.phone)
            setValue('email', footer.email)
        }
    }, [footer])

    const onSubmit = async data => {
        try {
            setIsWait(true)
            const res = await axios.post('/config/footer', data)
            if (res.status === 200) {
                setIsWait(false)
                setAlert(true)
                getConfig()
            }
        } catch (err) {
            setIsWait(false)
            return Promise.reject(err)
        }
    }

    console.log(socials)
    return (
        <div className="w-100">
            <h3 className="mt-4">Thông tin liên hệ</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-6">
                    <h5 className="mt-4">Bên trái (Thời gian làm việc):</h5>
                    <div className="form-group">
                        <label htmlFor="openTitle">Tiêu đề</label>
                        <input
                            type="string"
                            className="form-control"
                            id="openTitle"
                            name="openTitle"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fromTo">Ngày làm việc</label>
                        <input
                            type="string"
                            className="form-control"
                            id="fromTo"
                            name="fromTo"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workingTime">Giờ làm việc</label>
                        <input
                            type="string"
                            className="form-control"
                            id="workingTime"
                            name="workingTime"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                </div>

                <div className="col-6">
                    <h5 className="mt-4">Chính giữa (Địa chỉ):</h5>
                    <div className="form-group">
                        <label htmlFor="addressTitle">Tiêu đề</label>
                        <input
                            type="string"
                            className="form-control"
                            id="addressTitle"
                            name="addressTitle"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ</label>
                        <textarea
                            type="string"
                            className="form-control"
                            id="address"
                            name="address"
                            rows={5}
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                </div>

                <div className="col-6">
                    <h5 className="mt-4">Bên phải (Thời gian làm việc):</h5>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="string"
                            className="form-control"
                            id="phone"
                            name="phone"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Địa chỉ email</label>
                        <input
                            type="string"
                            className="form-control"
                            id="email"
                            name="email"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" disabled={isWait} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{isWait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
                </div>
            </form>
            <div className="row">
                <div className="col-12 mb-4">
                    <h5 className="mt-4">Mạng xã hội:</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Logo</th>
                                <th scope="col">Đường dẫn</th>
                                <th className="text-center" scope="col">
                                    <button type="button" className="btn" onClick={() => console.log("Demo")} >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {socials.map(social => (
                                <tr>
                                    <td>{social.img}</td>
                                    <td>{social.link}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {alert && (
                <SweetAlert
                    success
                    title="Woot!"
                    onConfirm={() => setAlert(false)}
                >
                    Update success
                </SweetAlert>
            )}
        </div >
    )
})

const mapStateToProps = state => ({
    footer: state.config.footer
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CauHinhComponent)