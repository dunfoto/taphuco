import React, { useState } from 'react'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import fileUpload from "fuctbase64"
import axios from "utils/axios"

const DanhMucComponent = React.memo(props => {
    const { register, handleSubmit, setValue } = useForm(),
        [img, setImg] = useState(null),
        router = useRouter()

    const onSubmit = async data => {
        try {
            const res = await axios.post('/category', data)
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

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/bo-san-pham")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h3>Tạo danh mục</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
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
                <div className="custom-file form-group col-12 mb-4 py-4">
                    {img && (<img width="auto" className="img-thumbnail mt-4" src={img} alt="temp" />)}
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
                <button className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Lưu lại</button>
            </form>
        </React.Fragment>
    )
})

export default DanhMucComponent