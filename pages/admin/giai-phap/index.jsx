import { useRouter } from "next/router"
import { useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getSolutions, updatePagination } from "redux/reducers/solution"
import axios from "utils/axios"
import checkPermission from "common/checkValidPermission"

const DashBoard = props => {
    const router = useRouter(),
        { solutions, getSolutions, pagination, updatePagination } = props,
        { limit, total, page } = pagination

    useEffect(() => {
        getSolutions()
    }, [getSolutions, page, limit])

    useEffect(() => {
        !checkPermission("SOLUTION:GET_LIST") && router.push('/admin/404')
    }, [])

    const deleteSolution = async id => {
        try {
            const res = await axios.delete(`/solution/${id}`)
            if (res.status === 200) {
                getSolutions()
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
                <h3>Giải pháp</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tiêu đề giải pháp</th>
                                <th scope="col">Hình ảnh</th>
                                <th className="text-center" scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/giai-phap/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {solutions.map((solution, index) => (
                                <tr key={solution._id}>
                                    <td>{index + 1}</td>
                                    <td>{solution.title}</td>
                                    <td><img src={solution.img} height={100} alt={solution._id} /></td>
                                    <td className="text-center">
                                        <button className="btn" onClick={() => router.push(`/admin/giai-phap/${solution._id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn" onClick={() => deleteSolution(solution._id)}>
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
    solutions: state.solution.data,
    pagination: state.solution.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getSolutions,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)