import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import axios from "utils/axios"

const ViewLienHeComponent = React.memo(props => {
    const { query: { id }, push } = useRouter(),
        [contact, setContact] = useState({})

    useEffect(() => {
        getContact()
    }, [])

    const getContact = async () => {
        try {
            const res = await axios.get(`/contact/${id}`)
            setContact(res.data.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return (
        <React.Fragment>
            <i onClick={() => push("/admin/lien-he")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Chi tiết liên hệ</h2>
            <div className="row">
                <div className="col-6 border-top py-2">
                    <p className="text-color font-weight-light">Tên: <b className="font-weight-bold">{contact.name}</b></p>
                </div>
                <div className="col-6 border-top py-2">
                    <p className="text-color font-weight-light">Email: <b className="font-weight-bold">{contact.email}</b></p>
                </div>
                <div className="col-12 border-top py-2">
                    <p className="text-color font-weight-light">Số điện thoại: <b className="font-weight-bold">{contact.phoneNumber}</b></p>
                </div>
                <div className="col-12 border-top py-2">
                    <p className="text-color font-weight-light">Nội dung: <b className="font-weight-bold">{contact.content}</b></p>
                </div>
            </div>
        </React.Fragment>
    )
})

export default ViewLienHeComponent