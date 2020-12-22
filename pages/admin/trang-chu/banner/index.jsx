import "style/hotSpots.scss"
import 'cropperjs/dist/cropper.css'
import "react-input-range/lib/css/index.css"
import React, { useState, useRef } from "react"
import { v4 } from "uuid"
import Cropper from 'react-cropper'
import { Spinner } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import InputRange from 'react-input-range'
import { useRouter } from "next/router"
import axios from "utils/axios"
import fileUpload from "fuctbase64"

const initContent = {
    title: "",
    subTitle: "",
    color: "",
    requirement: "",
    product: "",
    link: "#"
}
const AddBannerComponent = React.memo(props => {
    const router = useRouter(),
        { query: { id } } = router,
        cropper = useRef(),
        [originalImg, setOriginalImg] = useState(null),
        [editImg, setEditImg] = useState(false),
        [img, setImg] = useState(null),
        [show, setShow] = useState(null),
        [left, setLeft] = useState(50),
        [bottom, setBottom] = useState(50),
        [content, setContent] = useState(initContent),
        [nodes, setNodes] = useState([]),
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false)

    const addNode = () => {
        const temp = [...nodes, { _id: v4(), left: 50, bottom: 50, openDefault: false }]
        setNodes(temp)
    }

    const clickHotSpot = id => {
        setEditImg(false)
        const tempNode = nodes.find(node => node._id === id)
        if (!Boolean(id) || show === id) {
            return setShow(null)
        } else {
            nodes.forEach(node => {
                if (node._id === id) {
                    setLeft(node.left)
                    setBottom(node.bottom)
                }
            })
            setContent(tempNode?.content ? tempNode?.content : initContent)
            setShow(id)
        }
    }

    const onChangeLeft = (value) => {
        nodes.forEach((node, index) => {
            if (node._id === show) {
                nodes[index].left = value
            }
        })
        setLeft(value)
        setNodes(nodes)
    }

    const onChangeBottom = (value) => {
        nodes.forEach((node, index) => {
            if (node._id === show) {
                nodes[index].bottom = value
            }
        })
        setBottom(value)
        setNodes(nodes)
    }

    const onChangeContent = (type, e) => {
        setContent({ ...content, [type]: e.target.value })
        setNodes(nodes.map(node => {
            if (node._id === show) {
                return {
                    ...node,
                    content: { ...content, [type]: e.target.value }
                }
            }
            return node
        }))
    }

    const onSubmitBanner = async () => {
        setIsWait(true)
        try {
            const newNodes = nodes.map(node => {
                delete node._id
                return node
            }),
                data = {
                    img,
                    nodes
                },
                res = await axios.post("/banner", data)
            if (res.status === 200) {
                setAlert(true)
                setIsWait(false)
                setContent(initContent)
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const editButtonImage = () => {
        setShow(null)
        if (editImg === false) {
            setEditImg(true)
        } else {
            setImg(cropper.current.cropper.getCroppedCanvas().toDataURL())
            setEditImg(false)
        }
    }

    const onChangeImg = async event => {
        const newImg = "data:image/png;base64," + (await fileUpload(event, true)).base64
        setOriginalImg(newImg)
        setImg(newImg)
        setEditImg(true)
    }

    return (
        <React.Fragment>
            <i onClick={() => router.push("/admin/trang-chu")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            {originalImg ? (
                <div className="my-2">
                    <button type="button" onClick={() => editButtonImage(true)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{editImg ? "Xác nhận" : "Sửa hình ảnh"}</button>
                    {editImg && (<button type="button" onClick={() => setEditImg(false)} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Huỷ sửa hình ảnh</button>)}
                    {!editImg && (<button type="button" onClick={() => addNode()} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Thêm bảng thông tin</button>)}
                </div>
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
            <div className="text-right">Tổng số bảng thông tin: {nodes.length}</div>
            <div className="row">
                <div className="col-6">
                    <div className="context">
                        <img src={img} alt="Snow" style={{ cursor: "auto" }} />
                        {nodes.length > 0 && nodes.map((node, i) => (
                            <div key={i}>
                                <span className="btn" style={{ bottom: `${node.bottom}%`, left: `${node.left}%` }}>
                                    <div className="loader-6 center text-center" onClick={() => clickHotSpot(node._id)} >
                                        <span>
                                            {show === node._id ? <div>&#45;</div> : <div style={{ paddingBottom: 2 }}>&#43;</div>}
                                        </span>
                                    </div>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    {editImg && (
                        <Cropper
                            ref={cropper}
                            src={originalImg}
                            aspectRatio={16 / 9}
                            zoomOnWheel={false}
                        />
                    )}
                    {show && (
                        <div className="w-100 mt-4">
                            <h3>Chỉnh sửa</h3>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Khoảng cách với cạnh trái:</label>
                                    <div className="form-control border-0 my-2">
                                        <InputRange
                                            maxValue={100}
                                            minValue={0}
                                            value={left}
                                            onChange={value => onChangeLeft(value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Khoảng cách với cạnh dưới:</label>
                                    <div className="form-control border-0 my-2">
                                        <InputRange
                                            maxValue={100}
                                            minValue={0}
                                            value={bottom}
                                            onChange={value => onChangeBottom(value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">Tiêu đề</label>
                                        <input type="string" id="title" className="form-control" value={content.title ? content.title : ""} onChange={e => onChangeContent('title', e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subTitleÏ" className="form-label">Tiêu đề phụ</label>
                                        <input type="string" id="subTitleÏ" className="form-control" value={content.subTitle ? content.subTitle : ""} onChange={e => onChangeContent('subTitle', e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color" className="form-label">Màu sắc</label>
                                        <input type="string" id="color" className="form-control" value={content.color ? content.color : ""} onChange={e => onChangeContent('color', e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="requirement" className="form-label">Yêu cầu</label>
                                        <input type="string" id="requirement" className="form-control" value={content.requirement ? content.requirement : ""} onChange={e => onChangeContent('requirement', e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="product" className="form-label">Dòng sản phẩm</label>
                                        <input type="string" id="product" className="form-control" value={content.product ? content.product : ""} onChange={e => onChangeContent('product', e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="link" className="form-label">Đường dẫn <b>Xem thêm</b></label>
                                        <input type="string" id="link" className="form-control" value={content.link ? content.link : ""} onChange={e => onChangeContent('link', e)} />
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" checked={Boolean(nodes.find(node => node._id === show)?.openDefault)} onChange={() => onChangeOpenDefault()} className="form-check-input" id="openDefault" />
                                        <label className="form-check-label" htmlFor="openDefault">Tự động hiển thị bảng thông báo</label>
                                    </div>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Xem trước bảng thông tin</label>
                                    <div className="card p-0 text-left w-75 ml-auto mr-auto hotspot-homepage">
                                        <div className="card-body m-0 p-0" style={{ width: 301, border: "1px solid #10846F" }}>
                                            <div className="card-title title p-2 px-4 rounded-top">
                                                <div className="w-100 text-right">
                                                    <button className="btn p-0 m-0 text-white">&times;</button>
                                                </div>
                                                <h5>{content.title ? content.title : ""}</h5>
                                                <p className="text-white">{content.subTitle ? content.subTitle : ""}</p>
                                            </div>
                                            <div className="content p-2 px-4">
                                                <p className="title">Màu sắc</p>
                                                <p className="sub-content">{content.color ? content.color : ""}</p>
                                                <p className="title">Yêu cầu</p>
                                                <p className="sub-content">{content.requirement ? content.requirement : ""}</p>
                                                <p className="title">Dòng Sản Phẩm</p>
                                                <p className="sub-content">{content.product ? content.product : ""}</p>
                                                <a href={content.link ? content.link : ""} className="btn border rounded-pill px-4" style={{ pointerEvents: "none" }}>Xem thêm</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!editImg && (
                <div className="my-3">
                    <button type="button" onClick={() => onSubmitBanner()} disabled={isWait} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{isWait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
                    {alert && (
                        <SweetAlert
                            success
                            title="Woot!"
                            onConfirm={() => {
                                setAlert(false)
                                setShow(null)
                                router.push("/admin/trang-chu")
                            }}
                        >
                            Update success
                        </SweetAlert>
                    )}
                </div>
            )}
        </React.Fragment>
    )
})

export default AddBannerComponent