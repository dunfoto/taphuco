import { useRouter } from "next/router"
import { useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getPower, updatePagination } from "redux/reducers/power"
import axios from "utils/axios"
import checkPermission from "common/checkValidPermission"

const DashBoard = props => {
    const router = useRouter(),
        { power, getPower, pagination, updatePagination } = props,
        { limit, total, page } = pagination

    useEffect(() => {
        getPower()
    }, [getPower, page, limit])

    useEffect(() => {
        !checkPermission("POWER:GET_LIST") && router.push('/admin/404')
    }, [])

    const deletePower = async id => {
        try {
            const res = await axios.delete(`/power/${id}`)
            if (res.status === 200) {
                getPower()
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
                <h3>Nguồn lực</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tiêu đề</th>
                                <th className="text-center" scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/nguon-luc/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {power.map((solution, index) => (
                                <tr key={solution._id}>
                                    <td>{index + 1}</td>
                                    <td>{solution.title}</td>
                                    <td className="text-center">
                                        <button className="btn" onClick={() => router.push(`/admin/nguon-luc/${solution._id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn" onClick={() => deletePower(solution._id)}>
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
}

const mapStateToProps = state => ({
    power: state.power.data,
    pagination: state.power.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getPower,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)