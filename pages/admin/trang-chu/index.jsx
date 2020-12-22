import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getConfig } from "redux/reducers/config"
import { Spinner } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import { useRouter } from 'next/router'
import axios from "utils/axios"
import { getBanners, updatePagination } from "redux/reducers/banner"

const DashBoard = React.memo(props => {
    const router = useRouter(),
        { register, setValue, handleSubmit, control } = useForm(),
        { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
            control,
            name: "contentMessage"
        }),
        { homePage, getConfig, getBanners, banners, pagination, updatePagination } = props,
        { limit, page, total } = pagination,
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false),
        [startDrop, setStartDrop] = useState(null)

    useEffect(() => {
        getConfig()
        getBanners()
    }, [limit, page])

    useEffect(() => {
        if (homePage) {
            setValue("pointMessage", homePage.pointMessage)
            setValue("contentMessage", homePage.contentMessage.map(item => ({ value: item })))
        }
    }, [homePage])

    const onSubmitThongDiep = async data => {
        setIsWait(true)
        if (data.contentMessage) {
            data.contentMessage = data.contentMessage.map(item => item.value)
        } else {
            delete data.contentMessage
        }
        try {
            const res = await axios.post("/config/homepage", data)
            if (res.status === 200) {
                getConfig()
                setAlert(true)
                setIsWait(false)
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const removeBanner = async id => {
        try {
            const res = await axios.delete(`/banner/${id}`)
            if (res.status === 200) {
                getBanners()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updatePosition = async lstPostition => {
        try {
            console.log(lstPostition)
            const res = await axios.put("/banners/position", lstPostition)
            console.log(res)
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onDragStart = e => {
        setStartDrop(Number(e.currentTarget.dataset.position))
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    const onDrop = e => {
        const newBanner = banners,
            oldItem = banners[startDrop]
        newBanner.splice(startDrop, 1)
        newBanner.splice(Number(e.currentTarget.dataset.position), 0, oldItem)
        newBanner.map((banner, index) => {
            banner.position = index
            return banner
        })
        setStartDrop(null)
        updatePosition(newBanner.map(banner => ({ _id: banner._id, position: banner.position })))
    }

    const updatePage = page => {
        const newPagination = { ...pagination, page }
        updatePagination(newPagination)
    }

    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Thông điệp:</h3>
                <div className="w-50">
                    <form onSubmit={handleSubmit(onSubmitThongDiep)}>
                        <div className="form-group">
                            <label htmlFor="pointMessage">Tiêu đề cho thông điệp</label>
                            <input
                                type="string"
                                className="form-control"
                                id="pointMessage"
                                name="pointMessage"
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contentMessage">Nội dung thông điệp</label>
                            {fields.map((field, index) => (
                                <div className="d-flex" key={field.id}>
                                    <input
                                        type="string"
                                        className="form-control justify-content-center my-2 col-10"
                                        name={`contentMessage[${index}].value`}
                                        defaultValue={field.value}
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                    <div className="d-flex justify-content-center align-items-center col-2">
                                        <i className="fas fa-times-circle" onClick={() => remove(index)} style={{ cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex">
                                <button type="button" className="col-10 btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color w-100" onClick={() => append({ value: "" })}><i className="fas fa-plus-circle"></i></button>
                            </div>
                        </div>
                        <button type="submit" disabled={isWait} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{isWait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
                    </form>
                </div>
                {alert && (
                    <SweetAlert
                        success
                        title="Woot!"
                        onConfirm={() => setAlert(false)}
                    >
                        Update success
                    </SweetAlert>
                )}
            </div>
            <div className="w-100">
                <h3>Banner</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Hình ảnh</th>
                                <th className="text-center" scope="col">Số bảng hiển thị</th>
                                <th className="text-center" scope="col"><i onClick={() => router.push("/admin/trang-chu/banner")} className="fas fa-plus"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((banner, index) => (
                                <tr
                                    draggable={true}
                                    onDragStart={onDragStart}
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                    data-position={index}
                                    key={banner._id}
                                >
                                    <td>{index}</td>
                                    <td>
                                        <img src={banner.img} alt={`banner-${banner._id}`} height={150} />
                                    </td>
                                    <td className="text-center">
                                        {banner.nodes.length}
                                    </td>
                                    <td className="text-center">
                                        <button className="btn" onClick={() => router.push(`/admin/trang-chu/banner/${banner._id}`)}>
                                            <i className="fas fa-edit mx-1"></i>
                                        </button>
                                        <button className="btn" onClick={() => removeBanner(banner._id)}>
                                            <i className="fas fa-trash mx-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pagination.total > 0 && (
                        <nav className="w-100">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${pagination.page === 0 && "disabled"}`} onClick={() => pagination.page > 0 && updatePage(pagination.page - 1)}>
                                    <button className="page-link">Previous</button>
                                </li>
                                {Array.from({ length: (total % limit === 0) ? total / limit : (total - total % limit) / limit + 1 }, () => Math.floor(Math.random() * 40)).map((_, index) => (
                                    <li className={`page-item ${page === index && "active"}`} key={index} onClick={() => updatePage(index)}>
                                        <button className="page-link">{index}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${pagination.page === (((total % limit === 0) ? total / limit : (total - total % limit) / limit + 1) - 1) && "disabled"}`} onClick={() => pagination.page < (((total % limit === 0) ? total / limit : (total - total % limit) / limit + 1) - 1) && updatePagePagination(pagination.page + 1)}>
                                    <button className="page-link">Next</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
})

const mapStateToProps = state => ({
    homePage: state.config?.homepage,
    banners: state.banner.data,
    pagination: state.banner.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig,
    getBanners,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)