import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "utils/axios"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getProducts, updatePagination } from "redux/reducers/product"
import checkPermission from "common/checkValidPermission"

const DashBoard = props => {
    const { products, getProducts, pagination, updatePagination } = props,
        router = useRouter(),
        { page, limit, total } = pagination

    useEffect(() => {
        getProducts()
    }, [getProducts, page, limit])

    useEffect(() => {
        !checkPermission("PRODUCT:GET_LIST") && router.push('/admin/404')
    }, [])

    const deleteProduct = async id => {
        try {
            const res = await axios.delete(`/product/${id}`)
            if (res.status === 200) {
                getProducts()
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
                <h3>Sản phẩm</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Danh mục</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/ung-dung/san-pham/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.title}</td>
                                    <td>{product.category?.title}</td>
                                    <td>
                                        <img src={product.imgs[0]} alt={`${product._id}`} height={100} />
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => router.push(`/admin/ung-dung/san-pham/${product._id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn" onClick={() => deleteProduct(product._id)}>
                                            <i className="fas fa-trash"></i>
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
}

const mapStateToProps = state => ({
    products: state.product.data,
    pagination: state.product.pagination
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getProducts,
    updatePagination
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)