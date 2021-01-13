import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { getHistories, updatePagination } from "../../../../redux/reducers/history"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import axios from "utils/axios"
import checkPermission from "common/checkValidPermission"

const LichSuComponent = React.memo(props => {
    const { histories, pagination, getHistories, updatePagination } = props,
        { total, page, limit } = pagination,
        router = useRouter()

    useEffect(() => {
        getHistories()
    }, [])

    useEffect(() => {
        !checkPermission("HISTORY:GET_LIST") && router.push('/admin/404')
    }, [])

    const deleteHistory = async id => {
        try {
            const res = await axios.delete(`/history/${id}`)
            if (res.status === 200) {
                getHistories()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
    const updatePage = page => {
        const newPagination = { ...pagination, page }
        updatePagination(newPagination)
    }
    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Lịch sử công ty</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Năm</th>
                                <th scope="col">Hình ảnh</th>
                                <th className="text-center" scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/ve-chung-toi/lich-su/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.map((history, index) => (
                                <tr key={history._id}>
                                    <td>{index + 1}</td>
                                    <td>{history.year}</td>
                                    <td><img src={history.img} height={150} width="auto" /></td>
                                    <td className="text-center">
                                        <button className="btn" onClick={() => router.push(`/admin/ve-chung-toi/lich-su/${history._id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn" onClick={() => deleteHistory(history._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
        </React.Fragment>
    )
})

const mapStateToProps = state => ({
    histories: state.history.data,
    pagination: state.history.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getHistories,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LichSuComponent)