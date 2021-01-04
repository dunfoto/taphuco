import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import fileUpload from "fuctbase64"
import Cropper from 'react-cropper'
import axios from "utils/axios"

const DanhMucComponent = React.memo(props => {
    const { register, handleSubmit, setValue } = useForm(),
        cropper = useRef(),
        [img, setImg] = useState(null),
        [editImg, setEditImg] = useState(false),
        router = useRouter(),
        { query: { id } } = router


    useEffect(() => {
        getDetailCategory()
    }, [])

    const getDetailCategory = async () => {
        try {
            const res = await axios.get(`/category/${id}`),
                { data: { data: { title, description, img } } } = res
            setValue('title', title)
            setValue('description', description)
            setValue('img', img)
            setImg(img)
        } catch (err) {
            return Promise.reject(err)
        }
    }
    const onSubmit = async data => {
        try {
            if (data.img !== img) {
                data.img = img
            }
            const res = await axios.put(`/category/${id}`, data)
            if (res.status === 200) {
                router.push("/admin/bo-san-pham/danh-muc")
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
        }
    }

    const cropImage = () => {
        setImg(cropper.current.cropper.getCroppedCanvas().toDataURL())
        setEditImg(false)
    }

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/bo-san-pham/danh-muc")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h3>Sửa danh mục</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group w-50">
                    <label htmlFor="title" className="form-label">Tiêu đề</label>
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
                <div className="form-group w-50">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <input
                        type="string"
                        id="description"
                        name="description"
                        className="form-control"
                        ref={register({
                            required: true
                        })}
                    />
                </div>
                <div className="custom-file form-group col-12">
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
                <div className="form-group col-12">
                    <div className="row">
                        <div className="col-6">
                            {img && (<img width="auto" className="img-thumbnail mt-4" src={img} alt="temp" />)}
                        </div>
                        <div className="col-6 pt-4">
                            {editImg && (
                                <Cropper
                                    ref={cropper}
                                    src={img}
                                    aspectRatio={1 / 1}
                                    zoomOnWheel={false}
                                    viewMode={2}
                                />
                            )}
                        </div>
                        <div className="col-12 my-2">
                            {editImg ? (
                                <React.Fragment>
                                    <button type="button" onClick={() => cropImage()} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Lưu hình ảnh</button>
                                    <button type="button" onClick={() => setEditImg(false)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Huỷ sửa hình ảnh</button>
                                </React.Fragment>
                            ) : (
                                    <button type="button" onClick={() => setEditImg(!editImg)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Sửa ảnh</button>
                                )}
                        </div>
                    </div>
                </div>
                <button className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Lưu lại</button>
            </form>
        </React.Fragment>
    )
})

export default DanhMucComponent
