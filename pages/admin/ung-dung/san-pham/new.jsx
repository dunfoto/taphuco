import React, { useState, useEffect, useRef } from "react"
import axios from "utils/axios"
import Select from "react-select"
import { v4 } from "uuid"
import { convertBase64 } from "common/base64"
import { useRouter } from 'next/router'
import Cropper from 'react-cropper'
import checkPermission from "common/checkValidPermission"

const NewProductComponent = React.memo(props => {
    const [showTitle, setShowTitle] = useState(''),
        [showDescription, setShowDescription] = useState(''),
        [title, setTitle] = useState(''),
        [description, setDescription] = useState(''),
        [imgs, setImgs] = useState([]),
        [originalImgs, setOriginalImgs] = useState([]),
        [editImg, setEditImg] = useState(null),
        cropper = useRef(),
        [prepare, setPrepare] = useState([]),
        [afterDye, setAfterDye] = useState([]),
        [complete, setComplete] = useState([]),
        [category, setCategory] = useState(null),
        [lstCategories, setLstCategories] = useState([]),
        router = useRouter()


    useEffect(() => {
        getLstCategories()
    }, [])

    useEffect(() => {
        !checkPermission("PRODUCT:CREATE") && router.push('/admin/404')
    }, [])

    const getLstCategories = async () => {
        try {
            const res = await axios.get('/categories')
            setLstCategories(res.data.data.map(item => ({ value: item._id, label: item.title })))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onChangeImg = async event => {
        const lstFile = Object.keys(event.target.files).map(key => event.target.files[key])
        const result = await Promise.all(lstFile.map(async file => "data:image/png;base64," + (await convertBase64(file)).base64))
        setOriginalImgs([...originalImgs, ...result])
        setImgs([...imgs, ...result])
    }

    const cropImage = i => {
        setImgs(imgs.map((img, index) => {
            if (index === i) {
                return cropper.current.cropper.getCroppedCanvas().toDataURL()
            } else {
                return img
            }
        }))
        setEditImg(null)
    }

    const onChange = e => {
        switch (e.target.getAttribute("data-type")) {
            case 'title':
                setTitle(e.target.value)
                break

            case 'description':
                setDescription(e.target.value)
                break

            case 'showTitle':
                setShowTitle(e.target.value)
                break

            case 'showDescription':
                setShowDescription(e.target.value)
                break

            case 'prepare':
                setPrepare(prepare.map(p => {
                    if (p._id === e.target.getAttribute('data-id')) {
                        return {
                            ...p,
                            value: e.target.value
                        }
                    }
                    return p
                }))
                break

            case 'afterDye':
                setAfterDye(afterDye.map(p => {
                    if (p._id === e.target.getAttribute('data-id')) {
                        return {
                            ...p,
                            value: e.target.value
                        }
                    }
                    return p
                }))
                break

            case 'complete':
                setComplete(complete.map(p => {
                    if (p._id === e.target.getAttribute('data-id')) {
                        return {
                            ...p,
                            value: e.target.value
                        }
                    }
                    return p
                }))
                break
            default:
                break
        }
    }

    const onRemove = e => {
        switch (e.target.getAttribute('data-important-info')) {
            case 'prepare':
                setPrepare(prepare.filter(p => p._id !== e.target.getAttribute('data-remove')))
                break

            case 'afterDye':
                setAfterDye(afterDye.filter(p => p._id !== e.target.getAttribute('data-remove')))
                break

            case 'complete':
                setComplete(complete.filter(p => p._id !== e.target.getAttribute('data-remove')))
                break
        }
    }

    const append = e => {
        switch (e.target.getAttribute('data-important-info')) {
            case 'prepare':
                const newPrepare = [...prepare, { _id: v4(), value: '' }]
                setPrepare(newPrepare)
                break

            case 'afterDye':
                const newAfterDye = [...afterDye, { _id: v4(), value: '' }]
                setAfterDye(newAfterDye)
                break

            case 'complete':
                const newComplete = [...complete, { _id: v4(), value: '' }]
                setComplete(newComplete)
                break
        }
    }

    const onSubmit = async () => {
        try {
            const data = {
                title,
                description,
                imgs,
                showTitle,
                showDescription,
                prepare: prepare.map(t => t.value),
                afterDye: afterDye.map(t => t.value),
                complete: complete.map(t => t.value),
                category: category?.value
            },
                res = await axios.post('/product', data)
            if (res.status === 200) {
                router.push('/admin/ung-dung/san-pham')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const removeImage = ic => {
        setImgs(imgs.filter((_, index) => Boolean(ic !== index)))
    }

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/ung-dung/san-pham")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h3>Tạo sản phẩm</h3>
            <div className="row">
                <div className="col-12 row">
                    <div className="form-group col-6">
                        <label htmlFor="showTitle" className="form-label">Tiêu đề hiển thị</label>
                        <input
                            type="string"
                            id="showTitle"
                            data-type="showTitle"
                            className="form-control"
                            value={showTitle}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="showDescription" className="form-label">Mô tả hiển thị</label>
                        <textarea
                            type="string"
                            id="showDescription"
                            data-type="showDescription"
                            className="form-control"
                            value={showDescription}
                            onChange={onChange}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="col-12 row">
                    <div className="form-group col-6">
                        <label htmlFor="title" className="form-label">Tiêu đề</label>
                        <input
                            type="string"
                            id="title"
                            data-type="title"
                            className="form-control"
                            value={title}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="description" className="form-label">Mô tả</label>
                        <textarea
                            type="string"
                            id="description"
                            data-type="description"
                            className="form-control"
                            value={description}
                            onChange={onChange}
                            rows={2}
                        />
                    </div>
                </div>
                <div className="col-12 row">
                    <div className="form-group col-6">
                        <label htmlFor="prepare" className="form-label">Tiền xử lý</label>
                        {prepare.map((p, index) => (
                            <div key={p._id} className="d-flex my-2">
                                <input
                                    key={p._id}
                                    data-id={p._id}
                                    data-type="prepare"
                                    type="string"
                                    id={`prepare-${p._id}`}
                                    className="form-control col-10"
                                    value={p.value}
                                    onChange={onChange}
                                />
                                <div className="d-flex justify-content-start align-items-center col-2">
                                    <i className="fas fa-times-circle" data-important-info="prepare" data-remove={p._id} onClick={onRemove} style={{ cursor: "pointer" }}></i>
                                </div>
                            </div>
                        ))}
                        <div className="d-flex">
                            <button type="button" className="col-10 btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color w-100" data-important-info="prepare" onClick={append}><i className="fas fa-plus-circle"></i></button>
                        </div>
                    </div>
                    <div className="form-group col-6 d-flex align-items-stretch flex-column">
                        <div className='mb-auto'>
                            <label htmlFor="afterDye" className="form-label">Sau nhuộm</label>
                            {afterDye.map((p, index) => (
                                <div key={p._id} className="d-flex my-2">
                                    <input
                                        key={p._id}
                                        data-id={p._id}
                                        data-type="afterDye"
                                        type="string"
                                        id={`afterDye-${p._id}`}
                                        className="form-control col-10"
                                        value={p.value}
                                        onChange={onChange}
                                    />
                                    <div className="d-flex justify-content-start align-items-center col-2">
                                        <i className="fas fa-times-circle" data-important-info="afterDye" data-remove={p._id} onClick={onRemove} style={{ cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex">
                                <button type="button" className="col-10 btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color w-100" data-important-info="afterDye" onClick={append}><i className="fas fa-plus-circle"></i></button>
                            </div>
                        </div>
                        <div className='my-2'></div>
                        <div className='mt-auto'>
                            <label htmlFor="complete" className="form-label">Hoàn tất</label>
                            {complete.map((p, index) => (
                                <div key={p._id} className="d-flex my-2">
                                    <input
                                        key={p._id}
                                        data-id={p._id}
                                        data-type="complete"
                                        type="string"
                                        id={`complete-${p._id}`}
                                        className="form-control col-10"
                                        value={p.value}
                                        onChange={onChange}
                                    />
                                    <div className="d-flex justify-content-start align-items-center col-2">
                                        <i className="fas fa-times-circle" data-important-info="complete" data-remove={p._id} onClick={onRemove} style={{ cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex">
                                <button type="button" className="col-10 btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color w-100" data-important-info="complete" onClick={append}><i className="fas fa-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 row border-top pt-4">
                    <div className="col-6">
                        <div className="custom-file form-group col-12">
                            <input
                                id="icon"
                                name="icon"
                                className="custom-file-input"
                                accept=".jpeg, .png"
                                type="file"
                                multiple
                                onChange={onChangeImg}
                            />
                            <label className="custom-file-label" htmlFor="icon">Chọn hình ảnh</label>
                        </div>
                    </div>
                    <div className="col-12">
                        {imgs && imgs.map((img, index) => (<img key={index} onClick={() => setEditImg(editImg === index ? null : index)} className="img-thumbnail mt-4 mx-2" src={img} alt="temp" style={{ height: 200 }} />))}
                    </div>
                    <div className="col-12">
                        {editImg !== null && (
                            <Cropper
                                ref={cropper}
                                src={originalImgs[editImg]}
                                aspectRatio={1 / 1}
                                zoomOnWheel={false}
                                className="img-thumnail"
                                viewMode={2}
                            />
                        )}
                        {editImg !== null && (
                            <React.Fragment>
                                <button type="button" onClick={() => cropImage(editImg)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color mt-4">Lưu hình ảnh</button>
                                <button type="button" onClick={() => setEditImg(null)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color mt-4">Huỷ sửa hình ảnh</button>
                                <button type="button" onClick={() => removeImage(editImg)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color mt-4">Xoá hình ảnh</button>
                            </React.Fragment>
                        )}

                    </div>
                </div>
                <div className="col-12 row my-4">
                    <div className="form-group col-6">
                        <label htmlFor="complete" className="form-label">Hoàn tất</label>
                        <Select
                            options={lstCategories}
                            value={category}
                            onChange={setCategory}
                        />
                    </div>
                </div>

                <div className="col-12 row">
                    <div className="form-group col-6">
                        <button type="button" onClick={() => onSubmit()} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color mt-4">Lưu</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
})

export default NewProductComponent
