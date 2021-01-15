import React, { useEffect, useRef, useState } from 'react'
import SunEditor from 'suneditor-react'
import { useRouter } from 'next/router'
import axios from 'utils/axios'
import Cropper from 'react-cropper'
import fileUpload from "fuctbase64"
import _ from "lodash"
import checkPermission from "common/checkValidPermission"

const NewGiaiPhapComponent = React.memo(props => {
    const editorRef = useRef(),
        [showTitle, setShowTitle] = useState(''),
        [title, setTitle] = useState(''),
        [img, setImg] = useState(null),
        [editImg, setEditImg] = useState(false),
        [originalImg, setOriginalImg] = useState(null),
        cropper = useRef(),
        router = useRouter(),
        { query: { id } } = router


    useEffect(() => {
        getDetailSolution()
    }, [])

    useEffect(() => {
        !checkPermission("CATEGORY:UPDATE") && router.push('/admin/404')
    }, [])

    const getDetailSolution = async () => {
        try {
            const res = await axios.get(`/solution/${id}`)
            if (res.status === 200) {
                setTitle(res.data.data.title)
                editorRef.current.editor.setContents(res.data.data.content)
                setImg(res.data.data.img)
                setOriginalImg(res.data.data.img)
                setShowTitle(res.data.data.showTitle)
            }
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
                showTitle,
                title,
                content: _.escape(editorRef.current.editor.getContents()),
                img
            },
                res = await axios.put(`/solution/${id}`, data)
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

    const handlePaste = (e, cleanData, maxCharCount) => {
        editorRef.current.editor.insertHTML(cleanData, true, maxCharCount)
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
        <React.Fragment>
            <i onClick={() => router.push("/admin/giai-phap")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Sửa giải pháp</h2>
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
                            onChange={e => setShowTitle(e.target.value)}
                        />
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
            </div>
            <div className="form-group">
                <label htmlFor="content" className="form-label">Nội dung</label>
                <SunEditor
                    ref={editorRef}
                    autoFocus={true}
                    height="90vh"
                    onImageUpload={handleImageUpload}
                    onPaste={handlePaste}
                    setOptions={{
                        buttonList: [
                            ['undo', 'redo',
                                'font', 'fontSize', 'formatBlock',
                                'paragraphStyle', 'blockquote',
                                'bold', 'underline', 'italic', 'strike',
                                'fontColor', 'hiliteColor', 'textStyle',
                                'subscript', 'superscript',
                                'removeFormat',
                                'outdent', 'indent',
                                'align', 'horizontalRule', 'list', 'lineHeight',
                                'table', 'link', 'image', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
                                'fullScreen', 'showBlocks', 'codeView']
                        ]
                    }}
                />
            </div>
            <div className="col-12 row my-4">
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
            <div className="col-12  row">
                <div className="form-group col-6 text-center">
                    <img src={img} onClick={() => setEditImg(!editImg)} height={250} alt={`giai-phap-${id}`} />
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
                            aspectRatio={1 / 1}
                            zoomOnWheel={false}
                            viewMode={2}
                        />
                    )}
                </div>
            </div>
            <button type="button" className="btn btn-transparent btn-border text-color" onClick={onSubmit}>Lưu lại</button>
        </React.Fragment >
    )
})

export default NewGiaiPhapComponent
