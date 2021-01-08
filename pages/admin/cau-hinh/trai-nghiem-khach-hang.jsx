import React, { useState, useEffect, useRef } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Spinner } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getConfig } from "redux/reducers/config"
import Cropper from "react-cropper"
import fileUpload from "fuctbase64"
import axios from "utils/axios"

const CauHinhComponent = React.memo(props => {
    const { register, handleSubmit, setValue } = useForm(),
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false),
        [editImg, setEditImg] = useState(false),
        [img, setImg] = useState(null),
        [originalImg, setOriginalImg] = useState(null),
        cropper = useRef(),
        { customerExperience, getConfig } = props

    useEffect(() => {
        if (customerExperience) {
            setValue("title", customerExperience.title)
            setValue("description", customerExperience.description)
            setValue('img', customerExperience.img)
            setImg(customerExperience.img)
            setOriginalImg(customerExperience.img)
        }
    }, [customerExperience])

    useEffect(() => {
        setValue('img', img)
    }, [img])

    const onSubmit = async data => {
        setIsWait(true)
        try {
            const res = await axios.post("/config/customerExperience", data)
            if (res.status === 200) {
                setAlert(true)
                setIsWait(false)
                getConfig()
            }
        } catch (err) {
            setIsWait(false)
            return Promise.reject(err)
        }
    }
    const onChangeImg = async event => {
        const newImg = "data:image/png;base64," + (await fileUpload(event, true)).base64
        setImg(newImg)
        setOriginalImg(newImg)
    }

    const saveImageEdit = () => {
        if (editImg) {
            setImg(cropper.current.cropper.getCroppedCanvas().toDataURL())
            setEditImg(false)
        } else {
            setEditImg(true)
        }
    }

    return (
        <div className="w-100">
            <h3 className="my-4">Trải nghiệm khách hàng</h3>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề trải nghiệm khách hàng</label>
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
                            <label htmlFor="description">Mô tả trải nghiệm khách hàng</label>
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
                        <button type="submit" disabled={isWait} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{isWait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
                    </form>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="img">Hình ảnh</label>
                        <input
                            type="string"
                            className="form-control"
                            id="img"
                            name="img"
                            hidden
                            ref={register({
                                required: true
                            })}
                        />
                        <div className="custom-file form-group col-12">
                            <input
                                id="icon"
                                name="icon"
                                className="custom-file-input"
                                accept=".jpeg, .png"
                                type="file"
                                onChange={onChangeImg}
                            />
                            <label className="custom-file-label" htmlFor="icon">Chọn hình ảnh</label>
                        </div>
                    </div>
                    <div className="col-12 row">
                        <div className="form-group col-6 text-center">
                            {img && (
                                <React.Fragment>
                                    <img src={img} onClick={() => setEditImg(!editImg)} alt={`hinh-anh-trai-nghiem-khach-hang`} style={{ maxHeight: 250, width: "100%" }} />
                                    <div className="w-100">
                                        <button
                                            type="button"
                                            onClick={() => saveImageEdit()}
                                            className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color my-2"
                                        >
                                            {editImg ? "Lưu" : "Sửa ảnh"}
                                        </button>
                                        {editImg && (<button type="button" onClick={() => setEditImg(false)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color my-2">Huỷ</button>)}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <div className="form-group col-6 text-center editImageGiaiPhap">
                            {editImg && (
                                <Cropper
                                    ref={cropper}
                                    src={originalImg}
                                    initialAspectRatio={1 / 1}
                                    zoomOnWheel={false}
                                    viewMode={2}
                                />
                            )}
                        </div>
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
            </div>
        </div>
    )
})

const mapStateToProps = state => ({
    customerExperience: state.config.customerExperience
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CauHinhComponent)