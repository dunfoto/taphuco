import React, { useState, useEffect } from 'react'
import Image from "components/Image"
import { v4 } from "uuid"
import { convertBase64 } from "common/base64"
import SweetAlert from "react-bootstrap-sweetalert"
import { Spinner } from "react-bootstrap"
import axios from "utils/axios"

const CacKhachHangComponent = React.memo(props => {
    const [show, setShow] = useState(null),
        [imgs, setImgs] = useState([]),
        [original, setOriginal] = useState([]),
        [wait, setWait] = useState(false)


    useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        try {
            const res = await axios.get('/clients')
            setImgs(res.data.data.map(img => ({ _id: img._id, img: img.img })))
            setOriginal(res.data.data.map(img => ({ _id: img._id, img: img.img })))
        } catch (err) {
            return Promise.reject(err)
        }
    }
    const onChangeImg = async event => {
        const newImgs = await Promise.all(Object.keys(event.target.files).map(key => event.target.files[key]).map(async file => ({ _id: v4(), img: "data:image/png;base64," + (await convertBase64(file)).base64 })))
        setImgs([...imgs, ...newImgs])
        setOriginal([...original, ...newImgs])
    }

    const removeImage = async data => {
        if (data.img.includes('data:image/png;base64')) {
            setImgs(imgs.filter(img => img._id !== data._id))
            setOriginal(original.filter(img => img._id !== data._id))
        } else {
            try {
                const res = await axios.delete(`/client/${data._id}`)
                if (res.status === 200) {
                    setWait(true)
                    getClients()
                }
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }

    const onSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/client', imgs.map(img => img.img))
            if (res.status === 200) {
                getClients()
            }
        } catch (err) {
            console.log("DUNG", err)
        }
        setWait(true)
    }

    return (
        <React.Fragment>
            {wait && (
                <SweetAlert
                    success
                    title="Woot!"
                    onConfirm={() => {
                        setWait(false)
                    }}
                >
                    Upload success
                </SweetAlert>
            )}
            <div className="w-100">
                <h3>Những khách hàng của chúng tôi</h3>
                <div className="w-100">
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
                    <div className="d-flex flex-wrap">
                        {imgs.map(img => (
                            <div key={img._id} className="m-2 container__imgs-list">
                                <img src={img.img} height={300} width="auto" className="img-fluid img-thumbnail img-list" />
                                <div className="remove" onClick={() => removeImage(img)} >
                                    <i className="fas fa-times" />
                                </div>
                                {img.img.includes('data:image/png;base64') && (
                                    <div className="edit" onClick={() => setShow(img._id)}>
                                        <i className="fas fa-edit" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Image
                        show={Boolean(show)}
                        handleClose={() => setShow(null)}
                        image={original.find(img => img._id === show)}
                        onSuccess={img => {
                            setImgs(imgs.map(temp => temp._id === img._id ? img : temp))
                            setShow(null)
                        }}
                    />
                </div>
                <button type="button" onClick={onSubmit} disabled={wait} className="btn btn-transparent border rounded-0 pl-4 pr-4 my-4 btn-border text-color">{wait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
            </div>
        </React.Fragment>
    )
})

CacKhachHangComponent.getInitialProps = async ctx => {
    try {
        return {}
    } catch (err) {
        return {}
    }
}

export default CacKhachHangComponent