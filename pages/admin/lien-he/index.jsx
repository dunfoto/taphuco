import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getContacts } from "redux/reducers/contact"
import { bindActionCreators } from "redux"
import { useRouter } from "next/router"

const LienHeComponent = React.memo(props => {
    const { contacts, pagination, getContacts } = props,
        { total, page, limit } = pagination,
        { push } = useRouter()

    useEffect(() => {
        getContacts()
    }, [])

    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Liên hệ</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr key={contact._id}>
                                    <td>{index + 1}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phoneNumber}</td>
                                    <td className="text-center">
                                        <button className="btn" onClick={() => push(`/admin/lien-he/${contact._id}`)}>
                                            <i className="fas fa-edit"></i>
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
    contacts: state.contact.data,
    pagination: state.contact.pagination
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getContacts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LienHeComponent)