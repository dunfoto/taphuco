import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import fileUpload from "fuctbase64"
import Cropper from 'react-cropper'
import axios from "utils/axios"
import { useRouter } from "next/router"

const NewSocialComponent = React.memo(props => {
    const { register, handleSubmit, setValue } = useForm(),
        [original, setOriginal] = useState(null),
        cropper = useRef(),
        [img, setImg] = useState(null),
        [editImg, setEditImg] = useState(false),
        { push } = useRouter()

    const onSubmit = async data => {
        try {
            const res = await axios.post('/social', data)
            if (res.status === 200) {
                push('/admin/cau-hinh/thong-tin')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onChangeImg = async event => {
        if (event.target.value !== "") {
            const newImg = "data:image/png;base64," + (await fileUpload(event, true)).base64
            setValue('img', newImg)
            setImg(newImg)
            setOriginal(newImg)
        }
    }
    const cropImage = () => {
        setImg(cropper.current.cropper.getCroppedCanvas().toDataURL())
        setOriginal(cropper.current.cropper.getCroppedCanvas().toDataURL())
        setEditImg(false)
    }

    return (
        <React.Fragment>
            <i onClick={() => push("/admin/cau-hinh/thong-tin")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Tạo mạng xã hội</h2>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="form-group col-6">
                        <label htmlFor="link" className="form-label">Đường dẫn</label>
                        <input
                            type="string"
                            id="link"
                            name="link"
                            className="form-control"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group input-group 12 my-4">
                        <div className="custom-file my-2 col-6">
                            <input
                                type="string"
                                name="img"
                                hidden
                                ref={register({
                                    required: true
                                })}
                            />
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
                        <div className="my-2 col-12">
                            <div className="row">
                                <div className="col-6">
                                    {img && (
                                        <img src={img} className="img-thumnail" style={{ width: "100%", height: "auto" }} />
                                    )}
                                    <div className="my-2">
                                        {editImg ? (
                                            <React.Fragment>
                                                <button type="button" onClick={() => cropImage()} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Lưu hình ảnh</button>
                                                <button type="button" onClick={() => setEditImg(false)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Huỷ sửa hình ảnh</button>
                                            </React.Fragment>
                                        ) : (
                                                img && <button type="button" onClick={() => setEditImg(!editImg)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Sửa ảnh</button>
                                            )}
                                    </div>
                                </div>
                                <div className="col-6">
                                    {editImg && (
                                        <Cropper
                                            ref={cropper}
                                            src={original}
                                            aspectRatio={1 / 1}
                                            zoomOnWheel={false}
                                            viewMode={2}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-12">
                        <button type="submit" className="btn btn-transparent btn-border text-color">Lưu lại</button>
                    </div>
                </div>
            </form>
        </React.Fragment >
    )
})

export default NewSocialComponent