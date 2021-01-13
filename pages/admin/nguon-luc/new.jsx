import React, { useEffect, useRef, useState } from 'react'
import SunEditor from 'suneditor-react'
import { useRouter } from 'next/router'
import axios from 'utils/axios'
import fileUpload from "fuctbase64"
import Cropper from 'react-cropper'
import Select from "react-select"
import checkPermission from "common/checkValidPermission"

const NewGiaiPhapComponent = React.memo(props => {
    const editorRef = useRef(),
        [title, setTitle] = useState(''),
        [categories, setCategories] = useState([]),
        [lstCategories, setLstCategories] = useState([]),
        router = useRouter(),
        cropper = useRef(),
        [edit, setEdit] = useState(false),
        [img, setImg] = useState(null),
        [original, setOriginal] = useState(null)

    useEffect(() => {
        getLstCategory()
    }, [getLstCategory])

    useEffect(() => {
        !checkPermission("POWER:CREATE") && router.push('/admin/404')
    }, [])

    const getLstCategory = async () => {
        try {
            const res = await axios.get('/categories/all')
            setLstCategories(res.data.data.map(t => ({ value: t._id, label: t.title })))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
        console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
        convertImageToUrl(editorRef.current.editor.getContents().split('"').filter(t => t.includes('data:image/png;base64')))
    }

    const convertImageToUrl = async lstImg => {
        try {
            const res = await axios.post('/images/upload', lstImg)
            if (res.status === 200) {
                const { data: { data } } = res
                lstImg.forEach((img, index) => {
                    const newContents = editorRef.current.editor.getContents().replaceAll(img, data[index])
                    editorRef.current.editor.setContents(newContents)
                })
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onSubmit = async e => {
        try {
            const data = {
                title,
                img,
                content: editorRef.current.editor.getContents(),
                categories: categories.map(t => t.value)
            },
                res = await axios.post('/power', data)
            if (res.status === 200) {
                router.push('/admin/nguon-luc')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onChangeImg = async event => {
        if (event.target.value !== "") {
            const newImg = "data:image/png;base64," + (await fileUpload(event, true)).base64
            setImg(newImg)
            setOriginal(newImg)
            setEdit(true)
        }
    }

    const onSaveEditImg = () => {
        try {
            setImg(cropper.current.cropper.getCroppedCanvas().toDataURL())
        } catch (err) {
            console.log(err)
        }
        setEdit(false)
    }

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/nguon-luc")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Tạo nguồn lực</h2>
            <div className="row">
                <div className="col-12 row">
                    <div className="form-group col-6">
                        <label htmlFor="title" className="form-label">Tiêu đề</label>
                        <input
                            type="string"
                            id="title"
                            data-type="title"
                            className="form-control"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="title" className="form-label">Danh mục</label>
                        <Select
                            isMulti
                            options={lstCategories}
                            value={categories}
                            onChange={setCategories}
                            styles={{
                                menu: (provided, state) => ({
                                    ...provided,
                                    zIndex: 9000
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="col-12 row">
                <div className="form-group col-6 mr-auto ml-auto">
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
            {img && original && (
                <div className="col-12 row">
                    <div className="col-6">
                        <img src={img} alt="mew_img" height={250} width="auto" className="img-thumbnail" />
                    </div>
                    <div className="col-6">
                        {edit && (
                            <Cropper
                                ref={cropper}
                                src={original}
                                initialAspectRatio={1 / 1}
                                zoomOnWheel={false}
                                viewMode={2}
                            />
                        )}
                    </div>
                    {edit ? (
                        <div className="col-6">
                            <button type="button" className="btn btn-transparent btn-border text-color my-4 mr-2" onClick={() => onSaveEditImg()}>Lưu lại thay đổi</button>
                            <button type="button" className="btn btn-transparent btn-border text-color my-4 ml-2" onClick={() => setEdit(false)}>Huỷ sửa ảnh</button>
                        </div>
                    ) : (
                            <div className="col-6">
                                <button type="button" className="btn btn-transparent btn-border text-color my-4" onClick={() => setEdit(true)}>Sửa hình ảnh</button>
                            </div>
                        )}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="content" className="form-label">Nội dung</label>
                <SunEditor
                    ref={editorRef}
                    autoFocus={true}
                    height="40vh"
                    onImageUpload={handleImageUpload}
                    setOptions={{
                        buttonList: [
                            ['undo', 'redo',
                                'font', 'fontSize', 'formatBlock',
                                'paragraphStyle', 'blockquote',
                                'bold', 'underline', 'italic', 'strike',
                                'fontColor', 'hiliteColor', 'textStyle',
                                'removeFormat',
                                'outdent', 'indent',
                                'align', 'horizontalRule', 'list', 'lineHeight',
                                'table', 'link', 'image', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
                                'fullScreen', 'showBlocks', 'codeView']
                        ]
                    }}
                />
            </div>
            <button type="button" className="btn btn-transparent btn-border text-color" onClick={onSubmit}>Lưu lại</button>
        </React.Fragment>
    )
})

export default NewGiaiPhapComponent
