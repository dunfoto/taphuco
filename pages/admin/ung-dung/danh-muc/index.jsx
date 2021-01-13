import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "utils/axios"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getCategories, updatePagination } from "redux/reducers/category"
import checkPermission from "common/checkValidPermission"

const DashBoard = props => {
    const router = useRouter(),
        { categories, getCategories, pagination, updatePagination } = props,
        { limit, total, page } = pagination,
        [startDrop, setStartDrop] = useState(null)

    useEffect(() => {
        getCategories()
    }, [getCategories, page, limit])

    useEffect(() => {
        !checkPermission("CATEGORY:GET_LIST") && router.push('/admin/404')
    }, [])

    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`/category/${id}`)
            if (res.status === 200) {
                getCategories()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const updatePage = page => {
        const newPagination = { ...pagination, page }
        updatePagination(newPagination)
    }

    const onDragStart = e => {
        setStartDrop(Number(e.currentTarget.dataset.position))
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    const onDrop = e => {
        const newCategories = categories,
            oldItem = categories[startDrop]
        newCategories.splice(startDrop, 1)
        newCategories.splice(Number(e.currentTarget.dataset.position), 0, oldItem)
        newCategories.map((category, index) => {
            category.position = page * limit + index
            return category
        })
        setStartDrop(null)
        updatePosition(newCategories.map(category => ({ _id: category._id, position: category.position })))
    }

    const updatePosition = async lstPostition => {
        try {
            const res = await axios.put("/categories/position", lstPostition)
            if (res.status === 200) {
                getCategories()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }


    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Danh mục sản phẩm</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên danh mục</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/ung-dung/danh-muc/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr
                                    draggable={true}
                                    onDragStart={onDragStart}
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                    data-position={index}
                                    key={category._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <img src={category.img} alt={`${category._id}`} height={100} />
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => router.push(`/admin/ung-dung/danh-muc/${category._id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn" onClick={() => deleteCategory(category._id)}>
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
    categories: state.category.data,
    pagination: state.category.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getCategories,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)