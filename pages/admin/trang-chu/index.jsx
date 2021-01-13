import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getConfig } from "redux/reducers/config"
import { useRouter } from 'next/router'
import axios from "utils/axios"
import { getBanners, updatePagination } from "redux/reducers/banner"
import checkPermission from "common/checkValidPermission"

const DashBoard = React.memo(props => {
    const router = useRouter(),
        { getConfig, getBanners, banners, pagination, updatePagination } = props,
        { limit, page, total } = pagination,
        [startDrop, setStartDrop] = useState(null)

    useEffect(() => {
        getConfig()
        getBanners()
    }, [limit, page])

    useEffect(() => {
        !checkPermission("BANNER:GET_LIST") && router.push('/admin/404')
    }, [])

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
            const res = await axios.put("/banners/position", lstPostition)
            if (res.status === 200) {
                getBanners()
            }
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
            a = newBanner[startDrop]
        newBanner[startDrop] = newBanner[Number(e.currentTarget.dataset.position)]
        newBanner[Number(e.currentTarget.dataset.position)] = a
        const lastBanners = banners.map((banner, index) => ({ _id: banner._id, position: page * limit + index }))
        setStartDrop(null)
        updatePosition(lastBanners)
    }

    const updatePage = page => {
        const newPagination = { ...pagination, page }
        updatePagination(newPagination)
    }

    return (
        <React.Fragment>
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
                                    <td>{index + 1}</td>
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
                                    <button className="page-link">Trang trước</button>
                                </li>
                                {Array.from({ length: (total % limit === 0) ? total / limit : (total - total % limit) / limit + 1 }, () => Math.floor(Math.random() * 40)).map((_, index) => (
                                    <li className={`page-item ${page === index && "active"}`} key={index} onClick={() => updatePage(index)}>
                                        <button className="page-link">{index}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${pagination.page === (((total % limit === 0) ? total / limit : (total - total % limit) / limit + 1) - 1) && "disabled"}`} onClick={() => pagination.page < (((total % limit === 0) ? total / limit : (total - total % limit) / limit + 1) - 1) && updatePage(pagination.page + 1)}>
                                    <button className="page-link">Trang kế tiếp</button>
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