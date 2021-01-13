import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import fileUpload from "fuctbase64"
import Cropper from 'react-cropper'
import axios from "utils/axios"
import checkPermission from "common/checkValidPermission"

const NewSoDoToChucComponent = React.memo(props => {
    const router = useRouter(),
        { register, setValue, handleSubmit } = useForm(),
        cropper = useRef(),
        [edit, setEdit] = useState(false),
        [img, setImg] = useState(null),
        [original, setOriginal] = useState(null)

    useEffect(() => {
        !checkPermission("BOARD_DIRECTOR:CREATE") && router.push('/admin/404')
    }, [])
    
    const onSubmit = async data => {
        try {
            const res = await axios.post('/board-director', data)
            if (res.status === 200) {
                router.push('/admin/ve-chung-toi/so-do-to-chuc')
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
            setEdit(true)
        }
    }

    const onSaveEditImg = () => {
        try {
            setImg(cropper.current.cropper.getCroppedCanvas().toDataURL())
            setValue('img', cropper.current.cropper.getCroppedCanvas().toDataURL())
        } catch (err) {
            console.log(err)
        }
        setEdit(false)
    }

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/ve-chung-toi/so-do-to-chuc")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Tạo thành viên công ty</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-12 row">
                        <div className="form-group col-6">
                            <label htmlFor="name" className="form-label">Tên</label>
                            <input
                                type="string"
                                id="name"
                                name="name"
                                className="form-control"
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                    </div>
                    <div className="col-12 row">
                        <div className="form-group col-6">
                            <label htmlFor="title" className="form-label">Chức vụ</label>
                            <input
                                type="string"
                                id="title"
                                name="title"
                                className="form-control"
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                    </div>
                    <div className="col-12 row">
                        <div className="form-group col-6">
                            <input
                                type="string"
                                name="img"
                                hidden
                                ref={register({
                                    required: true
                                })}
                            />
                            <div className="custom-file">
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
                    </div>
                    {img && original && (
                        <div className="col-12 row">
                            <div className="col-6">
                                <img src={img} alt="mew_img" height={250} width="auto" className="img-thumbnail" />
                            </div>
                            <div className="col-6">
                                {edit && (
                                    <Cropper
                                        viewMode={2}
                                        ref={cropper}
                                        src={original}
                                        aspectRatio={1 / 1}
                                        zoomOnWheel={false}
                                    />
                                )}
                            </div>
                            {edit ? (
                                <div className="col-6">
                                    <button type="button" className="btn btn-transparent btn-border text-color my-4 mr-2" onClick={() => onSaveEditImg()}>Lưu lại thay đổii</button>
                                    <button type="button" className="btn btn-transparent btn-border text-color my-4 ml-2" onClick={() => setEdit(false)}>Huỷ sửa ảnh</button>
                                </div>
                            ) : (
                                    <div className="col-6">
                                        <button type="button" className="btn btn-transparent btn-border text-color my-4" onClick={() => setEdit(true)}>Sửa hình ảnh</button>
                                    </div>
                                )}
                        </div>
                    )}
                    <div className="col-12 row">
                        <div className="form-group col-6">
                            <button type="submit" className="btn btn-transparent btn-border text-color my-4">Lưu lại</button>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
})

export default NewSoDoToChucComponent
