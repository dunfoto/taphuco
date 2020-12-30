import React, { useRef, useState } from 'react'
import SunEditor from 'suneditor-react'
import { useRouter } from 'next/router'
import axios from 'utils/axios'
import Cropper from 'react-cropper'
import fileUpload from "fuctbase64"

const NewGiaiPhapComponent = React.memo(props => {
    const editorRef = useRef(),
        [showTitle, setShowTitle] = useState(''),
        [title, setTitle] = useState(''),
        [img, setImg] = useState(null),
        [editImg, setEditImg] = useState(false),
        [originalImg, setOriginalImg] = useState(null),
        cropper = useRef(),
        router = useRouter()

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
                showTitle,
                title,
                content: editorRef.current.editor.getContents(),
                img
            },
                res = await axios.post('/solution', data)
            if (res.status === 200) {
                router.push('/admin/giai-phap')
            }
        } catch (err) {
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

    const handlePaste = (e, cleanData, maxCharCount) => {
        editorRef.current.editor.insertHTML(cleanData, true, maxCharCount)
    }

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/giai-phap")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Tạo giải pháp</h2>
            <div className="row">
                <div className="col-12 row">
                    <div className="col-12 row">
                        <div className="form-group col-6">
                            <label htmlFor="showTitle" className="form-label">Tiêu đề hiển thị</label>
                            <input
                                type="string"
                                id="showTitle"
                                data-type="showTitle"
                                className="form-control"
                                value={showTitle}
                                onChange={e => setShowTitle(e.target.value)}
                            />
                        </div>
                    </div>
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
                </div>
                <div className="col-12 row">
                    <div className="form-group col-6 text-center">
                        {img ? (
                            <React.Fragment>
                                <img src={img} onClick={() => setEditImg(!editImg)} height={250} alt={`giai-phap`} />
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
                        ) : (
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
                            )}
                    </div>
                    <div className="form-group col-6 text-center">
                        {editImg && (
                            <Cropper
                                ref={cropper}
                                src={originalImg}
                                aspectRatio={1 / 1}
                                zoomOnWheel={false}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="content" className="form-label">Nội dung</label>
                <SunEditor
                    ref={editorRef}
                    autoFocus={true}
                    height="70vh"
                    onImageUpload={handleImageUpload}
                    onPaste={handlePaste}
                    setOptions={{
                        buttonList: [
                            ['undo', 'redo',
                                'font', 'fontSize', 'formatBlock',
                                'paragraphStyle', 'blockquote',
                                'bold', 'underline', 'italic', 'strike',
                                'fontColor', 'hiliteColor', 'textStyle',
                                'removeFormat',
                                'subscript', 'superscript',
                                'outdent','indent',
                                'preview',
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