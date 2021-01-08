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
    const { register, handleSubmit, control, setValue } = useForm(),
        { fields, append, remove } = useFieldArray({
            control,
            name: "contentMessage"
        }),
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false),
        [editImg, setEditImg] = useState(false),
        [img, setImg] = useState(null),
        [originalImg, setOriginalImg] = useState(null),
        cropper = useRef(),
        { homepage, getConfig } = props

    useEffect(() => {
        if (homepage) {
            setValue("pointMessage", homepage.pointMessage)
            setValue("contentMessage", homepage.contentMessage.map(item => ({ value: item })))
            setValue('img', homepage.img)
            setImg(homepage.img)
            setOriginalImg(homepage.img)
        }
    }, [homepage])

    useEffect(() => {
        setValue('img', img)
    }, [img])

    const onSubmit = async data => {
        setIsWait(true)
        if (data.contentMessage) {
            data.contentMessage = data.contentMessage.map(item => item.value)
        } else {
            delete data.contentMessage
        }
        try {
            const res = await axios.post("/config/homepage", data)
            if (res.status === 200) {
                getConfig()
                setAlert(true)
                setIsWait(false)
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
             <h3 className="my-4">Thông điệp</h3>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="pointMessage">Tiêu đề cho thông điệp</label>
                            <input
                                type="string"
                                className="form-control"
                                id="pointMessage"
                                name="pointMessage"
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contentMessage">Nội dung thông điệp</label>
                            {fields.map((field, index) => (
                                <div className="d-flex" key={field.id}>
                                    <input
                                        type="string"
                                        className="form-control justify-content-center my-2 col-10"
                                        name={`contentMessage[${index}].value`}
                                        defaultValue={field.value}
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                    <div className="d-flex justify-content-center align-items-center col-2">
                                        <i className="fas fa-times-circle" onClick={() => remove(index)} style={{ cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex">
                                <button type="button" className="col-10 btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color w-100" onClick={() => append({ value: "" })}><i className="fas fa-plus-circle"></i></button>
                            </div>
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
                            <img src={img} onClick={() => setEditImg(!editImg)} height={250} alt={`hinh-anh-thong-diep`} />
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
    homepage: state.config.homepage
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CauHinhComponent)