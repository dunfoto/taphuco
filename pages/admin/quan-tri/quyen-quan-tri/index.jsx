import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getPermissions } from "redux/reducers/permission"
import axios from "utils/axios"
import { useRouter } from "next/router"

const QuyenQuanTriComponent = React.memo(props => {
    const { permissions, pagination, getPermissions } = props,
        { total, limit, page } = pagination,
        { push } = useRouter()
    useEffect(() => {
        getPermissions()
    }, [])

    const removePermission = async id => {
        try {
            const res = await axios.delete(`/permission/${id}`)
            if (res.status === 200) {
                getPermissions()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
    return (
        <div className="w-100">
            <h3>Quyền quản trị</h3>
            <div className="w-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên quyền</th>
                            <th className="text-center" scope="col"><i onClick={() => push("/admin/quan-tri/quyen-quan-tri/new")} className="fas fa-plus"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission, index) => (
                            <tr key={permission._id}>
                                <td>{index + 1}</td>
                                <td>{permission.name}</td>
                                <td className="text-center">
                                    <button className="btn" onClick={() => push(`/admin/quan-tri/quyen-quan-tri/${permission._id}`)}>
                                        <i className="fas fa-edit mx-1"></i>
                                    </button>
                                    <button className="btn" onClick={() => removePermission(permission._id)}>
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
    permissions: state.permission.data,
    pagination: state.permission.pagination
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getPermissions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(QuyenQuanTriComponent)