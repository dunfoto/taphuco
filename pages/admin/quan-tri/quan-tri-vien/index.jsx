import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getAdmins } from "redux/reducers/admin"
import axios from "utils/axios"
import { useRouter } from "next/router"

const QuanTriComponent = React.memo(props => {
    const { admins, pagination, getAdmins } = props,
        { total, limit, page } = pagination,
        { push } = useRouter()

    useEffect(() => {
        getAdmins()
    }, [])

    const removeAdmin = async id => {
        try {
            const res = await axios.delete(`/admin/${id}`)
            if (res.status === 200) {
                getAdmins()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
    return (
        <div className="w-100">
            <h3>Quản trị viên</h3>
            <div className="w-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Quyền của admin</th>
                            <th className="text-center" scope="col"><i onClick={() => push("/admin/quan-tri/quan-tri-vien/new")} className="fas fa-plus"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={admin._id}>
                                <td>{index + 1}</td>
                                <td>{admin.email}</td>
                                <td>{admin.permission?.name}</td>
                                <td className="text-center">
                                    <button className="btn" onClick={() => push(`/admin/quan-tri/quan-tri-vien/${admin._id}`)}>
                                        <i className="fas fa-edit mx-1"></i>
                                    </button>
                                    <button className="btn" onClick={() => removeAdmin(admin._id)}>
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
    )
})

const mapStateToProps = state => ({
    admins: state.admin.data,
    pagination: state.admin.pagination
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getAdmins
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(QuanTriComponent)