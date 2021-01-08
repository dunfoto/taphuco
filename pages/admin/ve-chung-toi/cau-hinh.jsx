import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getConfig } from "redux/reducers/config"
import SweetAlert from "react-bootstrap-sweetalert"
import { useForm } from "react-hook-form"
import { Spinner } from "react-bootstrap"
import axios from "utils/axios"

const CauHinhComponent = React.memo(props => {
    const { config: { aboutUs }, getConfig } = props,
        { register, handleSubmit, setValue } = useForm(),
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false)

    useEffect(() => {
        if (aboutUs) {
            setValue('title', aboutUs.title)
            setValue('description', aboutUs.description)
            setValue('target', aboutUs.target)
            setValue('businessArea', aboutUs.businessArea)
        }
    }, [aboutUs])

    const onSubmit = async data => {
        try {
            setIsWait(true)
            const res = await axios.post('/config/aboutUs', data)
            if (res.status === 200) {
                setAlert(true)
                setIsWait(false)
                getConfig()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return (
        <div className="w-100">
            <h3>Cấu hình - Về chúng tôi</h3>
            <div className="w-50">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="title">Tiêu đề</label>
                        <input
                            type="string"
                            className="form-control"
                            id="title"
                            name="title"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                            type="string"
                            className="form-control"
                            id="description"
                            name="description"
                            rows={5}
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="target">Mục tiêu</label>
                        <textarea
                            type="string"
                            className="form-control"
                            id="target"
                            name="target"
                            rows={5}
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="businessArea">Lĩnh vực kinh doanh</label>
                        <textarea
                            type="string"
                            className="form-control"
                            id="businessArea"
                            name="businessArea"
                            rows={5}
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <button type="submit" disabled={isWait} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{isWait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
                </form>
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
        </div>
    )
})

const mapStateToProps = state => ({
    config: state.config
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CauHinhComponent)